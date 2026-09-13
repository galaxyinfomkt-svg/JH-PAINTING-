#!/usr/bin/env python3
"""
medir-conteudo-proprio.py - quanto de cada pagina e realmente dela.

POR QUE ISTO EXISTE
-------------------
Em 21/08/2026 o trafego de busca caiu 95% num unico dia, uniforme em todo tipo
de pagina, sem nenhum deploy nos 2 dias anteriores nem nos 10 seguintes, e com a
busca de marca MELHORANDO no meio da queda. Isso descarta punicao de dominio,
robots.txt, update do Google e qualquer coisa que tenha entrado no codigo.

Sobra uma explicacao, e este script a mede.

COMO MEDE
---------
Para cada pagina renderizada:
  1. tira script/style e tags, sobra o texto que a pessoa le;
  2. MASCARA o nome da cidade e do servico daquela pagina, mais todo numero.
     Este passo e o coracao: duas paginas que so diferem por "Acton" e
     "Arlington" viram identicas - que e exatamente como o Google as enxerga;
  3. quebra em frases de 45+ caracteres;
  4. conta quantas frases aparecem em UMA unica pagina do site;
  5. devolve, por pagina, o % de CARACTERES que sao so dela.

RESULTADO DA PRIMEIRA MEDICAO, 13/09/2026, 1.042 paginas:

  mediana de conteudo proprio . . . . . . . . 0,0%
  paginas com menos de 5% proprio . . . . . . 727  (69,8%)
  paginas acima de 80% proprio  . . . . . . .  23  ( 2,2%)

  As 819 paginas cidade x servico sao IDENTICAS entre si depois da mascara.
  Zero frase propria. Nao e "parecido": e a mesma pagina com o nome trocado.

E O QUE ISTO NAO QUER DIZER
---------------------------
Nao quer dizer "reescreva com sinonimos". app/data/indexing.ts ja registra o
motivo: "cities without entries in cityEvidence may still land in 'Crawled -
currently not indexed' no matter how varied the wording is. That is not a bug -
it is Google correctly noticing that a page adds no information."

Texto novo sobre cidade onde nunca se trabalhou continua nao acrescentando
informacao. O numero sobe, o problema fica. A diferenca precisa vir de fato
real: obra feita, foto, video, medida.

USO
  python3 scripts/medir-conteudo-proprio.py .next/server/app JH

  (rode `npm run build` antes - ele le o HTML ja renderizado, nao o codigo)

Escreve tambem um JSON com o ranking completo, para acompanhar a evolucao
pagina a pagina.
"""
import os,re,sys,html,json
from collections import Counter, defaultdict

root=sys.argv[1]; label=sys.argv[2]
TAG=re.compile(r'<(script|style)[^>]*>.*?</\1>',re.S|re.I)
STRIP=re.compile(r'<[^>]+>')
WS=re.compile(r'\s+')

def text_of(p):
    s=open(p,encoding='utf-8',errors='replace').read()
    s=TAG.sub(' ',s); s=STRIP.sub(' ',s)
    return WS.sub(' ',html.unescape(s)).strip()

files=[]
for dp,_,fns in os.walk(root):
    for fn in fns:
        if fn.endswith('.html'): files.append(os.path.join(dp,fn))
files.sort()

def slug_tokens(path):
    rel=path[len(root):].replace('.html','').strip('/')
    toks=set()
    for part in rel.split('/'):
        if not part: continue
        toks.add(part)
        toks.add(part.replace('-',' '))
    return toks

def mask(t, toks):
    # mascara o nome da cidade/servico da propria pagina: duas paginas que so
    # diferem nisso passam a ser IDENTICAS, que e o que o Google enxerga.
    for tk in sorted(toks,key=len,reverse=True):
        if len(tk)<3: continue
        t=re.sub(re.escape(tk),' <X> ',t,flags=re.I)
    t=re.sub(r'\d+',' <N> ',t)
    return WS.sub(' ',t)

def sentences(t):
    parts=re.split(r'(?<=[.!?])\s+|\s{2,}|•',t)
    return [p.strip() for p in parts if len(p.strip())>=45]

# passo 1: frequencia de cada frase no corpus
freq=Counter()
cache={}
for i,f in enumerate(files):
    t=mask(text_of(f), slug_tokens(f))
    ss=sentences(t)
    cache[f]=ss
    freq.update(set(ss))

# passo 2: % de caracteres proprios por pagina
rows=[]
for f,ss in cache.items():
    if not ss: continue
    tot=sum(len(s) for s in ss)
    uniq=sum(len(s) for s in set(ss) if freq[s]==1)
    rows.append((uniq/tot*100 if tot else 0, f[len(root):].replace('.html','') or '/', tot))

rows.sort()
n=len(rows)
import statistics
pcts=[r[0] for r in rows]
print(f"\n########## {label} — {n} paginas medidas ##########")
print(f"  conteudo PROPRIO por pagina (%):  mediana {statistics.median(pcts):.1f}   media {statistics.mean(pcts):.1f}")
print(f"  minimo {pcts[0]:.1f}   maximo {pcts[-1]:.1f}")
faixas=[(0,5),(5,20),(20,40),(40,60),(60,80),(80,101)]
print("  distribuicao:")
for a,b in faixas:
    c=sum(1 for p in pcts if a<=p<b)
    print(f"    {a:3}-{b:3}% proprio : {c:5}  ({c/n*100:5.1f}%)  {'#'*int(c/n*60)}")
acima=sum(1 for p in pcts if p>80)
print(f"\n  >>> paginas ja com MAIS de 80% proprio: {acima} de {n}  ({acima/n*100:.1f}%)")
print(f"  >>> faltam: {n-acima}")
print("\n  10 piores:")
for p,path,tot in rows[:10]: print(f"    {p:5.1f}%  {path[:62]}  ({tot} chars)")
json.dump([{'pct':p,'path':path,'chars':t} for p,path,t in rows], open(f'./dup_{label}.json','w'))
