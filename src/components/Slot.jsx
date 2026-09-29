import { useRef, useState } from 'react'

const SIZES = {
  '21 / 9': '2400 × 1030',
  '16 / 10': '2000 × 1250',
  '16 / 9': '2560 × 1440',
  '16 / 11': '2000 × 1375',
  '30 / 22': '1200 × 880',
  '4 / 3': '1800 × 1350',
  '3 / 2': '2000 × 1333',
  '3 / 4': '1200 × 1600',
  '1 / 1': '1400 × 1400',
  '4 / 5': '1400 × 1750',
  '5 / 4': '1600 × 1280',
  '1 / 2': '1200 × 2400',
  '9.64 / 1': '3472 × 360',
}

/**
 * Image slot. Renders the real asset when it exists in /public,
 * otherwise a labelled art-direction placeholder naming the exact
 * file to drop in. Drop the file in and it swaps automatically.
 * A transient load failure retries once before falling back, so
 * a network blip doesn't blank the image out.
 */
export default function Slot({ src, alt = '', ratio = '4 / 3', fit, fill = false, className = '' }) {
  const [failed, setFailed] = useState(false)
  const retried = useRef(false)
  const label = src.replace(/^\/images\//, '').replace(/\.[a-z0-9]+$/i, '')

  const onError = (e) => {
    if (retried.current) {
      setFailed(true)
      return
    }
    retried.current = true
    const img = e.currentTarget
    window.setTimeout(() => {
      img.src = src
    }, 900)
  }

  return (
    <div
      className={`slot${fill ? ' slot--fill' : ''}${className ? ` ${className}` : ''}`}
      style={{ '--ratio': ratio, ...(fit ? { '--fit': fit } : null) }}
    >
      {!failed && (
        <img
          className="slot__img"
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          onError={onError}
        />
      )}

      {failed && (
        <div className="slot__ph">
          <span className="slot__ph-mark">{alt || 'Image'}</span>
          <span className="slot__ph-label">{label}</span>
          <span className="slot__ph-size">{SIZES[ratio] || '—'}</span>
        </div>
      )}
    </div>
  )
}
