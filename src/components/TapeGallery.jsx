import { useEffect, useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { A11y, Autoplay } from 'swiper/modules'
import 'swiper/css'
import Slot from './Slot.jsx'
import { tape } from '../data/site.js'

/**
 * The reference drifts this row at a fixed pixel rate rather than a fixed
 * duration: 80px/s on wide screens, faster as the viewport narrows, scaled by
 * viewport width. Swiper advances a whole slide at a time, so we convert that
 * rate into a per-slide duration to keep the motion visually identical.
 */
function driftSpeed() {
  const width = window.innerWidth
  const base = width < 768 ? 300 : width < 1024 ? 150 : 80
  return base * Math.max(0.5, width / 1920)
}

// Hoisted so Swiper never sees a new autoplay object and re-initialises.
const AUTOPLAY = { delay: 0, disableOnInteraction: false }

/**
 * Single marquee row. Scrolling is handed to Swiper so the strip can also be
 * dragged, and autoplay holds whenever the row is hovered or scrolled out of
 * view — matching the reference's hover and intersection pausing.
 */
export default function TapeGallery() {
  const shellRef = useRef(null)
  const swiperRef = useRef(null)
  const [held, setHeld] = useState(false)
  const [offscreen, setOffscreen] = useState(true)
  const [speed, setSpeed] = useState(8000)

  // Hold whenever the row is hovered or scrolled out of view, matching the
  // reference's hover and intersection pausing. One flag, so the two can
  // never fight over Swiper's autoplay state.
  const paused = held || offscreen

  // pause()/resume() are Swiper's temporary-hold API; stop()/start() would tear
  // the autoplay timer down and never bring it back.
  useEffect(() => {
    const autoplay = swiperRef.current?.autoplay
    if (!autoplay) return
    if (paused) autoplay.pause()
    else autoplay.resume()
  }, [paused])

  useEffect(() => {
    const shell = shellRef.current
    if (!shell) return undefined

    const measure = () => {
      const slide = shell.querySelector('.swiper-slide')
      const width = slide?.getBoundingClientRect().width
      if (!width) return
      setSpeed((current) => {
        const next = Math.round((width / driftSpeed()) * 1000)
        return current === next ? current : next
      })
    }

    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(shell)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const shell = shellRef.current
    if (!shell) return undefined

    const observer = new IntersectionObserver(
      ([entry]) => setOffscreen(!entry.isIntersecting),
      { threshold: 0.1, rootMargin: '50px 0px' },
    )
    observer.observe(shell)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="community" className="section-tape" aria-label="Community gallery">
      <div className="tape-shell" ref={shellRef}>
        <div
          className="tape-row"
          data-scroll-direction={tape.direction}
          onMouseEnter={() => setHeld(true)}
          onMouseLeave={() => setHeld(false)}
          onFocus={() => setHeld(true)}
          onBlur={() => setHeld(false)}
        >
          <Swiper
            modules={[A11y, Autoplay]}
            onSwiper={(instance) => {
              swiperRef.current = instance
            }}
            slidesPerView="auto"
            spaceBetween={16}
            loop
            speed={speed}
            grabCursor
            allowTouchMove
            watchOverflow
            autoplay={AUTOPLAY}
            className="tape-swiper"
          >
            {tape.images.map((image) => (
              <SwiperSlide key={image.src} className="tape-slide">
                <Slot src={image.src} alt={image.alt} ratio="4 / 3" />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  )
}
