import { useEffect } from 'react'

/**
 * Fades in any `[data-reveal]` nodes inside a container as they scroll into
 * view, then stops observing them so the transition only ever runs once.
 * Falls back to showing everything when IntersectionObserver is unavailable.
 */
export default function useReveal(rootRef, selector = '[data-reveal]', threshold = 0.15) {
  useEffect(() => {
    const root = rootRef.current
    if (!root) return undefined

    const nodes = root.querySelectorAll(selector)
    if (!nodes.length) return undefined

    if (typeof IntersectionObserver === 'undefined') {
      nodes.forEach((node) => node.classList.add('is-revealed'))
      return undefined
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          entry.target.classList.add('is-revealed')
          observer.unobserve(entry.target)
        })
      },
      { threshold, rootMargin: '0px 0px -10% 0px' },
    )

    nodes.forEach((node) => observer.observe(node))
    return () => observer.disconnect()
  }, [rootRef, selector, threshold])
}
