# Billet Design — case study

A single-page rebuild of a premium mechanical-keyboard storefront, re-skinned as a
fictional brand. The reference site is a design study: the layout, type system and
interaction patterns are matched, but every line of copy, product name, colourway and
image is original to Billet.

## Run

```bash
npm install
npm run dev
npm run lint
npm run build
```

## Naming system

| Slot | Names |
| --- | --- |
| Brand | Billet Design |
| Boards | Overture 98% · Interlude 65% · Cadenza 75% |
| Mounting | Truss Mount (8 point) |
| Colorways | Graphite, Bone, Oxide, Verdigris, Slate, Sand |
| Keycaps | Chalk, Basalt, Sorrel, Cinder, Fern |
| Switches | Slate Linear, Hearth Tactile, Hush Silent |
| Tagline | For the Work That Gets Done |

All copy, product data and swatch colours live in `src/data/site.js`. Edit that file to
reword anything without touching components.

## Design system

Tokens are in `src/index.css`; component styles in `src/styles/site.css`.

- **Surface** — cream paper (`oklch(95.6% .012 85)`) with a cool graphite ink. One
  brass accent. Defined as a Tailwind-style token ladder (`--color-paper-100…900`,
  `--color-ink-100…900`) so relationships stay explicit.
- **Type** — one font weight, `400`. Hierarchy comes from size and optical tracking
  only, never from bold. Display sizes carry a fluid negative `letter-spacing` in px
  plus a small negative `margin-left` for optical alignment.
  - `.t-huge` / `.t-massive` — statement display, weight 300
  - `.t-h1` … `.t-h6` — section scale
  - `.t-small-accent` / `.t-accent` / `.t-tiny` — the mono micro-labels
  - `.t-small` / `.t-warm` — supporting copy
- **Grid** — a 72px hairline layout grid is drawn behind most sections via
  `.grid-overlay`.
- **Controls** — 5px radius buttons, `.btn-primary` / `-secondary` / `-outline` /
  `-outline-light` / `-muted` / `-link`, plus `.btn-pill` for tags.
- **Container** — 90rem max width, fluid inline padding.

### Fonts

Inter Tight (display), Inter (text), IBM Plex Mono (labels). All open-source
substitutes chosen to sit close to the reference's licensed typefaces.

## Structure

```
src/
  App.jsx                 section order
  data/site.js            all copy, products, nav, swatches
  index.css               tokens, reset, type utilities, buttons
  styles/site.css         component styles
  components/
    Header.jsx            sticky-free bar, hover mega-menu, utility pill, Build Yours
    Hero.jsx              90vh capped at 800px, image capped at 80rem
    Boards.jsx            three layouts, draggable carousels
    BoardSlider.jsx       drag + arrow navigation
    Mission.jsx           dark editorial section, two tabs
    Specs.jsx             measurement grid
    Community.jsx         asymmetric photo mosaic
    Team.jsx              split layout
    Categories.jsx        four category tiles
    Build.jsx             three-step build section
    Signup.jsx            newsletter
    Footer.jsx            four columns + dither strip
    TypingTest.jsx        working 25s typing test modal
    Slot.jsx              image slot with placeholder fallback
```

## Images

Every image is requested from `public/images/`. Until a file exists, `Slot` renders a
labelled placeholder showing the exact filename and target dimensions, so dropping a
file in swaps it in live. See `public/images/MANIFEST.md` for the full list, priority
order, aspect ratios and art direction notes.

## Header behaviour

- Nav opens a full-width submenu on hover, cross-fading a preview image as you move
  between entries.
- The `+` next to each label rotates 90° while its menu is open.
- **Build Yours** sits butted against the utility pill and collapses on scroll.
- Below 1024px the nav collapses to a full-height drawer.
