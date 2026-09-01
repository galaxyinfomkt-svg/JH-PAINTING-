import { videosForCity, videoSchema, isSelfHosted } from '@/app/data/videos'

/**
 * Filmagem de obra na pagina de cidade.
 *
 * POR QUE ISTO EXISTE
 * app/data/videos.ts ja trazia videosForCity() e o VideoObject, mas nada no app
 * chamava nenhum dos dois: os helpers estavam definidos e nunca consumidos, e um
 * video adicionado ao array nao apareceria em lugar nenhum. Este componente e a
 * ponta que faltava.
 *
 * Vale mais que texto pelo mesmo motivo que CityProof vale: app/data/indexing.ts
 * registra que a pagina de cidade sem prova de primeira mao tende a ficar em
 * "Crawled - currently not indexed" por mais variado que seja o texto. Foto
 * prova o resultado; filmagem prova a execucao, que e o que ninguem copia.
 *
 * PERFORMANCE
 * preload="none" e obrigatorio aqui. O MP4 tem ~4 MB e a capa tem 32 KB, entao
 * a pagina carrega a imagem e mais nada; os megabytes so saem do servidor se a
 * pessoa clicar em play. Sem isso, um video numa pagina de cidade custaria mais
 * que a pagina inteira e desfaria o trabalho feito no LazyHeroForm.
 *
 * Nao renderiza nada quando a cidade nao tem filmagem. Um estado vazio seria
 * pior que a ausencia, e inventar um esta fora de questao.
 */
export default function CityVideo({
  citySlug,
  cityName,
  state = 'MA',
}: {
  citySlug: string
  cityName: string
  state?: string
}) {
  const list = videosForCity(citySlug).filter(isSelfHosted)
  if (list.length === 0) return null

  const schema = videoSchema(list)

  return (
    <section className="cityvid" aria-labelledby="cityvid-h">
      {schema ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ) : null}
      <div className="cityvid-inner">
        <p className="cityvid-eyebrow">On the job</p>
        <h2 id="cityvid-h" className="cityvid-h">
          Watch us work in {cityName}
        </h2>
        <p className="cityvid-lede">
          Filmed by our own crew on site in {cityName}, {state}.
        </p>

        <ul className="cityvid-list">
          {list.map((v) => (
            <li key={v.id} className="cityvid-item">
              {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
              <video
                className="cityvid-player"
                src={v.src}
                poster={v.poster}
                preload="none"
                controls
                playsInline
                aria-label={v.title}
              />
              <p className="cityvid-cap">{v.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
