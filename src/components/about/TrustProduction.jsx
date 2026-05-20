export function TrustProduction({ trust }) {
  return (
    <section className="about-section-block about-trust">
      <div className="about-shell">
        <div className="about-trust-panel">
          <div className="about-trust-media">
            <img src={trust.image} alt={trust.alt} loading="lazy" />
          </div>
          <div className="about-trust-copy">
            <p className="about-kicker">{trust.eyebrow}</p>
            <h2>{trust.title}</h2>
            <p>{trust.body}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
