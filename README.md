# gdpr.simplineers.se

Källkod för **[gdpr.simplineers.se](https://gdpr.simplineers.se)** — Simplineers AB:s
publika sida med metod, verktyg och visualiseringar i gränslandet mellan dataskydd,
informationssäkerhet, affärskontinuitet och regelefterlevnad.

Premissen: god efterlevnad är varken ett rent juridiskt eller ett rent tekniskt
problem. Sidan behandlar det som något som börjar i lagens *syfte*, översätts till
processer och kontroller, mäts som risk och förvaltas i samma evidensstruktur som
resten av organisationens GRC-arbete.

## Sidor

- **`index.html`** — startsida för Simplineers AB: vad vi gör, ingång till metod,
  verktyg och manifest, och vilka vi är.
- **`metod_god_efterlevnad.html`** — *VTJ-metoden — metod för god efterlevnad*
  (uppkallad efter de tre parter den för samman: verksamheten, tekniken och
  juridiken): beroendekedjans sju nivåer, sju faser som binder samman styrning,
  process, information, risk och kontroll, samt arbetsflödets nio rörelser.
  Fyra riskperspektiv (dataskydd, informationssäkerhet, leverantör, kontinuitet),
  begreppsnyckel med metodens bärande begrepp och referensbibliotek över
  relevanta regelverk (GDPR, DORA, NIS2/CSL, AI Act,
  ISO 27001/27701/22301/42001 m.fl.). Sidan är referensverk till boken
  Svensson, Gustafsson & Hindart, *Metod för god efterlevnad av GDPR*
  (Studentlitteratur, utkommer december 2026), och håller de rörliga
  uppgifterna — regelverkens status, praxis och bevakning.
- **`gdpr_infosak_venn.html`** — GDPR-artiklar placerade mot CIA-triaden
  (Art. 32.1(b)) som ett interaktivt Venn-diagram, med övriga artiklar i en
  dataskyddsram runt om.
- **`llm-arkitektur-sakerhetsgranskning.html`** — storskalig LLM-arkitektur sedd
  ur ett IT-säkerhets- och granskningsperspektiv; expanderbara komponentkort med
  granskningspunkter över träningsplan, inferensplan och tvärgående funktioner.
  Avslutas med en begreppsnyckel för tekniska termer (tenant, RAG, embeddings,
  KV-cache, guardrail, prompt injection, DSR m.fl.).
- **`gdpr-llm-audit-kravkarta.html`** — GDPR-funktionens audit-kravkarta för
  LLM-applikationsarkitektur; 24 moduler mappade mot risker, kontroller,
  loggningspunkter och artiklar.
- **`verksamhetsprocesser-aktiebolag.html`** — referenskatalog över 158
  verksamhetsprocesser i svenska aktiebolag, fördelade på 13 områden och
  klassificerade som *allmänna*, *typiska*, *villkorade*, *bransch-/storleksberoende*
  eller *mognadsberoende*. ROPA-relevanta processer märks separat. Ankare för
  processkartläggning, ROPA-arbete och internkontroll.
- **`integritet.html`** — integritetsnotis.

## Teknik

- Statisk HTML/CSS — inget byggsteg, inget ramverk, ingen bundler.
- Egenhostade webbtypsnitt (Fraunces, Newsreader, JetBrains Mono, Inter, IBM Plex
  Sans/Mono) under `public/fonts/` — inga Google Fonts, inga externa anrop.
- Små JS-hjälpare i vanilla JS under `public/js/`:
  - `audit-tooltip.js` — tooltips för markörer i audit-kravkartan
  - `chips.js` — tangentbords- och skärmläsarstöd för artikelchips i Venn-diagrammet
  - `scroll-animations.js` — reveal-animation vid scroll (IntersectionObserver,
    respekterar `prefers-reduced-motion`) på metodsidan
  - `process-filter.js` — klassificeringsfilter med `aria-live` på processkatalogen
- Säkerhetshuvuden i `public/_headers`: stram CSP för skript och resurser
  (`default-src 'self'`, `script-src 'self'`, `object-src 'none'`,
  `frame-ancestors 'none'`), HSTS, `X-Frame-Options: DENY`,
  `Referrer-Policy: no-referrer` och en `Permissions-Policy` som väljer bort
  topics/FLoC. Inline-CSS tillåts medvetet eftersom sidorna är statiska och
  självbärande utan extern stylesheet-pipeline.

> **Notis om sökvägar för skript:** HTML-sidorna som använder externa skript
> laddar från `js/…` (t.ex. `<script src="js/audit-tooltip.js">`), och `_headers`
> har en `/js/*`-regel. Säkerställ att samtliga skript faktiskt ligger i
> `public/js/` så att sökvägarna stämmer.

## Filstruktur

```
.
├── LICENSE
├── README.md
└── public/                                   # publiceringskatalog
    ├── _headers                              # säkerhets- och cache-huvuden (Cloudflare Pages / Netlify)
    ├── index.html
    ├── integritet.html
    ├── metod_god_efterlevnad.html
    ├── gdpr_infosak_venn.html
    ├── gdpr-llm-audit-kravkarta.html
    ├── llm-arkitektur-sakerhetsgranskning.html
    ├── verksamhetsprocesser-aktiebolag.html
    ├── js/                                   # audit-tooltip.js, chips.js, scroll-animations.js, process-filter.js
    └── fonts/                                # egenhostade .woff2-filer
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

Webbplatsen har inte infört någon egen besöksanalys, spårning, cookies eller formulär.
Inga analytics, inga pixlar, inga sessioner och inga inloggningar. Om tekniska
driftloggar förekommer hos hosting- eller nätverksleverantör används de inte av oss
för analys, profilering eller uppföljning av besökare. Se `integritet.html` för hela
notisen.

## Licens

Hela projektet — kod och innehåll — är licensierat under
**[Creative Commons Erkännande 4.0 Internationell (CC BY 4.0)](https://creativecommons.org/licenses/by/4.0/)**.

Fri att dela, kopiera och anpassa — även kommersiellt — så länge upphovsperson anges.
Se `LICENSE` för fullständiga villkor. Upphovsangivelse: *Thomas Svensson, Daniel Gustafsson och Kim Hindart, Simplineers AB*.

> CC BY 4.0 är vald för enhetlighet eftersom kod, innehåll och visualiseringar är
> tätt sammanvävda på sidan. För återanvändning av enbart kodfragment (HTML/CSS/JS
> under `public/js/` och inline-snuttar) gäller samma villkor — upphovsangivelse
> räcker. Om en framtida uppdelning till MIT/Apache-2.0 för kod och CC BY 4.0 för
> innehåll skulle bli aktuellt görs den explicit och dokumenteras här.

## Upphovspersoner

Thomas Svensson, Daniel Gustafsson och Kim Hindart · [Simplineers AB](https://gdpr.simplineers.se) · Stockholm
