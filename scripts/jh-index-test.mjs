/**
 * jh-index-test.mjs - teste controlado da Indexing API na JH.
 *
 * POR QUE ISTO EXISTE
 * A documentacao do Google diz que a Indexing API so vale para paginas com
 * JobPosting ou BroadcastEvent, e a JH nao tem nenhuma das duas. Na RS, 1.687
 * URLs empurradas em 9 dias resultaram em 70% nunca rastreadas. Este script
 * mede o mesmo na JH, com as URLs que de fato importam, para a resposta vir do
 * dado deste site e nao de outro.
 *
 * So empurra pagina que continua indexavel. Empurrar as 496 que acabaram de
 * receber noindex seria pedir ao Google para rastrear o que queremos que ele
 * esqueca.
 *
 *   node scripts/jh-index-test.mjs           # mostra o que faria
 *   node scripts/jh-index-test.mjs --send    # dispara de verdade
 */
import fs from 'node:fs'
import crypto from 'node:crypto'

const KEY = process.env.GSC_KEY || 'c:/Users/RHAIDELINE/Downloads/RS DEVELOP NOVO/google-service-account.json'
const SCOPE = 'https://www.googleapis.com/auth/indexing'
const PUBLISH = 'https://indexing.googleapis.com/v3/urlNotifications:publish'
const SEND = process.argv.includes('--send')
const O = 'https://jhpaintingservices.com'

const URLS = [
  '/services',                            // nunca rastreada, hub de 7 paginas
  '/massachusetts/groton',                // foto + video
  '/massachusetts/southbridge',           // foto + video
  '/massachusetts/marlborough',           // a sede
  '/massachusetts/concord',
  '/massachusetts/waltham',
  '/massachusetts/shrewsbury',
  '/massachusetts/hudson',
  '/massachusetts/newton',
  '/massachusetts/boston',
].map(p => O + p)

const b64 = o => Buffer.from(typeof o === 'string' ? o : JSON.stringify(o))
  .toString('base64').replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_')

async function token() {
  const k = JSON.parse(fs.readFileSync(KEY, 'utf8'))
  const now = Math.floor(Date.now() / 1000)
  const claim = { iss: k.client_email, scope: SCOPE, aud: 'https://oauth2.googleapis.com/token', exp: now + 3600, iat: now }
  const unsigned = `${b64({ alg: 'RS256', typ: 'JWT' })}.${b64(claim)}`
  const sig = crypto.createSign('RSA-SHA256').update(unsigned).sign(k.private_key)
  const jwt = `${unsigned}.${sig.toString('base64').replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_')}`
  const r = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer', assertion: jwt }),
  })
  const j = await r.json()
  if (!j.access_token) throw new Error('token: ' + JSON.stringify(j))
  return j.access_token
}

const t = await token()
console.log(`  escopo de indexacao autenticado\n`)
const log = []
for (const url of URLS) {
  if (!SEND) { console.log(`  [simulacao] ${url.replace(O, '')}`); continue }
  const r = await fetch(PUBLISH, {
    method: 'POST', headers: { Authorization: `Bearer ${t}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ url, type: 'URL_UPDATED' }),
  })
  const j = await r.json().catch(() => ({}))
  const ok = r.status === 200
  console.log(`  ${ok ? 'aceita ' : 'ERRO   '} HTTP ${r.status}  ${url.replace(O, '')}${ok ? '' : '  ' + (j.error?.message || '').slice(0, 80)}`)
  log.push({ url, status: r.status, at: new Date().toISOString() })
  await new Promise(r => setTimeout(r, 300))
}
if (SEND) {
  fs.writeFileSync('jh-index-test.json', JSON.stringify({ sentAt: new Date().toISOString(), results: log }, null, 2))
  console.log(`\n  ${log.filter(x => x.status === 200).length} de ${log.length} aceitas pela API`)
  console.log('  registrado em jh-index-test.json. Medir de novo em 3 a 5 dias.')
}
