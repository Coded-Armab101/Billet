# Image manifest — Billet Design case study

> **Status update (2026-09-29):** the site now serves reference photography straight
> from the original site's Shopify CDN via `//modedesigns.com/cdn/shop/files/<file>?width=N`
> (see `cdn()` in `src/data/site.js`). The tables below remain the spec for the real
> Billet assets: swap each CDN path back to an equivalent `public/images/...` file and
> it will render the same way. Until such a file exists, the `<Slot>` component renders
> a labelled placeholder showing the exact filename and target dimensions.

## Current section → reference file map

Each homepage section now pulls its exact counterpart from the reference site:

| Section | Reference file | Ratio |
| --- | --- | --- |
| Hero | `prologue-lifestyle-desk-1.webp` | 16:9 |
| Featured — Overture 98% | `prologue-{black_sesame-obsc-front, classic_oak-mtry-front, golden_beige-mtry-front, dark_mushroom-cacao-front}.webp` | 5:4 |
| Featured — Cadenza 75% | `encore-{monterey_dune-mtry-front, matcha_cream-lotus-side, mocha_mushroom-cacao-side, monterey_dune-mtry-side}.webp` | 5:4 / 3:2 |
| Featured — Interlude 65% | `sonnet-{black_sesame-obsc-front, forest_mocha-cacao-front, golden_beige-mtry-front, studio_light-anth-front}.webp` | 3:2 |
| Keyboard stage (carsousel) | interlude → `onek.webp`, cadenza → `twok.webp`, overture → `threek.webp` (local), 40 series → `encore-matcha_cream-lotus-side` | 1:1 frame |
| Editorial detail (last) | `keyshow.webp` (local, transparent) | 16:9 |
| Editorial lead (middle) | `sonnet-golden_beige-lifestyle-3_1_…png` | 16:10 |
| Editorial portrait (first) | `keydraw.webp` (local, transparent) | 5:4 |
| Tape marquee | `community-{1,3,4,6}.png` (cycled) | 4:3 |
| Team band | `our-team.png` | 16:9 |
| Categories | `COPPER_0176-Edit.jpg`, `lotus-keycap-closeup.png`, `anthracite-switch-pile.jpg`, `encore-s2-collection.png` | 3:4 |
| Build band | `startbuilding.webp` (local) | 16:9 |
| Footer dither | `footer-dithered-keyboard.png` | 9.64:1 |
| Submenu previews | board fronts + `header-keycaps-{lotus,anthracite,obscura}.png` | landscape |

Drop the files into `public/images/` and keep the exact filenames. `jpg` is expected —
if you generate PNG/WebP, rename the path in `src/data/site.js` or the component that
references it.

## Where each image is used

- **Featured collection** — three cards side by side, each with its own 4-image
  crossfading gallery, 5:4, max 22rem tall. Swipe on touch, arrows on hover.
- **Keyboard stage** — one square 1:1 board per slide, centred, neighbours scaled down
  and pushed to the edges. Four slides.
- **Editorial** — one 21:9 chapter lead per tab, full-bleed in the 24-column grid.
- **Tape gallery** — two opposed marquee rows, 4:3, 20rem tall, looping infinitely.
- **Media bands** — 16:9 for Team and Start Building, 5:3 on mobile.

## Priority 1 — board shots

Used by both the featured cards and the stage, so these get you the most coverage.
All 5:4, cropped with the board centred on a plain background.

| File | Ratio | Target px | Notes |
| --- | --- | --- | --- |
| `images/boards/overture-front-graphite.jpg` | 5:4 | 1600 × 1280 | 98%, dark grey anodised, 3/4 top-down |
| `images/boards/overture-side-graphite.jpg` | 5:4 | 1600 × 1280 | low side profile, 6.5° |
| `images/boards/overture-front-bone.jpg` | 5:4 | 1600 × 1280 | same pose, light bone finish |
| `images/boards/overture-side-bone.jpg` | 5:4 | 1600 × 1280 | low side profile |
| `images/boards/interlude-front-oxide.jpg` | 5:4 | 1600 × 1280 | 65%, burnt-orange anodised |
| `images/boards/interlude-side-oxide.jpg` | 5:4 | 1600 × 1280 | |
| `images/boards/interlude-front-slate.jpg` | 5:4 | 1600 × 1280 | |
| `images/boards/interlude-side-slate.jpg` | 5:4 | 1600 × 1280 | |
| `images/boards/cadenza-front-slate.jpg` | 5:4 | 1600 × 1280 | 75%, knob visible, top-right |
| `images/boards/cadenza-side-slate.jpg` | 5:4 | 1600 × 1280 | |
| `images/boards/cadenza-front-verdigris.jpg` | 5:4 | 1600 × 1280 | patinated green |
| `images/boards/cadenza-side-verdigris.jpg` | 5:4 | 1600 × 1280 | |

The stage squares need the board **small and centred with clear space around it**, because
a neighbouring slide overlaps the frame edge. `object-fit: contain` is set, so a tight crop
is safe but a board that fills the square edge-to-edge will collide visually.

`images/boards/forty-series.jpg` — 5:4, 1600 × 1280. The limited-run stage slide:
numbered unit, verdigris inlay, bone anodize.

The hero (`images/hero/overture-desk.jpg`) is the same board as
`overture-front-graphite.jpg` but as a **lifestyle** shot: board on a real desk, warm
morning light, shallow depth of field. The layout is 16:9 with a bottom scrim and the
headline sits in the lower third — keep the board in the upper two thirds.

## Priority 2 — media bands

Both are 16:9 and full-bleed. Copy sits on top, so keep the interesting part away from
where the text lands: centred for Team, left third for Start Building.

| File | Ratio | Target px | Notes |
| --- | --- | --- | --- |
| `images/team/studio.jpg` | 16:9 | 2560 × 1440 | workshop bench, half-finished boards, centred subject |
| `images/build/workshop.jpg` | 16:9 | 2560 × 1440 | kit laid out flat, subject weighted right |
| `images/footer/dithered-keyboard.jpg` | 21:9 | 2400 × 1030 | halftone / ordered-dither render, dark bg |
| `images/hero/overture-desk.jpg` | 16:9 | 2560 × 1440 | lifestyle hero |

## Priority 3 — tape gallery

Eight tiles, 4:3, in two rows. Row one scrolls right-to-left, row two left-to-right.
Each tile is repeated three times in the DOM to make the loop seamless, so a single set of
eight files covers both rows.

- `images/community/c1.jpg` … `images/community/c8.jpg` — 4:3, 1800 × 1350

Mix scales and subjects so the band reads as a real photo set: desk shots, macro details,
keycap trays, switch testers, plate and foam stacks.

## Priority 4 — editorial

Two chapter leads, one per tab, 21:9, full-bleed in the grid.

- `images/editorial/premise.jpg` — 21:9, 2400 × 1030
- `images/editorial/method.jpg` — 21:9, 2400 × 1030

The `editorial-captions` list under each lead is text-only, so
`images/editorial/premise-materials.jpg`, `premise-tolerances.jpg`, `premise-finishes.jpg`,
`method-plates.jpg`, `method-forcecurve.jpg` and `method-sound.jpg` are currently
referenced in `src/data/site.js` but not rendered. Say the word and I'll wire them into
the captions as a thumbnail strip.

## Priority 5 — categories

Portrait cards (3:4), revealed on hover alongside the category name. The hover card
**alternates sides down the list** (first right, second left, …) and carries a ±15° tilt,
matching the reference. Currently pointing at reference CDN photography:

- `Keyboards` → `COPPER_0176-Edit.jpg`
- `Keycaps` → `lotus-keycap-closeup.png`
- `Switches` → `anthracite-switch-pile.jpg`
- `Components` → `encore-s2-collection.png`

The temporary SVGs (`images/categories/keyboards.svg`, etc.) are kept under
`public/images/categories/` as a fallback but no longer referenced.

Replace a card by adding `images/categories/<name>.jpg` (4:3 portrait, 600 x 800
up to 1200 x 1600) and pointing `src` at the `.jpg` in `src/data/site.js`.

Replace a card by adding `images/categories/<name>.jpg` (4:3 portrait, 600 × 800
up to 1200 × 1600) and pointing `src` at the `.jpg` in `src/data/site.js`.

## Priority 6 — product library

Referenced by the nav dropdowns. Not on the homepage body, so lower priority unless you
plan a shop page next.

- `images/keycaps/{chalk,basalt,sorrel,cinder,fern}.jpg` — 4:3
- `images/switches/{slate-linear,hearth-tactile,hush-silent}.jpg` — 4:3
- `images/cmf/{graphite,bone,oxide,verdigris,slate,sand}.jpg` — 1:1 macro close-ups of
  the finishes

## Art direction notes

- Warm neutral studio background, one soft key light from camera-left, large fill.
- Boards shot slightly above centre so the top surface reads.
- Keep colour temperature consistent across the whole set — the case study sells
  material, and mixed white balance undercuts it.
- No visible logos, no competitor branding.
