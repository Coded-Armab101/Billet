import Slot from './Slot.jsx'

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

/**
 * Full-bleed media band: a 16:9 image with a tinted overlay, and copy laid
 * over it. Matches the reference's shared custom-section pattern, so Team and
 * Start Building differ only by overlay strength, alignment and corner radius.
 */
export default function MediaSection({
  id,
  heading,
  body,
  cta,
  src,
  overlay = 50,
  align = 'center',
  radius = 'lg',
  eyebrow,
}) {
  return (
    <section id={id} className={`section-media section-media-${align}`}>
      <div className={`media-band media-radius-${radius}`}>
        <div className="media-frame">
          <Slot src={src} alt={heading} ratio="16 / 9" fill />
        </div>
        <div className="media-overlay" style={{ opacity: overlay / 100 }} aria-hidden="true" />

        <div className="media-copy">
          <div className="media-copy-inner">
            {eyebrow && <p className="t-small-accent media-eyebrow">{eyebrow}</p>}
            <h2 className="t-h1 media-heading">{heading}</h2>
            <p className="media-body">{body}</p>
            {cta && (
              <a className="btn btn-primary btn-md btn-icon-end" href={cta.href}>
                {cta.label}
                <ArrowIcon />
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
