import { categories } from '../data/site.js'
import Slot from './Slot.jsx'

/**
 * Category menu. Names run at the reference's display scale, then swap to the
 * alternate display face and pick up the accent colour on hover, with the
 * category image appearing alongside. The hover card alternates sides down the
 * list (first right, second left, …) and carries the reference's 15° tilt,
 * drop shadows and hover zoom. The mid-sentence word break is what keeps very
 * long names inside the row.
 */
export default function Categories() {
  return (
    <section id="categories" className="section section-categories" aria-label="Category navigation">
      <div className="grid-overlay" aria-hidden="true" />

      <div className="container">
        <div className="cat-head">
          <div className="stage-pill">
            <p className="t-small-accent t-muted">Explore By Category</p>
          </div>
        </div>

        <div className="cat-list">
          {categories.map((category, i) => (
            <div
              key={category.name}
              className={`cat-item cat-item--${i % 2 === 0 ? 'right' : 'left'}`}
            >
              <a className="cat-link" href={category.href}>
                <span className="cat-name">{category.name}</span>
              </a>
              <span className="cat-media" aria-hidden="true">
                <Slot src={category.src} alt="" ratio="3 / 4" />
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
