import { useRef } from 'react'
import { editorial } from '../data/site.js'
import Slot from './Slot.jsx'
import useReveal from '../hooks/useReveal.js'

/**
 * One positioned block. Media fills its cell edge to edge; text blocks get the
 * reference padding and let the heading scale off the span the block occupies.
 */
function Block({ block }) {
  const isMedia = block.kind === 'media'
  const inset = block.inset || {}

  return (
    <div
      className={[
        'grid-item',
        isMedia ? '' : 'grid-text-auto-scale',
        block.surface === 'background' ? 'bg-background' : 'bg-transparent',
      ]
        .filter(Boolean)
        .join(' ')}
      style={{
        '--desktop-grid-column': block.desktop.column,
        '--desktop-grid-row': block.desktop.row,
        '--mobile-grid-column': block.mobile.column,
        '--mobile-grid-row': block.mobile.row,
        '--grid-fit-top': inset.mobile?.t || '0px',
        '--grid-fit-left': inset.mobile?.l || '0px',
        '--grid-fit-width': inset.mobile?.w || 'auto',
        '--grid-fit-height': inset.mobile?.h || 'auto',
        '--grid-transform': block.transform?.mobile || 'none',
        ...(block.transform?.desktop ? { '--grid-transform-desktop': block.transform.desktop } : { '--grid-transform-desktop': 'none' }),
        ...(inset.desktop ? { '--grid-fit-top-desktop': inset.desktop.t } : { '--grid-fit-top-desktop': '0px' }),
        ...(inset.desktop ? { '--grid-fit-left-desktop': inset.desktop.l } : { '--grid-fit-left-desktop': '0px' }),
        ...(inset.desktop ? { '--grid-fit-width-desktop': inset.desktop.w } : { '--grid-fit-width-desktop': 'auto' }),
        ...(inset.desktop ? { '--grid-fit-height-desktop': inset.desktop.h } : { '--grid-fit-height-desktop': 'auto' }),
      }}
      data-reveal
    >
      <div className="grid-item-content">
        <div className="child-block-wrapper">
          {isMedia ? (
            <Slot src={block.src} alt={block.alt} fit={block.fit} fill />
          ) : (
            <div className="group-block">
              {block.pill && <span className="btn btn-pill">{block.pill}</span>}
              {block.heading && <h2>{block.heading}</h2>}
              {block.body && <p>{block.body}</p>}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

/**
 * Hairline tile guides behind the blocks. The reference ships these as two
 * inline SVGs — one per breakpoint — so they are generated from the same
 * column/row counts the grid itself uses.
 */
function GridOverlay({ columns, rows, variant }) {
  const vertical = Array.from({ length: columns + 1 }, (_, i) => i)
  const horizontal = Array.from({ length: rows + 1 }, (_, i) => i)

  return (
    <svg
      className={`editorial-grid-overlay editorial-grid-overlay--${variant}`}
      viewBox={`0 0 ${columns} ${rows}`}
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {vertical.map((i) => (
        <line key={`v${i}`} x1={i} y1={0} x2={i} y2={rows} />
      ))}
      {horizontal.map((i) => (
        <line key={`h${i}`} x1={0} y1={i} x2={columns} y2={i} />
      ))}
    </svg>
  )
}

/**
 * Editorial grid. Blocks sit on a 36 × 36 tile grid on desktop and 27 × 63 on
 * mobile, with the container locked to the matching aspect ratio so tiles stay
 * square and no two blocks collide at the breakpoint.
 */
export default function Editorial() {
  const root = useRef(null)
  useReveal(root)

  return (
    <section id="mission" className="section section-editorial" ref={root}>
      <div className="editorial-grid-shell">
        <div
          className="editorial-grid-container"
          style={{
            '--desktop-grid-columns': `repeat(${editorial.desktop.columns}, 1fr)`,
            '--desktop-grid-rows': `repeat(${editorial.desktop.rows}, 1fr)`,
            '--desktop-aspect-ratio': String(editorial.desktop.aspect),
            '--mobile-grid-columns': `repeat(${editorial.mobile.columns}, 1fr)`,
            '--mobile-grid-rows': `repeat(${editorial.mobile.rows}, 1fr)`,
            '--mobile-aspect-ratio': String(editorial.mobile.aspect),
          }}
          role="group"
          aria-label="Our mission"
        >
          <GridOverlay
            columns={editorial.desktop.columns}
            rows={editorial.desktop.rows}
            variant="desktop"
          />
          <GridOverlay
            columns={editorial.mobile.columns}
            rows={editorial.mobile.rows}
            variant="mobile"
          />

          {editorial.blocks.map((block) => (
            <Block key={block.id} block={block} />
          ))}
        </div>
      </div>
    </section>
  )
}
