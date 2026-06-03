// app/components/JsonLd.tsx
// ─────────────────────────────────────────────────────────────────────────────
// Injeta JSON-LD com segurança no Next.js App Router (Server Component).
// Aceita um objeto OU um array de objetos de schema.
// Renderize dentro do body de uma page.tsx ou layout.tsx — NÃO funciona
// em arquivos 'use client'.
// ─────────────────────────────────────────────────────────────────────────────

import { Fragment } from 'react'

type Json = Record<string, unknown>

export function JsonLd({ data }: { data: Json | Json[] }) {
  const blocks = Array.isArray(data) ? data : [data]

  return (
    <Fragment>
      {blocks.map((block, i) => (
        <script
          key={i}
          type="application/ld+json"
          // Escapa "<" pra não quebrar a tag <script> (proteção XSS)
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(block).replace(/</g, '\\u003c'),
          }}
        />
      ))}
    </Fragment>
  )
}
