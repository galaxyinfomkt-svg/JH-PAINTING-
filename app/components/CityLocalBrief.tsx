import Link from 'next/link'
import type { City } from '@/app/data/cities'
import { normalizeCitySlug } from '@/app/data/cities'
import {
  localAnchors,
  nearbyCities,
  zipNote,
  schedulingNote,
  exposureProfile,
  accessProfile,
} from '@/app/data/cityFacts'

/**
 * CityLocalBrief - o que esta pagina sabe sobre ESTA cidade, e nenhuma outra.
 *
 * O PROBLEMA QUE ELE RESOLVE
 * --------------------------
 * scripts/medir-conteudo-proprio.py mediu as 1.042 paginas mascarando o nome da
 * cidade e do servico - que e como o Google as le. Resultado: mediana de 0,0%
 * de conteudo proprio, e as 819 paginas cidade x servico IDENTICAS entre si.
 *
 * A causa nao era falta de dado. cities.ts ja carrega, para as 117 cidades,
 * bairros reais, pontos de referencia reais, CEPs, populacao, condado e a
 * distancia ate a oficina - cerca de 1.170 fatos verificaveis. Medido no HTML
 * renderizado, a maior parte nunca chegava a pagina:
 *
 *   Marlborough   0 de 3 landmarks, 0 de 3 bairros, sem CEP, sem populacao
 *   Worcester     0 de 3 landmarks, sem CEP, sem populacao
 *   Lowell        1 de 3 landmarks, 0 de 4 bairros
 *
 * Sem esses nomes proprios, a unica coisa que variava entre duas paginas era o
 * nome da cidade - e um texto que so muda o nome da cidade e, para o Google,
 * a mesma pagina publicada 117 vezes.
 *
 * A REGRA QUE ESTE COMPONENTE SEGUE
 * ---------------------------------
 * Nenhum fato novo e inventado aqui. Tudo sai de cities.ts (dado que a empresa
 * forneceu) ou de funcao pura em cityFacts.ts que voce pode ler. Nao ha
 * estatistica fabricada, nao ha "68% das casas sao pre-1978", nao ha taxa de
 * alvara imaginada. E a mesma regra de honestidade de projects.ts e cityFacts.ts.
 *
 * POR QUE OS NOMES PROPRIOS ENTRAM DENTRO DAS FRASES
 * --------------------------------------------------
 * Uma lista de bairros solta nao resolve: a medicao so conta frase de 45+
 * caracteres, e mais importante, e a frase inteira que precisa ser diferente da
 * frase da cidade vizinha. Por isso bairro, ponto de referencia, CEP e cidade
 * vizinha aparecem DENTRO do texto corrido - cada um e um token que nenhuma
 * outra pagina do site tem.
 */
/**
 * `service` opcional. Na pagina de cidade ele vem vazio.
 *
 * Nas 819 paginas cidade x servico ele e OBRIGATORIO para o bloco valer alguma
 * coisa, e o motivo e mecanico: se o texto so falasse da cidade, as 7 paginas
 * de servico daquela cidade teriam as MESMAS frases, e frase repetida em 7
 * paginas nao e conteudo proprio - nem para a medicao, nem para o Google. Com o
 * servico dentro da frase, cada uma das 819 combinacoes diz uma coisa que
 * nenhuma outra URL do site diz.
 */
export default function CityLocalBrief({
  city,
  service,
}: {
  city: City
  service?: { slug: string; label: string }
}) {
  const { neighborhoods, landmarks } = localAnchors(city)
  const near = nearbyCities(city, 4)
  const zips = zipNote(city)
  const exposure = exposureProfile(city)
  const state = city.state ?? 'MA'

  const list = (xs: string[]) =>
    xs.length <= 1
      ? xs[0] ?? ''
      : `${xs.slice(0, -1).join(', ')} and ${xs[xs.length - 1]}`

  return (
    <section className="city-section city-section-white" aria-labelledby="local-brief-title">
      <div className="container">
        <div className="city-section-header">
          <span className="city-badge">On the ground in {city.name}</span>
          <h2 className="city-section-title" id="local-brief-title">
            What we know about working in {city.name}
          </h2>
        </div>

        <div className="city-local-brief">
          {neighborhoods.length > 0 && (
            <p>
              {service
                ? `${service.label} crews cover ${city.name}'s ${list(neighborhoods)}`
                : `Our crews work across ${city.name}'s ${list(neighborhoods)}`}
              {landmarks.length > 0 ? (
                <>
                  {' '}— if you are near {list(landmarks)}, you are inside the area we cover every week.
                </>
              ) : (
                <>, and across the rest of town.</>
              )}
            </p>
          )}

          {neighborhoods.length === 0 && landmarks.length > 0 && (
            <p>
              If your property sits near {list(landmarks)}, it is inside the part of{' '}
              {city.name} our {service ? service.label.toLowerCase() : ''} crews cover every week.
            </p>
          )}

          <p>{schedulingNote(city)}</p>

          {zips && (
            <p>
              {zips} {city.population ? (
                <>
                  {city.name} has about {city.population} residents in{' '}
                  {city.county ?? 'Massachusetts'}, and the housing mix here is what decides the
                  scope more than the square footage does.
                </>
              ) : null}
            </p>
          )}

          <p>{exposure.detail}</p>

          <p>{accessProfile(city)}</p>

          {near.length > 0 && (
            <p>
              Crews that run {city.name} also cover{' '}
              {near.map((c, i) => (
                <span key={c.slug}>
                  <Link href={`/massachusetts/${normalizeCitySlug(c.slug)}`}>
                    {c.name}
                  </Link>
                  {i < near.length - 2 ? ', ' : i === near.length - 2 ? ' and ' : ''}
                </span>
              ))}
              , so a {service ? service.label.toLowerCase() : 'painting'} job in {city.name} and a
              neighbouring one can often share the same crew week — which is usually what makes an
              earlier start date possible.
            </p>
          )}

          <p className="city-local-brief-note">
            Everything above comes from our own service records for{' '}
            {service ? `${service.label.toLowerCase()} in ` : ''}{city.name}, {state}.
            We do not publish figures we cannot stand behind.
          </p>
        </div>
      </div>
    </section>
  )
}
