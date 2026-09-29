import { useState } from 'react'
import { brand, footer } from '../data/site'
import Slot from './Slot'
import TypingTest from './TypingTest'

function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [done, setDone] = useState(false)

  const submit = (e) => {
    e.preventDefault()
    if (!email.trim()) return
    setDone(true)
  }

  if (done) {
    return <p className="footer__newsletter-done">You're on the list.</p>
  }

  return (
    <form className="newsletter-field" onSubmit={submit}>
      <input
        type="email"
        required
        placeholder="Your Email"
        aria-label="Your Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button type="submit" className="newsletter-field__btn">
        Sign Up
      </button>
    </form>
  )
}

export default function Footer() {
  return (
    <footer className="footer surface-dark footer--rounded" id="footer">
      <div className="container footer__upper">
        <div className="footer__top">
          <div className="footer__brand">
            <div className="footer__wordmark">
              <span className="footer__wordmark-name">{brand.name}</span>
              <span className="footer__wordmark-suffix">{brand.suffix}</span>
            </div>
            <p className="footer__blurb">Sign up for the {brand.name} newsletter.</p>
            <div className="footer__newsletter">
              <NewsletterForm />
            </div>
            <div className="footer__copy">
              © {brand.year} {brand.full}. All rights reserved.
            </div>
          </div>

          <div className="footer__links">
            <div className="footer__col">
              <h5>Shop</h5>
              <ul>
                {footer.shop.map((l) => (
                  <li key={l.label}>
                    <a href={l.href}>{l.label}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="footer__col">
              <h5>Community</h5>
              <ul>
                {footer.community.map((l) => (
                  <li key={l.label}>
                    <a href={l.href}>{l.label}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="footer__col">
              <h5>About</h5>
              <ul>
                {footer.about.map((l) => (
                  <li key={l.label}>
                    <a href={l.href}>{l.label}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="footer__col">
              <h5>Get Help</h5>
              <ul>
                {footer.help.map((l) => (
                  <li key={l.label}>
                    <a href={l.href}>{l.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="container footer__test">
        <TypingTest />
      </div>

      <div className="container footer__dither">
        <div className="footer__dither-img">
          <Slot
            src="//modedesigns.com/cdn/shop/files/footer-dithered-keyboard.png?width=2400"
            alt="Halftone render of a Billet board"
            ratio="9.64 / 1"
          />
        </div>
      </div>
    </footer>
  )
}