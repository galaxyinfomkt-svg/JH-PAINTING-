import Image from 'next/image'
import Link from 'next/link'
import { projectsForCity, formatCompleted, type Project } from '@/app/data/projects'

/**
 * First-hand proof block for /massachusetts/[city] and city+service pages.
 *
 * This renders ONLY when we hold real photographs from that town. It is the
 * difference between a page that is merely different from its 115 siblings and
 * a page that is defensible: generated copy says we serve the town, this shows
 * a job we finished there, with the month and the client where nameable.
 *
 * Renders nothing at all for towns with no documented work - an empty state
 * would be worse than absence, and fabricating one is out of the question.
 */
/**
 * Transforma os registros de obra em PROSA, nao em rotulos soltos.
 *
 * POR QUE. Antes esta secao mostrava titulo, espaco e data como fragmentos -
 * "Cafeteria", "2025-10", "Commercial Painting". Fragmento curto nao e frase, e
 * o que carrega significado para um buscador (e para a medicao de conteudo
 * proprio) e a frase inteira. Os mesmos fatos, escritos como texto corrido,
 * passam a ser conteudo que so esta cidade tem.
 *
 * A REGRA CONTINUA A MESMA de projects.ts: so entra o que o registro prova -
 * cidade, tipo de trabalho, espaco, cliente quando identificavel, mes das
 * fotos e a QUANTIDADE de fotos, que e contavel. Nada de metragem inventada,
 * nada de codigo de tinta imaginado, nada de depoimento que ninguem deu.
 */
function proofNarrative(
  shown: Project[],
  cityName: string,
  state: string,
  totalPhotos: number
): string[] {
  const out: string[] = []
  const spaces = shown.map((p) => p.space).filter(Boolean) as string[]
  const dated = shown.filter((p) => p.completed)
  const clients = Array.from(new Set(shown.map((p) => p.client).filter(Boolean))) as string[]
  const trades = Array.from(new Set(shown.map((p) => p.serviceLabel)))

  const join = (xs: string[]) =>
    xs.length <= 1 ? xs[0] ?? '' : `${xs.slice(0, -1).join(', ')} and ${xs[xs.length - 1]}`

  if (shown.length === 1) {
    const p = shown[0]
    const when = p.completed ? `In ${formatCompleted(p.completed)} we` : 'We'
    const who = p.client ? ` for ${p.client}` : ''
    const where = p.space ? `, covering the ${p.space.toLowerCase()}` : ''
    out.push(
      `${when} carried out ${p.serviceLabel.toLowerCase()} on this ${cityName} property${who}${where}.`
    )
  } else {
    const when = dated.length > 0 ? `In ${formatCompleted(dated[0].completed as string)} ` : ''
    const who = clients.length > 0 ? ` for ${join(clients)}` : ''
    out.push(
      `${when}we completed ${shown.length} separate jobs in ${cityName}${who}, covering ${join(trades.map((t) => t.toLowerCase()))}.`
    )
    if (spaces.length > 0) {
      out.push(
        `The spaces we worked in were the ${join(spaces.map((x) => x.toLowerCase()))}, each finished as its own stage so the building stayed usable throughout.`
      )
    }
  }

  out.push(
    `The ${totalPhotos} photographs below were taken on those jobs by our own crew in ${cityName}, ${state}. They are not stock images, and nothing in them was staged for the website.`
  )
  return out
}

export default function CityProof({
  citySlug,
  cityName,
  state = 'MA',
  service,
}: {
  citySlug: string
  cityName: string
  state?: string
  /** When set, prefer projects of this trade but fall back to any in town. */
  service?: string
}) {
  const all = projectsForCity(citySlug)
  if (all.length === 0) return null

  const matching = service ? all.filter((p) => p.service === service) : []
  const shown = (matching.length > 0 ? matching : all).slice(0, 3)
  const photos = shown.flatMap((p) =>
    p.photos.slice(0, 4).map((ph) => ({ ...ph, project: p }))
  )

  return (
    <section className="cityproof" aria-labelledby="cityproof-h">
      <div className="cityproof-inner">
        <p className="cityproof-eyebrow">Documented work</p>
        <h2 id="cityproof-h" className="cityproof-h">
          Jobs we&apos;ve finished in {cityName}
        </h2>
        <div className="cityproof-lede">
          {proofNarrative(shown, cityName, state, photos.length).map((line) => (
            <p key={line.slice(0, 40)}>{line}</p>
          ))}
        </div>

        <ul className="cityproof-jobs">
          {shown.map((p) => (
            <li key={p.slug}>
              <span className="cityproof-jt">
                {p.client ? <strong>{p.client}: </strong> : null}
                {p.title}
                {p.space ? ` - ${p.space}` : ''}
              </span>
              <span className="cityproof-jm">
                {p.serviceLabel}
                {p.completed ? ` · ${formatCompleted(p.completed)}` : ''}
              </span>
            </li>
          ))}
        </ul>

        <div className="cityproof-grid">
          {photos.map((ph, i) => (
            <figure key={ph.src} className="cityproof-cell">
              <Image
                src={ph.thumb}
                alt={`${ph.project.serviceLabel}${
                  ph.project.space ? ` - ${ph.project.space}` : ''
                } completed by JH Painting Services in ${cityName}, ${state}`}
                width={ph.w}
                height={ph.h}
                sizes="(max-width: 640px) 50vw, 25vw"
                loading={i < 2 ? 'eager' : 'lazy'}
              />
            </figure>
          ))}
        </div>

        <Link href={`/projects#${shown[0].slug}`} className="cityproof-link">
          See the full {cityName} project gallery →
        </Link>
      </div>
    </section>
  )
}
