import { memo } from "react";

function ReelsSEOContentComponent({ title, content }) {
  const sections = content?.sections || [];

  return (
    <section className="reels-seo section" aria-labelledby="reels-seo-title">
      <div className="content-container">
        <div className="reels-seo-shell">
          <h2 id="reels-seo-title">{title}</h2>
          <p>{content?.intro}</p>
          {sections.map((section) => (
            <div className="reels-seo-block" key={section.title}>
              <h3>{section.title}</h3>
              {(section.paragraphs || []).map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              <ul>
                {(section.bullets || []).map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export const ReelsSEOContent = memo(ReelsSEOContentComponent);
