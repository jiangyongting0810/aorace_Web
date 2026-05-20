export function AlternatingSections({ sections }) {
  return (
    <section className="about-section-block about-alternating">
      <div className="about-shell">
        {sections.map((section, index) => (
          <article
            className={`about-story-panel ${index % 2 === 1 ? "is-reversed" : ""}`}
            key={section.title}
          >
            <div className="about-story-media">
              <img src={section.image} alt={section.alt} loading="lazy" />
            </div>
            <div className="about-story-copy">
              <p className="about-kicker">{section.eyebrow}</p>
              <h2>{section.title}</h2>
              <p>{section.body}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
