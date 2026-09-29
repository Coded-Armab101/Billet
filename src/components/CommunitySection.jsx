import { heart } from '../data/site.js'

/**
 * Statement band. Centred heading over a three-column row: supporting copy on
 * the left, a circular accent badge in the middle, and the community link
 * pushed to the right. Columns stack on mobile, matching the reference.
 */
export default function CommunitySection() {
  return (
    <section id="heart" className="section section-heart">
      <div className="heart-shell" style={{ '--heart-accent': heart.accent }}>
        <div className="heart-inner">
          <div className="heart-heading heart-block">
            <h2>{heart.heading}</h2>
          </div>

          <div className="heart-row">
            <div className="heart-cell heart-cell-copy heart-block">
              <p>{heart.body}</p>
            </div>

            <div className="heart-cell heart-cell-badge heart-block">
              <div className="heart-badge">
                <div className="heart-badge-inner">
                  <svg
                    width="72"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      d="M20 9.24609V10.2461H19V9.24609H20ZM22 13.2461V11.2461H21V10.2461H20V12.2461H19V13.2461H18V12.2461H17V9.24609H16V7.24609H15V6.24609H14V5.24609H13V3.24609H12V2.24609H13V0.246094H12V1.24609H10V2.24609H9V4.24609H8V8.24609H9V10.2461H8V11.2461H7V10.2461H6V9.24609H5V8.24609H6V5.24609H5V6.24609H4V7.24609H3V9.24609H2V12.2461H3V13.2461H2V14.2461H1V16.2461H2V18.2461H3V19.2461H4V21.2461H5V22.2461H6V23.2461H8V24.2461H10V23.2461H9V22.2461H8V21.2461H7V18.2461H8V16.2461H7V15.2461H8V16.2461H9V17.2461H10V12.2461H11V10.2461H12V9.24609H13V10.2461H12V13.2461H13V14.2461H14V15.2461H15V18.2461H16V17.2461H17V16.2461H18V19.2461H17V21.2461H16V23.2461H15V24.2461H17V23.2461H19V22.2461H20V20.2461H21V19.2461H22V17.2461H23V13.2461H22Z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div className="heart-cell heart-cell-cta heart-block">
              <a href={heart.cta.href} className="btn btn-outline btn-lg btn-icon-end">
                {heart.cta.label}
                <svg
                  width="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M21 11.2461V10.2461H20V9.24609H19V8.24609H18V7.24609H17V6.24609H16V5.24609H15V4.24609H14V3.24609H13V4.24609H12V5.24609H13V6.24609H14V7.24609H15V8.24609H16V9.24609H17V10.2461H18V11.2461H17H16H15H14H13H12H11H10H9H8H7H6H5H4H3H2V12.2461V13.2461H3H4H5H6H7H8H9H10H11H12H13H14H15H16H17H18V14.2461H17V15.2461H16V16.2461H15V17.2461H14V18.2461H13V19.2461H12V20.2461H13V21.2461H14V20.2461H15V19.2461H16V18.2461H17V17.2461H18V16.2461H19V15.2461H20V14.2461H21V13.2461H22V12.2461V11.2461H21Z"
                    fill="currentColor"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
