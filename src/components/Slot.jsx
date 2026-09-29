import { useState } from 'react'

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
 */
export default function Slot({ src, alt = '', ratio = '4 / 3', fit, fill = false, className = '' }) {
  const [failed, setFailed] = useState(false)
  const label = src.replace(/^\/images\//, '').replace(/\.[a-z0-9]+$/i, '')

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
          onError={() => setFailed(true)}
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
