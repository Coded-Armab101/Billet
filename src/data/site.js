// Reference images are served from the original site's Shopify CDN so the
// case study renders with real product photography. `cdn(file, w)` appends a
// width param; swap these out for local assets under /images whenever they
// land.
const cdn = (file, w = 1200) => `//modedesigns.com/cdn/shop/files/${file}?width=${w}`

export const brand = {
  name: 'Billet',
  suffix: 'Design',
  full: 'Billet Design',
  tagline: 'For the Work That Gets Done',
  domain: 'billet.design',
  year: 2026,
}

// Reference board renders mapped onto Billet names: Prologue = 98%, Encore =
// 75%, Sonnet = 65%. The trio is ordered 98 / 75 / 65 exactly as the
// reference's featured collection lists Prologue, Encore and Sonnet.
export const boards = [
  {
    id: 'overture',
    name: 'Overture',
    layout: '98%',
    stock: 'In stock — ships in 3 days',
    blurb:
      'Overture keeps the numpad, F-row and navigation cluster inside a case sized for the desk you already have.',
    from: 349,
    images: [
      { src: cdn('prologue-black_sesame-obsc-front.webp'), angle: 'Front' },
      { src: cdn('prologue-classic_oak-mtry-front.webp'), angle: 'Side' },
      { src: cdn('prologue-golden_beige-mtry-front.webp'), angle: 'Front' },
      { src: cdn('prologue-dark_mushroom-cacao-front.webp'), angle: 'Side' },
    ],
    colors: ['Graphite', 'Bone', 'Oxide', 'Verdigris'],
  },
  {
    id: 'cadenza',
    name: 'Cadenza',
    layout: '75%',
    stock: 'Pre-order — limited first run',
    blurb:
      'Cadenza splits the difference: a function row and a full-width knob for people who work in timelines and mixers.',
    from: 319,
    images: [
      { src: cdn('encore-monterey_dune-mtry-front.webp'), angle: 'Front' },
      { src: cdn('encore-matcha_cream-lotus-side.webp'), angle: 'Side' },
      { src: cdn('encore-mocha_mushroom-cacao-side.webp'), angle: 'Front' },
      { src: cdn('encore-monterey_dune-mtry-side.webp'), angle: 'Side' },
    ],
    colors: ['Slate', 'Verdigris', 'Graphite', 'Clay'],
  },
  {
    id: 'interlude',
    name: 'Interlude',
    layout: '65%',
    stock: 'In stock — ships in 3 days',
    blurb:
      'Interlude is the shortest path to a clean desk. No numpad, no filler keys, nothing between you and the work.',
    from: 289,
    images: [
      { src: cdn('sonnet-black_sesame-obsc-front.webp'), angle: 'Front' },
      { src: cdn('sonnet-forest_mocha-cacao-front.webp'), angle: 'Side' },
      { src: cdn('sonnet-golden_beige-mtry-front.webp'), angle: 'Front' },
      { src: cdn('sonnet-studio_light-anth-front.webp'), angle: 'Side' },
    ],
    colors: ['Oxide', 'Slate', 'Chalk', 'Sand'],
  },
]

export const colorways = [
  { name: 'Graphite', sub: 'Anodized aluminium', src: cdn('prologue-black_sesame-obsc-front.webp', 600) },
  { name: 'Bone', sub: 'Sealed ash', src: cdn('prologue-classic_oak-mtry-front.webp', 600) },
  { name: 'Oxide', sub: 'Anodized aluminium', src: cdn('sonnet-golden_beige-mtry-front.webp', 600) },
  { name: 'Verdigris', sub: 'Patinated brass inlay', src: cdn('sonnet-forest_mocha-cacao-front.webp', 600) },
  { name: 'Slate', sub: 'Bead-blasted steel', src: cdn('sonnet-studio_light-anth-front.webp', 600) },
  { name: 'Sand', sub: 'Media-blasted oak', src: cdn('prologue-dark_mushroom-cacao-front.webp', 600) },
]

export const keycaps = [
  { name: 'Chalk', sub: 'Doubleshot PBT', src: cdn('header-keycaps-lotus.png', 600) },
  { name: 'Basalt', sub: 'Doubleshot PBT', src: cdn('header-keycaps-anthracite.png', 600) },
  { name: 'Sorrel', sub: 'Doubleshot PBT', src: cdn('header-keycaps-obscura.png', 600) },
  { name: 'Cinder', sub: 'Doubleshot PBT', src: cdn('sonnet-golden_beige-mtry-front_1.png', 600) },
  { name: 'Fern', sub: 'Doubleshot PBT', src: cdn('sonnet-forest_mocha-cacao-front_1.png', 600) },
]

export const switches = [
  { name: 'Slate Linear', sub: '45g · POM stem', src: cdn('anthracite-switch-pile.jpg', 600) },
  { name: 'Hearth Tactile', sub: '55g · D-shaped bump', src: cdn('anthracite-switch-pile.jpg', 600) },
  { name: 'Hush Silent', sub: '50g · silicone damped', src: cdn('anthracite-switch-pile.jpg', 600) },
]

export const categories = [
  { name: 'Keyboards', href: '#keyboards', src: cdn('COPPER_0176-Edit.jpg', 600) },
  { name: 'Keycaps', href: '#categories', src: cdn('lotus-keycap-closeup.png', 600) },
  { name: 'Switches', href: '#categories', src: cdn('anthracite-switch-pile.jpg', 600) },
  { name: 'Components', href: '#categories', src: cdn('encore-s2-collection.png', 600) },
]

// Center-stage carousel: square frame, three visible slides, giant typed
// background text. Mirrors the reference's four-slot grid carousel — the
// reference leads with Sonnet (65%), then the 75%, the 98%, then the limited
// run, so the Billet slides follow the same 65 / 75 / 98 / 40 order.
export const carousel = {
  label: 'Our Keyboards',
  cta: { label: 'View all', href: '#categories' },
  slides: [
    {
      id: 'interlude',
      bgText: 'Interlude',
      title: 'Interlude 65%',
      subtitle: 'The desk essential. No numpad, no filler keys, nothing between you and the work.',
      buttonCaption: 'Ships in 3 days',
      src: '/images/onek.webp',
    },
    {
      id: 'cadenza',
      bgText: 'Cadenza',
      title: 'Cadenza 75%',
      subtitle: 'Function row and a full-width knob, for people who work in timelines and mixers.',
      buttonCaption: 'Ships in 3 days',
      src: '/images/twok.webp',
    },
    {
      id: 'overture',
      bgText: 'Overture',
      title: 'Overture 98%',
      subtitle: 'The full-size reference. Numpad, F-row and arrows, sized to the desk you already own.',
      buttonCaption: 'Ships in 3 days',
      src: '/images/threek.webp',
    },
    {
      id: 'forty-series',
      bgText: 'Series 40',
      title: 'The 40 Series',
      subtitle: 'Forty numbered units. Verdigris inlay, bone anodize, and a plate you can hear change.',
      buttonCaption: 'Pre-order — 40 units',
      src: cdn('encore-matcha_cream-lotus-side.webp', 1200),
    },
  ],
}

export const team = {
  heading: 'Our Team',
  body: 'Twenty-two people in a converted machine shop in Sheffield. Machinists, two acoustic engineers, a firmware person, and the person who answers your support email.',
  cta: { label: 'Meet the workshop', href: '#team' },
  src: cdn('our-team.png', 2000),
  overlay: 63,
}

export const buildCta = {
  heading: 'Start Building',
  body: 'Select your layout, choose the finish and materials, and dial in the details for your ideal typing experience. Every board ships as a kit you can keep re-tuning.',
  cta: { label: 'Build yours', href: '#build' },
  src: '/images/startbuilding.webp',
  overlay: 50,
}

// Editorial grid. The reference positions five blocks on a 36 x 36 tile grid
// on desktop and 27 x 63 on mobile, with the container pinned to a matching
// aspect ratio, so tile sizes stay square and type can scale off the span.
export const editorial = {
  desktop: { columns: 36, rows: 36, aspect: 1 },
  mobile: { columns: 27, rows: 63, aspect: 27 / 63 },
  blocks: [
    {
      id: 'mission',
      desktop: { column: '2 / 24', row: '3 / 11' },
      mobile: { column: '2 / 27', row: '2 / 15' },
      surface: 'background',
      kind: 'statement',
      pill: 'Our Mission',
      heading: 'Designing products for better spaces',
      inset: {
        desktop: { w: 'calc(100% - 2px)', h: 'calc(100% - 2px)', l: '1px', t: '1px' },
        mobile: { w: 'calc(100%)', h: 'calc(100%)', l: '0px', t: '0px' },
      },
    },
    {
      id: 'detail',
      desktop: { column: '2 / 17', row: '27 / 36' },
      mobile: { column: '3 / 18', row: '41 / 50' },
      surface: 'transparent',
      kind: 'media',
      fit: 'cover',
      src: '/images/keyshow.webp',
      alt: 'Billet board, keyshow finish',
      transform: { desktop: 'translate(-13px, 0px)' },
      inset: {
        desktop: { w: 'calc(100%)', h: 'calc(100%)', l: '0px', t: '0px' },
        mobile: { w: 'calc(100% + 2px)', h: 'calc(100%)', l: '0px', t: '0px' },
      },
    },
    {
      id: 'lead',
      desktop: { column: '5 / 28', row: '14 / 26' },
      mobile: { column: '2 / 27', row: '26 / 40' },
      surface: 'background',
      kind: 'media',
      fit: 'cover',
      src: cdn('sonnet-golden_beige-lifestyle-3_1_2ebb642b-ebef-47b9-ae70-a0a9eb9d9a70.png', 900),
      alt: 'A Billet board on a workshop bench',
      inset: {
        desktop: { w: 'calc(100%)', h: 'calc(100% + 3px)', l: '0px', t: '0px' },
        mobile: { w: 'calc(100%)', h: 'calc(100%)', l: '0px', t: '0px' },
      },
    },
    {
      id: 'portrait',
      desktop: { column: '25 / 37', row: '3 / 15' },
      mobile: { column: '13 / 27', row: '13 / 27' },
      surface: 'transparent',
      kind: 'media',
      fit: 'contain',
      src: '/images/keydraw.webp',
      alt: 'Billet board, keydraw angle',
      inset: {
        desktop: { w: 'calc(100% - 9px)', h: 'calc(100%)', l: '0px', t: '0px' },
        mobile: { w: 'calc(100%)', h: 'calc(100%)', l: '0px', t: '0px' },
      },
    },
    {
      id: 'goal',
      desktop: { column: '20 / 36', row: '29 / 32' },
      mobile: { column: '2 / 27', row: '52 / 62' },
      surface: 'background',
      kind: 'copy',
      body: 'Our goal is to design keyboards you look forward to using every morning, and that sit in the room like a piece of furniture rather than a device.',
      inset: {
        desktop: { w: 'calc(100% - 2px)', h: 'calc(100% - 2px)', l: '1px', t: '1px' },
        mobile: { w: 'calc(100%)', h: 'calc(100%)', l: '0px', t: '0px' },
      },
    },
  ],
}

// Centred statement band: heading, then a paragraph / badge / button row.
export const heart = {
  heading: 'The Heart of Billet',
  body: 'Our community is made up of people who care about the work they do and the tools they use to do it.',
  cta: { label: 'Billet Community', href: '#community' },
  accent: 'var(--color-verdigris-600)',
}

// One marquee row of ten images, scrolling right to left. The reference only
// publishes a handful of community shots, so the real ones are cycled.
const communityShots = [
  'community-1.png',
  'community-3.png',
  'community-4.png',
  'community-6.png',
]
export const tape = {
  direction: 'right-to-left',
  images: Array.from({ length: 10 }, (_, i) => ({
    src: cdn(communityShots[i % communityShots.length], 900),
    alt: `Community desk ${i + 1}`,
  })),
}

export const SWATCH_HEX = {
  Graphite: '#33332e',
  Bone: '#e6e0d2',
  Oxide: '#b8482a',
  Verdigris: '#5c7f6f',
  Slate: '#5b6168',
  Chalk: '#efece4',
  Sand: '#cbb99a',
  Clay: '#9a6b52',
}

export const nav = [
  {
    label: 'Keyboards',
    href: '#keyboards',
    type: 'rich',
    children: boards.map((b) => ({ label: b.name, meta: b.layout, href: `#${b.id}` })),
    media: boards.map((b) => ({
      src: b.images[0].src,
      alt: `${b.name} ${b.layout}`,
    })),
  },
  {
    label: 'Keycaps',
    href: '#categories',
    type: 'rich',
    children: keycaps.map((k) => ({ label: k.name, meta: k.sub, href: '#categories' })),
    media: keycaps.map((k) => ({
      src: k.src.replace('width=600', 'width=1200'),
      alt: `${k.name} keycaps`,
    })),
  },
  {
    label: 'Components',
    href: '#categories',
    type: 'menu',
    groups: [
      {
        label: 'Switches',
        links: [
          { label: 'Slate Linear', href: '#categories' },
          { label: 'Hearth Tactile', href: '#categories' },
          { label: 'Hush Silent', href: '#categories' },
        ],
      },
      { label: 'Stabilizers', links: [{ label: 'Billet Stabilizers', href: '#categories' }] },
      {
        label: 'Extra Parts',
        links: [
          { label: 'Plates', href: '#categories' },
          { label: 'Cables', href: '#categories' },
          { label: 'Feet & weights', href: '#categories' },
          { label: 'Accents', href: '#categories' },
        ],
      },
    ],
  },
  {
    label: 'About',
    href: '#mission',
    type: 'menu',
    groups: [{ label: 'About', href: '#mission' }, { label: 'Notes', href: '#community' }],
  },
  {
    label: 'Help',
    href: '#build',
    type: 'menu',
    groups: [
      { label: 'Contact', links: [{ label: 'Billet at Work', href: '#build' }] },
      {
        label: 'Guides',
        links: [
          { label: 'Build guides', href: '#build' },
          { label: 'Shipping & returns', href: '#build' },
        ],
      },
      { label: 'Support', links: [{ label: 'Contact support', href: '#build' }] },
    ],
  },
]

export const specs = [
  { label: 'Mounting', value: 'Truss Mount, 8 points' },
  { label: 'Typing angle', value: '6.5° · front height 18.8mm' },
  { label: 'Footprint', value: '398 × 143mm' },
  { label: 'Weight', value: '5.3–5.6 lbs assembled' },
  { label: 'PCB', value: 'Hot-swap MX, QMK + VIA' },
  { label: 'Connection', value: 'Wired USB-C, pogo pins' },
]

export const footer = {
  shop: [
    { label: 'All products', href: '#categories' },
    { label: 'Keyboards', href: '#keyboards' },
    { label: 'Keycaps', href: '#categories' },
    { label: 'Components', href: '#categories' },
  ],
  community: [
    { label: 'Community', href: '#community' },
    { label: 'Discord', href: '#community' },
    { label: 'Instagram', href: '#community' },
    { label: 'YouTube', href: '#community' },
  ],
  about: [
    { label: 'Our story', href: '#mission' },
    { label: 'Notes', href: '#community' },
  ],
  help: [
    { label: 'Build guides', href: '#build' },
    { label: 'Contact support', href: '#build' },
    { label: 'Mode at work', href: '#build' },
    { label: 'Shipping & returns', href: '#build' },
    { label: 'Terms of service', href: '#build' },
    { label: 'Privacy', href: '#build' },
    { label: 'Keyboard compendium', href: '#build' },
  ],
}

export const typingTest = {
  prompt:
    'the billet is cut from a single block of aluminium and finished by hand until the light sits flat across the case and the sound lands where you expect it to land every time you press a key down',
  target: 115,
  recordName: 'Ilse',
}