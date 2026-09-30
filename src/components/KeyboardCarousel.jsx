import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { A11y, Autoplay, Keyboard } from 'swiper/modules'
import 'swiper/css'
import Slot from './Slot.jsx'
import { carousel, specs } from '../data/site.js'

/**
 * Types text out one character at a time, erasing the previous string first.
 * Per-character delay is randomised inside the reference's 85-150ms window so
 * the rhythm never sounds mechanical.
 */
function useTypewriter(text, { min = 85, max = 150 } = {}) {
  const [value, setValue] = useState('')
  const valueRef = useRef('')
  const targetRef = useRef(text)
  const phaseRef = useRef('erase')

  const write = useCallback((next) => {
    valueRef.current = next
    setValue(next)
  }, [])

  useEffect(() => {
    targetRef.current = text
    phaseRef.current = 'erase'
  }, [text])

  useEffect(() => {
    let timer
    const tick = () => {
      const target = targetRef.current
      const current = valueRef.current

      if (phaseRef.current === 'erase') {
        if (current.length === 0) {
          phaseRef.current = 'type'
          timer = setTimeout(tick, 200)
          return
        }
        write(current.slice(0, -1))
        timer = setTimeout(tick, 42)
        return
      }

      if (current.length === target.length) {
        timer = setTimeout(tick, 2400)
        return
      }

      write(target.slice(0, current.length + 1))
      timer = setTimeout(tick, min + Math.random() * (max - min))
    }

    timer = setTimeout(tick, 240)
    return () => clearTimeout(timer)
  }, [min, max, write])

  return value
}

/**
 * Square centre stage.
 *
 * The reference stacks four absolutely-positioned images inside one square and
 * walks them through left / center / right / out states. Side images carry
 * `translate(-/+100%, 20%) scale(0.4)`, so each neighbour's centre sits exactly
 * one frame-width out from the frame's centre and the whole spread is 2.4
 * frame-widths wide.
 *
 * Swiper reproduces that geometry by making the track three frame-widths wide
 * with `slidesPerView: 3` + `centeredSlides`, which puts the neighbour centres
 * at exactly +/-W. The frame itself is therefore the middle third of the track,
 * and the track is a fixed width (not max-width) so narrow viewports clip the
 * neighbours at the section edge instead of shrinking them.
 */
export default function KeyboardCarousel() {
  const [active, setActive] = useState(0)
  const [ref, setRef] = useState(null)
  const [minHeight, setMinHeight] = useState(0)
  const measurer = useRef(null)
  const { slides, label, cta } = carousel
  // realIndex can briefly read one past the array during loop rewind; fall
  // back instead of letting the typewriter dereference an undefined slide.
  const slide = slides[active] ?? slides[0]

  const typed = useTypewriter(slide.bgText)

  // The reference measures every slide's copy and pins the block to the
  // tallest, so swapping slides never shifts the layout underneath. The
  // measurer stacks the slides, so take the max rather than the total.
  useLayoutEffect(() => {
    const host = measurer.current
    if (!host) return
    const blocks = [...host.querySelectorAll('.stage-content')]
    if (!blocks.length) return
    setMinHeight(Math.max(...blocks.map((block) => block.scrollHeight)))
  }, [slides])

  const hold = useCallback(() => ref?.autoplay?.stop(), [ref])
  const release = useCallback(() => ref?.autoplay?.start(), [ref])

  return (
    <section id="keyboards-stage" className="section section-stage">
      <div className="grid-overlay" aria-hidden="true" />

      <div className="container">
        <div className="stage-pill">
          <p className="t-small-accent t-muted">{label}</p>
        </div>

        {/* zero-height anchor: the giant word hangs from the top of this box */}
        <div className="stage-bg-anchor">
          <p className="stage-bg" aria-hidden="true">
            <span>{typed}</span>
            <span className="stage-cursor" />
          </p>
        </div>

        <div className="stage-frame">
          <div className="stage-swiper" onMouseEnter={hold} onMouseLeave={release}>
            <Swiper
              modules={[A11y, Autoplay, Keyboard]}
              onSwiper={setRef}
              onSlideChange={(swiper) => setActive(swiper.realIndex)}
              slidesPerView={1}
              spaceBetween={0}
              centeredSlides
              loop
              speed={1100}
              grabCursor
              keyboard={{ enabled: true }}
              autoplay={{ delay: 4500, disableOnInteraction: false }}
              breakpoints={{ 768: { slidesPerView: 3 } }}
              className="stage-track"
            >
              {slides.map((item, index) => (
                <SwiperSlide key={item.id}>
                  <button
                    type="button"
                    className="stage-slide"
                    aria-label={`Show ${item.title}`}
                    onMouseEnter={() => index !== active && hold()}
                    onMouseLeave={() => index !== active && release()}
                    onClick={() => ref?.slideToLoop(index)}
                  >
                    <Slot src={item.src} alt="" ratio="1 / 1" fit="contain" fill />
                  </button>
                </SwiperSlide>
              ))}

              {/* Loop needs strictly more slides than slidesPerView + 1 or the
                  ring collapses and the right-hand neighbour lands off-track.
                  These copies are hidden from assistive tech; the slide change
                  is announced by the live region below instead. */}
              {slides.map((item) => (
                <SwiperSlide key={`loop-${item.id}`} aria-hidden="true">
                  <button type="button" className="stage-slide" tabIndex={-1}>
                    <Slot src={item.src} alt="" ratio="1 / 1" fit="contain" fill />
                  </button>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>

        <div
          className="stage-content"
          style={{ minHeight: minHeight || undefined }}
          role="region"
          aria-live="polite"
          aria-label="Carousel content"
        >
          <div className="stage-copy">
            <h3 className="stage-title">{slide.title}</h3>
            <p className="t-small-accent t-muted stage-subtitle">{slide.subtitle}</p>
          </div>

          <div className="stage-action">
            <p className="t-small-accent t-muted">{slide.buttonCaption}</p>
            <a className="btn btn-pill" href={cta.href}>
              {cta.label}
            </a>
          </div>
        </div>

        {/* off-screen copy of every slide, used only to measure the tallest */}
        <div ref={measurer} className="stage-measure" aria-hidden="true">
          {slides.map((item) => (
            <div className="stage-content" key={`measure-${item.id}`}>
              <div className="stage-copy">
                <h3 className="stage-title">{item.title}</h3>
                <p className="t-small-accent t-muted stage-subtitle">{item.subtitle}</p>
              </div>
              <div className="stage-action">
                <p className="t-small-accent t-muted">{item.buttonCaption}</p>
              </div>
            </div>
          ))}
        </div>

        <dl className="stage-specs">
          {specs.map((spec) => (
            <div key={spec.label} className="stage-spec">
              <dt className="t-tiny t-muted">{spec.label}</dt>
              <dd className="t-small">{spec.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
