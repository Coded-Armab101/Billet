import { boards } from '../data/site.js'
import CardGallery from './CardGallery.jsx'

/**
 * Featured collection: a static three-column card grid. Each card holds its
 * own crossfading gallery rather than sharing one carousel, so all three
 * boards stay on screen at once.
 */
export default function ProductGrid() {
  return (
    <section id="keyboards" className="section section-featured">
      <div className="container-max-width">
        <div className="featured-head">
          <h2 className="t-h1 t-center">For the Work That Gets Done</h2>
          <p className="t-muted featured-sub">
            Three layouts, one mounting system. Every board ships as a kit you can keep re-tuning.
          </p>
        </div>

        <div className="featured-grid">
          {boards.map((board) => (
            <article key={board.id} id={board.id} className="featured-card">
              <CardGallery board={board} />
              <div className="featured-card-body">
                <h3 className="t-h5 featured-card-title">{board.name}</h3>
                <p className="t-meta featured-card-meta">
                  {board.layout} · from ${board.from}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
