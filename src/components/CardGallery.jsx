import { useRef, useState } from 'react'
import Slot from './Slot.jsx'

function Chevron({ dir }) {
  return (
    <svg
      viewBox="0 0 16 16"
      aria-hidden="true"
      className="card-gallery-chevron"
      style={dir === 'prev' ? { transform: 'rotate(180deg)' } : undefined}
    >
      <path d="M6 2.5 10.5 8 6 13.5" fill="none" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  )
}

/**
 * One product card gallery. Every angle sits in the same frame and the active
 * one crossfades in on demand — it never advances or rewinds on its own, so
 * the image can't disappear into a blank loop state. Arrows are pointer-only,
 * matching the reference; a thin pointer-swipe layer adds drag support.
 */
export default function CardGallery({ board }) {
  const [index, setIndex] = useState(0)
  const swipe = useRef({ x: 0, y: 0, active: false })
  const count = board.images.length

  const move = (delta) => setIndex((i) => (i + delta + count) % count)

  const onPointerDown = (e) => {
    swipe.current = { x: e.clientX, y: e.clientY, active: true }
  }

  const onPointerUp = (e) => {
    const s = swipe.current
    if (!s.active) return
    s.active = false
    const dx = s.x - e.clientX
    const dy = s.y - e.clientY
    if (Math.abs(dx) < 40 || Math.abs(dx) < Math.abs(dy)) return
    move(dx > 0 ? 1 : -1)
  }

  return (
    <div className="card-gallery">
      <div
        className="card-gallery-swiper"
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
      >
        {board.images.map((image, i) => (
          <div key={image.src} className={`card-gallery-slide${i === index ? ' is-active' : ''}`}>
            <Slot
              src={image.src}
              alt={`${board.name} ${board.layout}, ${image.angle.toLowerCase()} view`}
              ratio="5 / 4"
              fill
            />
          </div>
        ))}
      </div>

      <div className="card-gallery-nav">
        <button type="button" className="card-gallery-paddle" onClick={() => move(-1)} aria-label={`Previous ${board.name} view`}>
          <Chevron dir="prev" />
        </button>
        <button type="button" className="card-gallery-paddle" onClick={() => move(1)} aria-label={`Next ${board.name} view`}>
          <Chevron dir="next" />
        </button>
      </div>
    </div>
  )
}