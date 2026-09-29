import { useEffect, useRef, useState } from 'react'
import { brand, nav } from '../data/site'
import Slot from './Slot'

const PATHS = {
  search:
    'M22 20.2461V19.2461H21V18.2461H20V17.2461H19V16.2461H18V13.2461H19V7.24609H18V5.24609H17V4.24609H16V3.24609H15V2.24609H13V1.24609H7V2.24609H5V3.24609H4V4.24609H3V5.24609H2V7.24609H1V13.2461H2V15.2461H3V16.2461H4V17.2461H5V18.2461H7V19.2461H13V18.2461H16V19.2461H17V20.2461H18V21.2461H19V22.2461H20V23.2461H21V22.2461H22V21.2461H23V20.2461H22ZM12 17.2461H8V16.2461H6V15.2461H5V14.2461H4V12.2461H3V8.24609H4V6.24609H5V5.24609H6V4.24609H8V3.24609H12V4.24609H14V5.24609H15V6.24609H16V8.24609H17V12.2461H16V14.2461H15V15.2461H14V16.2461H12V17.2461Z',
  cart: 'M22 7.24609V6.24609H18V4.24609H17V2.24609H16V1.24609H14V0.246094H10V1.24609H8V2.24609H7V4.24609H6V6.24609H2V7.24609H1V22.2461H2V23.2461H3V24.2461H21V23.2461H22V22.2461H23V7.24609H22ZM21 10.2461V21.2461H20V22.2461H4V21.2461H3V9.24609H4V8.24609H6V10.2461H8V8.24609H16V10.2461H18V8.24609H20V9.24609H21V10.2461ZM9 4.24609V3.24609H10V2.24609H14V3.24609H15V4.24609H16V6.24609H8V4.24609H9Z',
  account:
    'M22 16.2461V14.2461H21V13.2461H20V12.2461H19V11.2461H16V10.2461H17V8.24609H18V3.24609H17V2.24609H16V1.24609H15V0.246094H9V1.24609H8V2.24609H7V3.24609H6V8.24609H7V10.2461H8V11.2461H5V12.2461H4V13.2461H3V14.2461H2V16.2461H1V23.2461H2V24.2461H22V23.2461H23V16.2461H22ZM8 7.24609V4.24609H9V3.24609H10V2.24609H14V3.24609H15V4.24609H16V8.24609H15V9.24609H14V10.2461H10V9.24609H9V8.24609H8V7.24609ZM8 12.2461H17V13.2461H18V14.2461H19V15.2461H20V17.2461H21V21.2461H20V22.2461H4V21.2461H3V17.2461H4V15.2461H5V14.2461H6V13.2461H7V12.2461H8Z',
  menu: 'M23 3.24609V2.24609H22H21H20H19H18H17H16H15H14H13H12H11H10H9H8H7H6H5H4H3H2H1V3.24609H0V4.24609V5.24609H1V6.24609H2H3H4H5H6H7H8H9H10H11H12H13H14H15H16H17H18H19H20H21H22H23V5.24609H24V4.24609V3.24609H23ZM23 10.2461H22H21H20H19H18H17H16H15H14H13H12H11H10H9H8H7H6H5H4H3H2H1V11.2461H0V12.2461V13.2461H1V14.2461H2H3H4H5H6H7H8H9H10H11H12H13H14H15H16H17H18H19H20H21H22H23V13.2461H24V12.2461V11.2461H23V10.2461ZM22 18.2461H23V19.2461H24V20.2461V21.2461H23V22.2461H22H21H20H19H18H17H16H15H14H13H12H11H10H9H8H7H6H5H4H3H2H1V21.2461H0V20.2461V19.2461H1V18.2461H2H3H4H5H6H7H8H9H10H11H12H13H14H15H16H17H18H19H20H21H22Z',
  close: 'M20 3.24609H19V4.24609H18V5.24609H17V6.24609H16V7.24609H15V8.24609H14V9.24609H13V10.2461H12H11V9.24609H10V8.24609H9V7.24609H8V6.24609H7V5.24609H6V4.24609H5V3.24609H4H3V4.24609V5.24609H4V6.24609H5V7.24609H6V8.24609H7V9.24609H8V10.2461H9V11.2461H10V12.2461V13.2461H9V14.2461H8V15.2461H7V16.2461H6V17.2461H5V18.2461H4V19.2461H3V20.2461V21.2461H4H5V20.2461H6V19.2461H7V18.2461H8V17.2461H9V16.2461H10V15.2461H11V14.2461H12H13V15.2461H14V16.2461H15V17.2461H16V18.2461H17V19.2461H18V20.2461H19V21.2461H20H21V20.2461V19.2461H20V18.2461H19V17.2461H18V16.2461H17V15.2461H16V14.2461H15V13.2461H14V12.2461V11.2461H15V10.2461H16V9.24609H17V8.24609H18V7.24609H19V6.24609H20V5.24609H21V4.24609V3.24609H20Z',
}

const Icon = ({ name }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d={PATHS[name]} />
  </svg>
)

function Drawer({ onClose }) {
  const [openGroup, setOpenGroup] = useState(null)

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <div className="drawer" role="dialog" aria-modal="true" aria-label="Menu">
      <div className="drawer__head">
        <div className="container drawer__head-inner">
          <span className="wordmark">
            {brand.name} <span>{brand.suffix}</span>
          </span>
          <button type="button" className="utilities__btn" onClick={onClose} aria-label="Close menu">
            <Icon name="close" />
          </button>
        </div>
      </div>

      <div className="container">
        <nav className="drawer__nav" aria-label="Mobile">
          {nav.map((group, gi) => {
            const opened = openGroup === gi
            return (
              <div className="drawer__group" key={group.label} data-open={opened}>
                <button
                  type="button"
                  className="drawer__toggle"
                  onClick={() => setOpenGroup(opened ? null : gi)}
                  aria-expanded={opened}
                >
                  <span className="drawer__toggle-label">{group.label}</span>
                  <span className="drawer__plus" aria-hidden="true">
                    +
                  </span>
                </button>

                {opened && (
                  <div className="drawer__panel">
                    {group.groups ? (
                      <div className="drawer__cols">
                        {group.groups.map((g) => (
                          <div className="drawer__col" key={g.label}>
                            <a
                              className="drawer__col-label"
                              href={g.href ?? group.href}
                              onClick={onClose}
                            >
                              {g.label}
                            </a>
                            {g.links && g.links.length > 0 && (
                              <ul>
                                {g.links.map((l) => (
                                  <li key={l.label}>
                                    <a href={l.href} onClick={onClose}>
                                      {l.label}
                                    </a>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="drawer__cols">
                        <div className="drawer__col">
                          {group.children.map((c) => (
                            <a
                              key={c.label}
                              className="drawer__col-link"
                              href={c.href}
                              onClick={onClose}
                            >
                              {c.label}
                              {c.meta && (
                                <span className="t-accent text-muted"> / {c.meta}</span>
                              )}
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )
          })}
        </nav>
      </div>
    </div>
  )
}

export default function Header() {
  const [open, setOpen] = useState(null)
  const [hovered, setHovered] = useState(null)
  const [drawer, setDrawer] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const closeTimer = useRef(null)

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setOpen(null)
    const onScroll = () => setScrolled(window.scrollY > 80)
    document.addEventListener('keydown', onKey)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => {
      document.removeEventListener('keydown', onKey)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  const scheduleClose = () => {
    clearTimeout(closeTimer.current)
    closeTimer.current = setTimeout(() => setOpen(null), 120)
  }

  const cancelClose = () => clearTimeout(closeTimer.current)

  const active = open !== null ? nav[open] : null
  const hasPanel = Boolean(active && (active.children || active.groups))
  const preview = active?.media?.[hovered ?? 0] ?? active?.media?.[0]

  return (
    <>
      <header
        className="header"
        onMouseLeave={scheduleClose}
        onBlur={(e) => !e.currentTarget.contains(e.relatedTarget) && setOpen(null)}
      >
        <div className="container header__bar">
          {/* logo */}
          <div className="header__logo" onMouseEnter={() => setOpen(null)}>
            <a href="#top" aria-label={`${brand.full} — home`}>
              <span className="wordmark">
                {brand.name} <span>{brand.suffix}</span>
              </span>
            </a>
          </div>

          {/* primary nav */}
          <nav className="nav" aria-label="Primary">
            <ul className="nav__list" role="menubar">
              {nav.map((group, i) => (
                <li
                  key={group.label}
                  role="none"
                  className="nav__item"
                  data-open={open === i}
                  onMouseEnter={() => {
                    cancelClose()
                    setOpen(i)
                  }}
                  onFocus={() => {
                    cancelClose()
                    setOpen(i)
                  }}
                >
                  <a
                    role="menuitem"
                    className="nav__link"
                    href={group.href}
                    aria-expanded={open === i}
                    onClick={() => setOpen(i)}
                  >
                    {group.label}
                    {hasPanel && (
                      <span className="nav__plus" aria-hidden="true">
                        +
                      </span>
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* actions */}
          <div className="header__actions">
            <div className="utilities">
              <button
                type="button"
                className="utilities__btn utilities__btn--desktop"
                aria-label="Search"
                onMouseEnter={() => setOpen(null)}
              >
                <Icon name="search" />
              </button>

              <button
                type="button"
                className="utilities__btn utilities__btn--desktop"
                aria-label="Cart"
                onMouseEnter={() => setOpen(null)}
              >
                <span style={{ position: 'relative', display: 'flex' }}>
                  <Icon name="cart" />
                  <span className="cart-count" hidden>
                    0
                  </span>
                </span>
              </button>

              <a
                className="utilities__btn utilities__btn--desktop"
                aria-label="Account"
                href="#footer"
                onMouseEnter={() => setOpen(null)}
              >
                <Icon name="account" />
              </a>

              <button
                type="button"
                className="utilities__btn utilities__btn--mobile"
                aria-label="Menu"
                onClick={() => setDrawer(true)}
              >
                <Icon name="menu" />
              </button>
            </div>

            <div className="build-cta" data-collapsed={scrolled}>
              <a href="#keyboards">Build Yours</a>
            </div>
          </div>
        </div>

        {/* unified submenu */}
        <div className="submenu" data-open={hasPanel}>
          {active && (
            <div className="container submenu__inner">
              {active.type === 'menu' ? (
                <div className="submenu__cols" role="menu" aria-label={active.label}>
                  {active.groups.map((g) => (
                    <div className="submenu__col" key={g.label} role="none">
                      <a role="menuitem" className="submenu__h4" href={g.href ?? active.href}>
                        {g.label}
                      </a>
                      {g.links && g.links.length > 0 && (
                        <ul className="submenu__col-list" role="menuitem">
                          {g.links.map((l) => (
                            <li key={l.label}>
                              <a className="submenu__p" href={l.href}>
                                {l.label}
                              </a>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <>
                  {active.children && (
                    <div className="submenu__links" role="menu" aria-label={active.label}>
                      {active.children.map((child, i) => (
                        <a
                          key={child.label}
                          className="submenu__link t-h3"
                          href={child.href}
                          data-active={hovered === null || hovered === i}
                          onMouseEnter={() => setHovered(i)}
                          onFocus={() => setHovered(i)}
                        >
                          <span className="submenu__label">
                            {child.label}
                            {child.meta && (
                              <span className="submenu__meta t-accent"> / {child.meta}</span>
                            )}
                          </span>
                        </a>
                      ))}
                    </div>
                  )}

                  {active.media && (
                    <div className="submenu__media">
                      <div>
                        <Slot src={preview.src} alt={preview.alt} ratio="auto" />
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      </header>

      {drawer && <Drawer onClose={() => setDrawer(false)} />}
    </>
  )
}