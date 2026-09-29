import MediaSection from './MediaSection.jsx'
import { buildCta } from '../data/site.js'

/** Left-aligned 16:9 band at 50% overlay — the reference's Start Building block. */
export default function Build() {
  return (
    <MediaSection
      id="build"
      eyebrow="Configure"
      heading={buildCta.heading}
      body={buildCta.body}
      cta={buildCta.cta}
      src={buildCta.src}
      overlay={buildCta.overlay}
      align="start"
    />
  )
}
