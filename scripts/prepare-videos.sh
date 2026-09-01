#!/usr/bin/env bash
#
# prepare-videos.sh - transforma as filmagens de obra do Drive em video de web.
#
# POR QUE ISTO EXISTE
# -------------------
# As filmagens da equipe estao no Drive como .MOV de iPhone, entre 4 e 86 MB
# cada. Nenhum desses arquivos pode ir direto para o site: um .MOV de 30 MB numa
# pagina de cidade custa mais que a pagina inteira e o Safari e o unico
# navegador que o reproduz sem reclamar.
#
# Este script converte um arquivo (ou uma pasta inteira) para:
#
#   /public/videos/<slug>.mp4   H.264 + AAC, 1080px no lado maior, faststart
#                               (o moov atom vai para o inicio, senao o video
#                               so comeca depois de baixar tudo)
#   /public/videos/<slug>.jpg   frame de capa, usado como poster e como
#                               thumbnailUrl do VideoObject
#
# E imprime a entrada pronta para colar em app/data/videos.ts, JA COM A DURACAO
# REAL lida do arquivo - que e o campo que o schema exige e que nao pode ser
# chutado.
#
# USO
#   ./scripts/prepare-videos.sh IMG_1567.MOV hopkinton-interior hopkinton
#   ./scripts/prepare-videos.sh ~/Downloads/West\ Boylston/ west-boylston-interior west-boylston
#
#   $1  arquivo .MOV/.mp4, ou pasta com varios
#   $2  slug do video (vira o nome do arquivo)
#   $3  slug da cidade, igual ao de app/data/cities.ts (opcional)
#
# REQUISITO: ffmpeg e ffprobe no PATH (brew install ffmpeg).

set -euo pipefail

IN="${1:?informe o arquivo .MOV ou a pasta}"
SLUG="${2:?informe o slug do video, ex: hopkinton-interior}"
CITY="${3:-}"

command -v ffmpeg  >/dev/null || { echo "ffmpeg nao encontrado. brew install ffmpeg"; exit 1; }
command -v ffprobe >/dev/null || { echo "ffprobe nao encontrado. brew install ffmpeg"; exit 1; }

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
OUTDIR="$ROOT/public/videos"
mkdir -p "$OUTDIR"

# Uma pasta vira um unico video: as filmagens de obra sao varios clipes curtos
# do mesmo trabalho, e um so video de 30-40s rende muito mais que seis de 5s.
SOURCE="$IN"
CONCAT_LIST=""
if [ -d "$IN" ]; then
  CONCAT_LIST="$(mktemp)"
  # ordem alfabetica = ordem em que foram filmados (IMG_1554, IMG_1559, ...)
  find "$IN" -maxdepth 1 -type f \( -iname '*.mov' -o -iname '*.mp4' \) | sort | while read -r f; do
    printf "file '%s'\n" "$f" >> "$CONCAT_LIST"
  done
  COUNT=$(wc -l < "$CONCAT_LIST" | tr -d ' ')
  [ "$COUNT" -gt 0 ] || { echo "nenhum video em $IN"; exit 1; }
  echo "juntando $COUNT clipes de $IN"
  SOURCE="concat:$CONCAT_LIST"
fi

MP4="$OUTDIR/$SLUG.mp4"
JPG="$OUTDIR/$SLUG.jpg"

echo "convertendo -> $MP4"
if [ -n "$CONCAT_LIST" ]; then
  ffmpeg -hide_banner -loglevel error -y -f concat -safe 0 -i "$CONCAT_LIST" \
    -vf "scale='if(gt(iw,ih),-2,1080)':'if(gt(iw,ih),1080,-2)':flags=lanczos,fps=30" \
    -c:v libx264 -profile:v high -crf 26 -preset slow -pix_fmt yuv420p \
    -c:a aac -b:a 96k -ac 1 -movflags +faststart "$MP4"
else
  ffmpeg -hide_banner -loglevel error -y -i "$SOURCE" \
    -vf "scale='if(gt(iw,ih),-2,1080)':'if(gt(iw,ih),1080,-2)':flags=lanczos,fps=30" \
    -c:v libx264 -profile:v high -crf 26 -preset slow -pix_fmt yuv420p \
    -c:a aac -b:a 96k -ac 1 -movflags +faststart "$MP4"
fi
if [ -n "$CONCAT_LIST" ]; then rm -f "$CONCAT_LIST"; fi

# Poster: 1s dentro do video, para nao pegar um frame preto de abertura.
echo "gerando capa   -> $JPG"
ffmpeg -hide_banner -loglevel error -y -ss 1 -i "$MP4" -frames:v 1 -q:v 4 "$JPG"

# Duracao REAL, do arquivo. Nunca digitada a mao - e o que o VideoObject exige.
SECS=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$MP4" | cut -d. -f1)

# ISO-8601 de verdade: 3661s e PT1H1M1S, nao PT61M1S. Componentes zerados saem
# fora, entao 600s vira PT10M e nao PT10M0S. O Google rejeita o formato errado.
#
# `if` e nao `[ ... ] && ...`: com `set -e` ligado, um teste falso no topo de um
# `&&` derruba o script inteiro - e como nenhuma filmagem de obra passa de uma
# hora, o teste das horas seria falso SEMPRE e o script morreria em todo video.
DUR_H=$((SECS / 3600))
DUR_M=$(((SECS % 3600) / 60))
DUR_S=$((SECS % 60))
ISO="PT"
if [ "$DUR_H" -gt 0 ]; then ISO="${ISO}${DUR_H}H"; fi
if [ "$DUR_M" -gt 0 ]; then ISO="${ISO}${DUR_M}M"; fi
if [ "$DUR_S" -gt 0 ] || { [ "$DUR_H" -eq 0 ] && [ "$DUR_M" -eq 0 ]; }; then
  ISO="${ISO}${DUR_S}S"
fi

SIZE=$(du -h "$MP4" | cut -f1)
DIMS=$(ffprobe -v error -select_streams v:0 -show_entries stream=width,height -of csv=p=0:s=x "$MP4")
# VID_W/VID_H, nao W/H: `H` acima ja era a hora da duracao.
VID_W=${DIMS%x*}
VID_H=${DIMS#*x}
SHORT="false"
if [ "$VID_H" -gt "$VID_W" ]; then SHORT="true"; fi
TODAY=$(date +%Y-%m-%d)

echo
echo "pronto: $SIZE, $DIMS, ${SECS}s"
echo
echo "--- cole em app/data/videos.ts, dentro de videos[] ---"
cat <<ENTRY
  {
    id: '$SLUG',
    source: 'self-hosted',
    src: '/videos/$SLUG.mp4',
    poster: '/videos/$SLUG.jpg',
    title: 'TROCAR: o que o video mostra, com a cidade',
    description: 'TROCAR: uma ou duas frases sobre o trabalho filmado.',
    uploadDate: '$TODAY',
    duration: '$ISO',
$( [ -n "$CITY" ] && echo "    citySlug: '$CITY'," )
    service: 'interior-painting',
    isShort: $SHORT,
  },
ENTRY
echo "------------------------------------------------------"
echo
echo "duration saiu do arquivo, nao foi chutada. Ajuste title e description -"
echo "os dois aparecem no VideoObject e sao o que o Google mostra."
