import { boards, brand } from '../data/site'
import Slot from './Slot'

const ArrowIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="arrow" aria-hidden="true">
    <path
      d="M4 12h15M13 6l6 6-6 6"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export default function Hero() {
  const lead = boards[0]

  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero__media">
        <Slot
          src="//modedesigns.com/cdn/shop/files/prologue-lifestyle-desk-1.webp?width=2400"
          alt={`${lead.name} ${lead.layout} on a desk`}
          ratio="auto"
        />
        <div className="hero__scrim" />
      </div>

      <div className="hero__content">
        <div className="container-narrow" style={{ paddingInline: 'var(--pad-inline)' }}>
          <div className="hero__inner">
            <div className="hero__row">
              <p className="hero__eyebrow t-small-accent t-wide">Announcing</p>

              <h1 className="hero__title" id="hero-title">
                {lead.name}
              </h1>

              <p className="hero__sub t-small-accent t-wide">{lead.layout} Layout</p>
            </div>

            <div className="hero__actions">
              <a className="btn btn-primary btn-md btn-icon-end" href="#build">
                Build Yours
                <ArrowIcon />
              </a>
              <a
                className="btn btn-outline-light btn-md"
                href={`#${lead.id}`}
                aria-label={`Explore ${lead.name}`}
              >
                Explore {lead.name}
              </a>
            </div>
          </div>
        </div>
      </div>

      <p className="visually-hidden">
        {brand.name} {brand.suffix} — {brand.tagline}
      </p>
    </section>
  )
}
