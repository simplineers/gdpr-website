# gdpr.simplineers.se

Källkod för **[gdpr.simplineers.se](https://gdpr.simplineers.se)** — en svenskspråkig
utbildningsplats om GDPR och dataskydd, skriven för dig som arbetar i gränslandet
mellan juridik och IT.

Premissen: dataskydd är varken ett rent juridiskt eller ett rent tekniskt problem.
Platsen behandlar det som något som börjar i lagens *syfte*, översätts till kontroller,
mäts som risk och förvaltas i samma system som resten av organisationens GRC-arbete.

## Sidor

- **`index.html`** — startsida: lärvägar, verktyg och metod.
- **`gdpr_infosak_venn.html`** — GDPR-artiklar placerade mot CIA-triaden (Art. 32.1(b))
  som ett interaktivt Venn-diagram, med övriga artiklar i en dataskyddsram runt om.
- **`llm-arkitektur-sakerhetsgranskning.html`** — storskalig LLM-arkitektur sedd ur ett
  IT-säkerhets- och granskningsperspektiv; expanderbara komponentkort med
  granskningspunkter.
- **`gdpr-llm-audit-kravkarta.html`** — GDPR-funktionens audit-kravkarta för
  LLM-applikationsarkitektur; 24 moduler mappade mot risker, kontroller,
  loggningspunkter och artiklar.
- **`integritet.html`** — integritetsnotis.

## Teknik

- Statisk HTML/CSS — inget byggsteg, inget ramverk, ingen bundler.
- Egenhostade webbtypsnitt (Fraunces, Newsreader, JetBrains Mono, Inter, IBM Plex
  Sans/Mono) under `public/fonts/` — inga Google Fonts, inga externa anrop.
- Små JS-hjälpare i vanilla JS: `audit-tooltip.js` (tooltips för markörer) och
  `chips.js` (tangentbords- och skärmläsarstöd för artikelchips).
- Säkerhetshuvuden i `public/_headers`: strikt CSP, HSTS, `X-Frame-Options: DENY`,
  `Referrer-Policy: no-referrer` och en `Permissions-Policy` som väljer bort
  topics/FLoC.

> **Notis om sökvägar för skript:** HTML-sidorna laddar skript från `js/…`
> (t.ex. `<script src="js/audit-tooltip.js">`), och `_headers` har en `/js/*`-regel.
> Säkerställ att `audit-tooltip.js` och `chips.js` faktiskt ligger i `public/js/`
> så att sökvägarna stämmer.

## Filstruktur

```
.
├── LICENSE
├── README.md
└── public/                  # publiceringskatalog
    ├── _headers              # säkerhets- och cache-huvuden (Cloudflare Pages / Netlify)
    ├── index.html
    ├── integritet.html
    ├── gdpr_infosak_venn.html
    ├── gdpr-llm-audit-kravkarta.html
    ├── llm-arkitektur-sakerhetsgranskning.html
    ├── js/                   # audit-tooltip.js, chips.js
    └── fonts/                # egenhostade .woff2-filer
```

## Lokal utveckling

Inget byggsteg — servera bara katalogen `public/`:

```bash
python3 -m http.server --directory public 8000
# öppna sedan http://localhost:8000
```

Filen `_headers` tillämpas av hosten (Cloudflare Pages / Netlify), inte av en lokal
statisk server. CSP och cache-beteende kan därför bara verifieras fullt ut efter
driftsättning.

## Driftsättning

Driftsätt `public/` som webbplatsens rot. Filen `_headers` använder konventionen från
Cloudflare Pages / Netlify för svarshuvuden och långlivad, oföränderlig cachning av
`/fonts/*`.

## Integritet

Webbplatsen samlar inte in något om besökare: inga cookies, ingen analytics, inga
spårningspixlar, inga formulär, inga sessioner och inga accessloggar. Se
`integritet.html` för hela notisen.

## Licens

Hela projektet — kod och innehåll — är licensierat under
**[Creative Commons Erkännande 4.0 Internationell (CC BY 4.0)](https://creativecommons.org/licenses/by/4.0/deed.sv)**.

Fri att dela, kopiera och anpassa — även kommersiellt — så länge upphovsperson anges.
Se `LICENSE` för fullständiga villkor. Upphovsangivelse: *Kim Hindart, Simplineers*.

## Upphovsperson

Kim Hindart · [Simplineers](https://gdpr.simplineers.se) · Stockholm
