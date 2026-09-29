import { useEffect, useState } from 'react'

export default function NewsletterPopup({ onClose }) {
  const [email, setEmail] = useState('')
  const [done, setDone] = useState(false)

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  const submit = (e) => {
    e.preventDefault()
    if (!email.trim()) return
    setDone(true)
    setEmail('')
  }

  return (
    <div className="modal" role="dialog" aria-modal="true" aria-labelledby="nl-title">
      <div className="modal__backdrop" onClick={onClose} />

      <div className="modal__panel">
        <div className="tt__head">
          <div>
            <span className="t-tiny t-muted">Field notes</span>
            <h2 className="t-h3" id="nl-title" style={{ marginTop: '0.5rem' }}>
              {done ? "You're on the list." : 'New runs, before anyone else.'}
            </h2>
          </div>
          <button type="button" className="tt__close" onClick={onClose}>
            Close
          </button>
        </div>

        {done ? (
          <div className="tt__intro">
            <p className="lede">
              The next drop note goes out the moment the run is confirmed. No more than
              six emails a year, and unsubscribing takes one click.
            </p>
            <button type="button" className="btn btn-outline btn-md" onClick={onClose}>
              Back to the site
            </button>
          </div>
        ) : (
          <form onSubmit={submit}>
            <label className="visually-hidden" htmlFor="nl-email">
              Email address
            </label>
            <div className="newsletter-field">
              <input
                id="nl-email"
                type="email"
                required
                placeholder="Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button type="submit" className="newsletter-field__btn">
                Sign up
              </button>
            </div>
            <p className="t-tiny t-muted" style={{ marginTop: '0.75rem' }}>
              No more than six emails a year. Unsubscribe in one click.
            </p>
          </form>
        )}
      </div>
    </div>
  )
}