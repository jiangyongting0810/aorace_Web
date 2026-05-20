import { useState } from "react";

export function BrandTimeline({ title, intro, items }) {
  const [activeYear, setActiveYear] = useState(items[0]?.year || "");
  const activeItem = items.find((item) => item.year === activeYear) || items[0];

  return (
    <section className="about-section-block about-timeline">
      <div className="about-shell">
        <div className="about-section-heading">
          <p className="about-kicker">Timeline</p>
          <h2>{title}</h2>
          <p>{intro}</p>
        </div>

        <div className="timeline-desktop" aria-label={title}>
          <div className="timeline-track" aria-hidden="true" />
          <div className="timeline-year-row" role="tablist" aria-label={title}>
            {items.map((item) => {
              const isActive = item.year === activeItem.year;
              return (
                <button
                  className={`timeline-year-button ${isActive ? "is-active" : ""}`}
                  id={`timeline-tab-${item.year}`}
                  key={item.year}
                  onClick={() => setActiveYear(item.year)}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`timeline-panel-${item.year}`}
                  type="button"
                >
                  <span className="timeline-year-dot" aria-hidden="true" />
                  <span>{item.year}</span>
                </button>
              );
            })}
          </div>

          <article
            className="timeline-detail-card"
            id={`timeline-panel-${activeItem.year}`}
            role="tabpanel"
            aria-labelledby={`timeline-tab-${activeItem.year}`}
          >
            <p className="timeline-detail-year">{activeItem.year}</p>
            <h3>{activeItem.title}</h3>
            <p>{activeItem.body}</p>
          </article>
        </div>

        <div className="timeline-mobile">
          {items.map((item) => (
            <article className="timeline-mobile-item" key={item.year}>
              <div className="timeline-mobile-marker" aria-hidden="true" />
              <div className="timeline-mobile-copy">
                <p className="timeline-detail-year">{item.year}</p>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
