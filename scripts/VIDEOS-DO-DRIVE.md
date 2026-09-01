# Filmagens de obra no Drive — inventário e prioridade

Levantado em 01/09/2026 varrendo o Drive da conta `galaxyinfomkt@gmail.com`
pelas contas donas dos arquivos da JH (`contact@jhpaintingservices.com`,
`jhpaintingbussines@gmail.com`, `jhgooglprofile@gmail.com`).

**~50 filmagens de obra, 13 trabalhos, todas .MOV de iPhone entre 4 e 86 MB.**
Nenhuma está no site hoje. O site tem exatamente 2 vídeos, os dois do YouTube.

---

## Por que isto importa mais do que parece

`app/data/indexing.ts` já registra qual é o gargalo das páginas de cidade:

> *"cities WITH entries in cityEvidence should hold their rankings; cities
> without may still land in 'Crawled — currently not indexed' no matter how
> varied the wording is. That is not a bug — it is Google correctly noticing
> that a page adds no information. The fix is to fill cityEvidence from real
> jobs."*

Existem **6 cidades com página no site, sem nenhuma prova visual hoje, e com
filmagem de obra no Drive**. Um vídeo em cada uma vale mais que qualquer
reescrita de texto, porque é a única coisa que nenhum concorrente pode copiar.

---

## PRIORIDADE 1 — cidade tem página, não tem prova nenhuma, tem vídeo

| Pasta no Drive | Cidade | Clipes |
|---|---|---|
| Interior Painting in West Boylston | west-boylston | 10 |
| Interior Painting in Hopkinton-Ma | hopkinton | 7 |
| Interior Painting Wrentham | wrentham | 5 |
| Interior Painting Northbridge | northbridge | 5 |
| Bathroom Painting in Milford | milford | 1 |
| Bathroom Painting in Sherborn | sherborn | 1 |

## PRIORIDADE 2 — cidade já tem foto; o vídeo reforça

| Pasta no Drive | Cidade | Clipes |
|---|---|---|
| Interior Room Painting in Boston | boston | 7 |
| Interior Painting in Concord | concord | 4 |
| Roto-Rooter Marlborough — Cafeteria | marlborough | 2 |
| Roto-Rooter Marlborough — Training room | marlborough | 1 |
| Painting in Newton | newton | 1 |

## PRIORIDADE 3 — tem vídeo mas a cidade não tem página

Boxborough (4 clipes) e North Andover (2 clipes) não estão em
`app/data/cities.ts`. Ou se adiciona a cidade, ou o vídeo entra numa página de
serviço em vez de uma de cidade.

---

## Como colocar no ar

Na sua máquina, com `ffmpeg` instalado (`brew install ffmpeg`):

```bash
# 1. baixe a pasta do Drive (uma pasta = um trabalho)
# 2. converta — a pasta inteira vira UM vídeo, na ordem em que foi filmada
./scripts/prepare-videos.sh ~/Downloads/Hopkinton/ hopkinton-interior hopkinton
```

O script devolve `/public/videos/hopkinton-interior.mp4` + a capa `.jpg`, e
imprime a entrada pronta para colar em `app/data/videos.ts` — **já com a
duração lida do arquivo**, que é o campo que o `VideoObject` exige e que não
pode ser chutado.

Ajuste só o `title` e a `description` (são os dois que o Google mostra) e
comite. O vídeo aparece sozinho na página da cidade e o schema liga sozinho.

### Alvo de tamanho

Os `.MOV` originais somam centenas de MB. Depois do script, cada trabalho deve
ficar em **2 a 5 MB**. Se algum passar de 8 MB, corte para 30–40 segundos: numa
página de cidade ninguém assiste mais que isso, e cada MB extra sai do
orçamento de performance da página.

---

## O que eu não consegui fazer daqui, e por quê

- **Baixar os arquivos.** A ferramenta do Drive devolve o conteúdo como texto
  codificado; um vídeo de 12 MB viraria alguns milhões de tokens. Inviável.
- **Testar a conversão de ponta a ponta.** O ffmpeg deste ambiente é um build
  só de decodificação (sem `libx264`). A lógica do script foi testada
  (duração → ISO-8601, comportamento sob `set -e`, colisões de variável); os
  parâmetros de encode são os padrões de H.264 para web e rodam num ffmpeg
  normal.
- **Ler o canal do YouTube.** Bloqueado pela política de rede do ambiente, por
  isso os 2 vídeos que já existem continuam sem `uploadDate` e `duration` —
  são 30 segundos de trabalho manual abrindo cada um no YouTube.
