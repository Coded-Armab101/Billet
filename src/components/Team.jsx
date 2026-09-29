import MediaSection from './MediaSection.jsx'
import { team } from '../data/site.js'

/** Centre-aligned 16:9 band at 63% overlay — the reference's Our Team block. */
export default function Team() {
  return (
    <MediaSection
      id="team"
      eyebrow="The workshop"
      heading={team.heading}
      body={team.body}
      cta={team.cta}
      src={team.src}
      overlay={team.overlay}
      align="center"
    />
  )
}
