import { useCallback, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { A11y, Autoplay, EffectFade, Keyboard, Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/effect-fade'
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
 * One product card gallery. Stacks every angle in one frame and crossfades
 * between them, so no two images are ever visible at once. Hover or focus
 * holds the cycle; the arrows are pointer-only, matching the reference.
 */
export default function CardGallery({ board }) {
  const [nav, setNav] = useState({ prevEl: null, nextEl: null })
  const [ref, setRef] = useState(null)

  const setPrev = useCallback(
    (el) => setNav((n) => (n.prevEl === el ? n : { ...n, prevEl: el })),
    [],
  )
  const setNext = useCallback(
    (el) => setNav((n) => (n.nextEl === el ? n : { ...n, nextEl: el })),
    [],
  )

  const hold = useCallback(() => ref?.autoplay?.stop(), [ref])
  const release = useCallback(() => ref?.autoplay?.start(), [ref])

  return (
    <div className="card-gallery" onMouseEnter={hold} onMouseLeave={release} onFocus={hold} onBlur={release}>
      <Swiper
        modules={[A11y, Autoplay, EffectFade, Keyboard, Navigation]}
        onSwiper={setRef}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        speed={520}
        loop
        watchOverflow
        grabCursor={false}
        keyboard={{ enabled: true }}
        navigation={nav}
        autoplay={{ delay: 4500, disableOnInteraction: false }}
        className="card-gallery-swiper"
      >
        {board.images.map((image) => (
          <SwiperSlide key={image.src}>
            <Slot
              src={image.src}
              alt={`${board.name} ${board.layout}, ${image.angle.toLowerCase()} view`}
              ratio="5 / 4"
              fill
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="card-gallery-nav">
        <button type="button" ref={setPrev} className="card-gallery-paddle" aria-label={`Previous ${board.name} view`}>
          <Chevron dir="prev" />
        </button>
        <button type="button" ref={setNext} className="card-gallery-paddle" aria-label={`Next ${board.name} view`}>
          <Chevron dir="next" />
        </button>
      </div>
    </div>
  )
}
