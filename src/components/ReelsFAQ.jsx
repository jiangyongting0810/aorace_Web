import { memo, useState } from "react";

function ReelsFAQComponent({ title, intro, items = [] }) {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="reels-faq section" aria-labelledby="reels-faq-title">
      <div className="content-container">
        <div className="reels-faq-shell">
          <div className="reels-faq-header">
            <h2 id="reels-faq-title">{title}</h2>
            <p>{intro}</p>
          </div>
          <div className="reels-faq-list">
            {items.map((item, index) => {
              const open = openIndex === index;
              return (
                <article className={open ? "reels-faq-item open" : "reels-faq-item"} key={item.question}>
                  <button
                    type="button"
                    className="reels-faq-trigger"
                    aria-expanded={open}
                    onClick={() => setOpenIndex((current) => current === index ? null : index)}
                  >
                    <span>{item.question}</span>
                    <span className="reels-faq-icon" aria-hidden="true">+</span>
                  </button>
                  <div className="reels-faq-panel">
                    <div className="reels-faq-panel-inner">
                      <p>{item.answer}</p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export const ReelsFAQ = memo(ReelsFAQComponent);
