# Sankaripaja — Northern Hero Forge

A browser-only character & NPC generator for a RuneQuest-inspired
home game set in **Kalevalan Finland** and **Viking Age Scandinavia**.

No build step, no backend, no dependencies at runtime.

## Run it

Any static file server works:

```bash
npm start          # serves http://localhost:5173
# or: python3 -m http.server 8000
```

Then open the printed URL in your browser.

(Open `index.html` directly from disk works too in most browsers —
ES modules require `http://` in Chrome, so a server is preferred.)

## Features

- **Fully random mode** — one click generates a complete character.
- **Guided mode** — choose culture, homeland, gender, age bracket and
  occupation; everything else is rolled for you.
- **Culture-true content**
  - Finnish homelands: Häme, Savo, Karelia, Varsinais-Suomi,
    Pohjanmaa, Sápmi border wilderness — Kalevalan names, bynames,
    occupations (tietäjä, runonlaulaja, seppä…) and mythology-anchored
    backgrounds (the Sampo, bear-kin, charm-debts, Louhi's shore).
  - Norse homelands: Norway, Denmark, Svealand, Gotland — patronymics
    and bynames, skalds, völur, húskarlar, and saga-flavoured hooks.
- **RuneQuest-style stats** — STR, CON, SIZ, DEX, INT, POW, APP on
  2d6+6, adjusted by homeland, occupation and age bracket, plus
  derived Hit Points, Magic Points and Damage Bonus.
- **Wealth** in squirrel pelts (the historical fur-standard) and
  silver pennies.
- **Personality** — two virtues, one flaw, a tell, and a motivation.
- **Portrait prompt** — one click copies an AI-image prompt that
  describes the character in their correct material culture, ready to
  paste into any image generator.
- **Printable character sheet** — a dedicated print stylesheet turns
  the sheet into a clean, ink-friendly A4 page.
- **Longhouse storage** — save characters to localStorage, load or
  delete them later; export any character as JSON.

## Project structure

```
index.html          page shell + control panel
css/styles.css      parchment/ironwood theme + @media print sheet
js/data.js          all setting data (names, homelands, occupations,
                    personality, story fragments)
js/generator.js     generation engine (stats, name, history, wealth)
js/app.js           UI wiring, rendering, storage
test/smoke.mjs      headless engine sanity check
assets/             sample AI portraits (e.g. the demo Karelian
                    rune-singer rendered from the app's own prompt)
```

## Testing

```bash
npm test   # 3,000 random characters + guided-mode constraint probes
```

## Ideas for later

- Skill lists & specialities per occupation (RuneQuest-style d100 skills)
- Rune affinities / favour tracks for Kalevalan spirits
- Party/family group generation (generate an NPC village at once)
- Optional die-type weights per homeland ("harsh lands, harder folk")
