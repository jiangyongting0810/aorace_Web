import { Link } from "react-router-dom";

export function JoinUsCallToAction({ cta }) {
  return (
    <section className="about-section-block about-cta">
      <div className="about-shell">
        <div className="about-cta-panel">
          <p className="about-kicker">Ready to cast</p>
          <h2>{cta.title}</h2>
          <p>{cta.body}</p>
          <Link className="about-cta-button" to="/collections/fishing-rods">
            {cta.button}
          </Link>
        </div>
      </div>
    </section>
  );
}
