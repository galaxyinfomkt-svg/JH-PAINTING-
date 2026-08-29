#!/usr/bin/env node
/**
 * gsc-report.js - estado real de indexacao, direto da Search Console API.
 *
 * COMO RODAR
 *   node scripts/gsc-report.js
 *   node scripts/gsc-report.js --sample 40      (amostra maior por tipo)
 *   node scripts/gsc-report.js --submit         (reenvia o sitemap tambem)
 *   node scripts/gsc-report.js --static         (veredito de cada pagina estatica)
 *
 * CREDENCIAL
 *   Service account com permissao de Owner na propriedade do GSC.
 *   Caminho padrao abaixo; sobrescreva com GSC_KEY=/caminho/para/chave.json
 *
 * POR QUE ESTA FERRAMENTA EXISTE
 * O painel do Search Console mostra totais. Esta API mostra o veredito por URL:
 * se o Google indexou, se apenas rastreou e recusou, ou se nem chegou a buscar.
 * A diferenca entre "Crawled - currently not indexed" e "Discovered - currently
 * not indexed" e a diferenca entre um problema de qualidade e um problema de
 * orcamento de rastreamento, e as duas coisas se resolvem de formas opostas.
 *
 * COTA
 * URL Inspection: 2.000 URLs por dia, 600 por minuto.
 */

const fs = require('fs')
const crypto = require('crypto')

const KEY_PATH = process.env.GSC_KEY || 'c:/Users/RHAIDELINE/Downloads/RS DEVELOP NOVO/google-service-account.json'
const SITE = process.env.GSC_SITE || 'sc-domain:jhpaintingservices.com'
const ORIGIN = 'https://jhpaintingservices.com'
const SITEMAP = `${ORIGIN}/sitemap.xml`

const args = process.argv.slice(2)
const SAMPLE = (() => {
  const eq = (args.find(a => a.startsWith('--sample=')) || '').split('=')[1]
  const i = args.indexOf('--sample')
  const n = Number(eq || (i >= 0 ? args[i + 1] : ''))
  return Number.isFinite(n) && n > 0 ? n : 15
})()
const SUBMIT = args.includes('--submit')
/**
 * As paginas estaticas sao poucas e valem individualmente, entao aqui nao ha
 * amostragem: cada uma recebe seu proprio veredito. Foi assim que apareceu que
 * /services nunca tinha sido rastreada apesar de estar no sitemap, responder
 * 200, ter canonical propria e receber links de quase toda pagina do site.
 */
const STATIC_ONLY = args.includes('--static')

const b64 = (o) => Buffer.from(typeof o === 'string' ? o : JSON.stringify(o))
  .toString('base64').replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_')
const sleep = (ms) => new Promise(r => setTimeout(r, ms))
const pad = (s, n) => String(s).padStart(n)

async function token() {
  if (!fs.existsSync(KEY_PATH)) throw new Error(`chave nao encontrada: ${KEY_PATH}\nuse GSC_KEY=/caminho/chave.json`)
  const k = JSON.parse(fs.readFileSync(KEY_PATH, 'utf8'))
  const now = Math.floor(Date.now() / 1000)
  const h = b64({ alg: 'RS256', typ: 'JWT' })
  const c = b64({ iss: k.client_email, scope: 'https://www.googleapis.com/auth/webmasters', aud: 'https://oauth2.googleapis.com/token', exp: now + 3600, iat: now })
  const s = crypto.createSign('RSA-SHA256').update(`${h}.${c}`).sign(k.private_key)
  const r = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer', assertion: `${h}.${c}.${s.toString('base64').replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_')}` }),
  })
  const j = await r.json()
  if (!j.access_token) throw new Error('auth falhou: ' + JSON.stringify(j).slice(0, 200))
  return j.access_token
}

async function inspect(t, url) {
  for (let a = 0; a < 3; a++) {
    const r = await fetch('https://searchconsole.googleapis.com/v1/urlInspection/index:inspect', {
      method: 'POST', headers: { Authorization: `Bearer ${t}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ inspectionUrl: url, siteUrl: SITE }),
    })
    if (r.status === 429) { await sleep(5000); continue }
    const j = await r.json().catch(() => ({}))
    if (!r.ok) return { err: r.status }
    return (j.inspectionResult || {}).indexStatusResult || {}
  }
  return { err: 429 }
}

const TYPES = [
  ['home + estaticas', u => /^\/(|about|contact|services|projects|blog|massachusetts)$/.test(u)],
  ['paginas de servico', u => /^\/services\/[^/]+$/.test(u)],
  ['cidade', u => /^\/massachusetts\/[^/]+$/.test(u)],
  ['cidade x servico', u => /^\/massachusetts\/[^/]+\/[^/]+$/.test(u)],
  ['regiao', u => /^\/regions\/[^/]+$/.test(u)],
  ['regiao x servico', u => /^\/regions\/[^/]+\/[^/]+$/.test(u)],
  ['blog', u => /^\/blog\/[^/]+$/.test(u)],
]

;(async () => {
  const t = await token()

  if (SUBMIT) {
    const r = await fetch(`https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(SITE)}/sitemaps/${encodeURIComponent(SITEMAP)}`,
      { method: 'PUT', headers: { Authorization: `Bearer ${t}` } })
    console.log(`sitemap reenviado: HTTP ${r.status}\n`)
  }

  const sm = await (await fetch(`https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(SITE)}/sitemaps`,
    { headers: { Authorization: `Bearer ${t}` } })).json()
  console.log('SITEMAPS')
  ;(sm.sitemap || []).forEach(s => {
    const c = (s.contents || [])[0] || {}
    console.log(`  ${s.path.replace(ORIGIN, '')}  ${c.submitted || 0} URLs  baixado ${(s.lastDownloaded || '').slice(0, 10) || 'nunca'}  erros ${s.errors || 0}`)
  })

  const xml = await (await fetch(SITEMAP)).text()
  const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1])
  console.log(`\n${urls.length} URLs no sitemap.${STATIC_ONLY ? '' : ` Inspecionando ate ${SAMPLE} por tipo.`}\n`)

  if (STATIC_ONLY) {
    const [, isStatic] = TYPES[0]
    const pages = urls.filter(u => isStatic(u.replace(ORIGIN, '') || '/'))
    console.log('PAGINAS ESTATICAS, uma a uma')
    console.log('')
    for (const u of pages) {
      const r = await inspect(t, u)
      const st = r.err ? `ERRO ${r.err}` : (r.coverageState || r.verdict || 'desconhecido')
      const ok = /indexed/i.test(st) && !/not indexed/i.test(st)
      const crawl = r.lastCrawlTime ? r.lastCrawlTime.slice(0, 10) : 'nunca rastreada'
      console.log(`  ${ok ? 'OK ' : '>> '}${(u.replace(ORIGIN, '') || '/').padEnd(16)} ${st.padEnd(38)} ${crawl}`)
      await sleep(650)
    }
    return
  }

  const summary = []
  for (const [name, match] of TYPES) {
    const pool = urls.filter(u => match(u.replace(ORIGIN, '') || '/'))
    if (!pool.length) continue
    const n = Math.min(SAMPLE, pool.length)
    const sample = Array.from({ length: n }, (_, i) => pool[Math.floor(i * pool.length / n)])
    const tally = {}
    let indexed = 0, neverCrawled = 0
    for (const u of sample) {
      const r = await inspect(t, u)
      const st = r.err ? `ERRO ${r.err}` : (r.coverageState || r.verdict || 'desconhecido')
      tally[st] = (tally[st] || 0) + 1
      if (/indexed/i.test(st) && !/not indexed/i.test(st)) indexed++
      if (!r.err && !r.lastCrawlTime) neverCrawled++
      await sleep(650)
    }
    const rate = Math.round(indexed / n * 100)
    summary.push({ name, rate, indexed, n, pool: pool.length, neverCrawled })
    console.log(`${name.toUpperCase()}  amostra ${n} de ${pool.length}`)
    Object.entries(tally).sort((a, b) => b[1] - a[1]).forEach(([k, v]) =>
      console.log(`  ${pad(v, 3)}  ${pad(Math.round(v / n * 100), 3)}%  ${k}`))
    if (neverCrawled) console.log(`  ${pad(neverCrawled, 3)}       nunca rastreadas pelo Google`)
    console.log('')
  }

  console.log('='.repeat(64))
  console.log('TAXA DE INDEXACAO POR TIPO')
  console.log('='.repeat(64))
  summary.sort((a, b) => b.rate - a.rate).forEach(s =>
    console.log(`  ${s.name.padEnd(20)} ${pad(s.rate, 3)}%  ${'#'.repeat(Math.round(s.rate / 4))}  (${s.indexed}/${s.n} de ${s.pool})`))

  const est = summary.reduce((acc, s) => acc + Math.round(s.pool * s.rate / 100), 0)
  console.log(`\n  estimativa de paginas indexadas no site: ~${est} de ${urls.length}`)
})().catch(e => { console.error('ERRO:', e.message); process.exit(1) })
