/**
 * google-index.mjs - empurra as URLs da JH para a Indexing API do Google.
 *
 * LEIA ISTO ANTES DE CONFIAR NO RESULTADO
 * A documentacao do Google diz que a Indexing API so vale para paginas com
 * JobPosting ou BroadcastEvent, e a JH nao tem nenhuma das duas. Medido no
 * outro site da mesma conta, das URLs empurradas que ja tinham veredito, 70% o
 * Google nunca foi buscar e 14% ele respondia "URL is unknown to Google". A
 * expectativa correta aqui e baixa. Este script existe para MEDIR isso na JH
 * com dado proprio, nao porque o ganho esteja provado.
 *
 * A COTA E POR PROJETO, NAO POR SITE
 * Sao 200 por dia no projeto n8ngalaxy-491222, dividido com qualquer outro site
 * que use a mesma conta de servico. Em 08/09/2026 o site rs-developmentgroup
 * consumia os 200 todo dia e a JH recebia 429 em tudo; o workflow de la foi
 * desabilitado para abrir espaco. Se voltar a dar 429, e disputa de cota.
 *
 * DE ONDE VEM A LISTA
 * Do proprio sitemap.xml, de proposito. O sitemap ja e filtrado por
 * shouldIndexCityService, entao pagina com noindex nao aparece nele e nunca
 * chega aqui. Empurrar uma pagina noindex seria pedir ao Google para rastrear
 * exatamente o que queremos que ele esqueca.
 *
 *   node scripts/google-index.mjs            # dispara o proximo lote
 *   node scripts/google-index.mjs --dry      # so mostra o que faria
 */
import fs from 'node:fs'
import crypto from 'node:crypto'

const KEY = process.env.GSC_KEY || 'google-service-account.json'
const ORIGIN = 'https://jhpaintingservices.com'
const STATE = 'google-index-state.json'
const DAILY = 200
const DRY = process.argv.includes('--dry')

/** Prioridade: quanto menor, mais cedo entra no lote. */
function priority(path) {
  if (path === '/') return 0
  if (/^\/(services|projects|about|contact|massachusetts)$/.test(path)) return 1
  if (/^\/services\//.test(path)) return 2
  if (/^\/massachusetts\/[^/]+$/.test(path)) return 3   // paginas de cidade
  if (/^\/regions\/[^/]+$/.test(path)) return 4
  if (/^\/massachusetts\//.test(path)) return 5          // cidade x servico
  if (/^\/blog\//.test(path)) return 6
  return 7
}

const b64 = o => Buffer.from(typeof o === 'string' ? o : JSON.stringify(o))
  .toString('base64').replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_')

async function token() {
  const k = JSON.parse(fs.readFileSync(KEY, 'utf8'))
  const now = Math.floor(Date.now() / 1000)
  const claim = { iss: k.client_email, scope: 'https://www.googleapis.com/auth/indexing',
    aud: 'https://oauth2.googleapis.com/token', exp: now + 3600, iat: now }
  const unsigned = `${b64({ alg: 'RS256', typ: 'JWT' })}.${b64(claim)}`
  const sig = crypto.createSign('RSA-SHA256').update(unsigned).sign(k.private_key)
    .toString('base64').replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_')
  const r = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer', assertion: `${unsigned}.${sig}` }) })
  const j = await r.json()
  if (!j.access_token) throw new Error('token: ' + JSON.stringify(j))
  return j.access_token
}

const xml = await (await fetch(`${ORIGIN}/sitemap.xml`)).text()
const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1])
  .sort((a, b) => priority(a.replace(ORIGIN, '') || '/') - priority(b.replace(ORIGIN, '') || '/'))
console.log(`${urls.length} URLs no sitemap`)

const state = fs.existsSync(STATE) ? JSON.parse(fs.readFileSync(STATE, 'utf8')) : { sent: {} }
state.sent ??= {}
// Nunca enviadas primeiro; depois as mais antigas, para rotacionar.
const never = urls.filter(u => !state.sent[u])
const old = urls.filter(u => state.sent[u]).sort((a, b) => state.sent[a] - state.sent[b])
const batch = [...never, ...old].slice(0, DAILY)
console.log(`lote de ${batch.length}: ${never.length ? Math.min(never.length, DAILY) : 0} nunca enviadas, resto por rotacao\n`)

if (DRY) {
  batch.slice(0, 15).forEach(u => console.log('  [simulacao] ' + (u.replace(ORIGIN, '') || '/')))
} else {
  await run()
}

async function run() {

const t = await token()
let ok = 0, quota = 0, fail = 0
for (const url of batch) {
  const r = await fetch('https://indexing.googleapis.com/v3/urlNotifications:publish', {
    method: 'POST', headers: { Authorization: `Bearer ${t}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ url, type: 'URL_UPDATED' }) })
  if (r.status === 200) { ok++; state.sent[url] = Math.floor(Date.now() / 1000) }
  else if (r.status === 429) { quota++; if (quota === 1) console.log('  429: cota do dia acabou, parando') ; break }
  else { fail++; if (fail <= 3) console.log(`  HTTP ${r.status}  ${url.replace(ORIGIN, '')}`) }
  await new Promise(x => setTimeout(x, 120))
}
fs.writeFileSync(STATE, JSON.stringify(state, null, 2))
console.log(`\naceitas ${ok}   erro ${fail}   parou por cota: ${quota ? 'sim' : 'nao'}`)
console.log(`total ja enviado alguma vez: ${Object.keys(state.sent).length} de ${urls.length}`)
}
