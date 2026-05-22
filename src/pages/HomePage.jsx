import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { assets, blogs, categories, products, reviews } from "../data/content.js";

function getProductPageSize() {
  if (typeof window === "undefined") return 4;
  if (window.innerWidth <= 720) return 1;
  if (window.innerWidth <= 1100) return 2;
  return 4;
}

function Hero() {
  return (
    <section className="hero">
      <img src={assets.heroBanner} alt="Travel fishing rod adventure banner" />
    </section>
  );
}

function CategorySection({ t, lang }) {
  return (
    <section className="categories section">
      <div className="section-title-row category-title-row">
        <h2>{t.categoriesTitle}</h2>
        <Link to="/?scroll=best-sellers" className="view-all-link">
          <span>{t.heroCta}</span>
          <span aria-hidden="true">›</span>
        </Link>
      </div>
      <div className="category-grid">
        {categories.slice(0, 3).map((category) => (
          <Link to={category.href || "/?scroll=best-sellers"} className="category-card" key={category.en}>
            <div className="category-image">
              <img src={category.image} alt={category.en} />
              <div className="category-overlay">
                <span className="category-arrow" aria-hidden="true">›</span>
                <h3>{lang === "en" ? category.en : category.zh}</h3>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

function ProductSection({ t, addToCart }) {
  const [pageSize, setPageSize] = useState(getProductPageSize);
  const [pageIndex, setPageIndex] = useState(0);
  const colorLabel = (count) => {
    if (!count) return "\u00a0";
    return count === 1 ? `${count} color available` : `${count} ${t.colors}`;
  };
  const pageCount = Math.max(1, Math.ceil(products.length / pageSize));
  const startIndex = pageIndex * pageSize;
  const featuredProducts = products.slice(startIndex, startIndex + pageSize);
  const progressWidth = `${((pageIndex + 1) / pageCount) * 100}%`;

  useEffect(() => {
    const updatePageSize = () => {
      setPageSize((current) => {
        const next = getProductPageSize();
        return current === next ? current : next;
      });
    };

    window.addEventListener("resize", updatePageSize);
    return () => {
      window.removeEventListener("resize", updatePageSize);
    };
  }, []);

  useEffect(() => {
    setPageIndex((current) => Math.min(current, pageCount - 1));
  }, [pageCount]);

  return (
    <section className="section products" id="best-sellers">
      <div className="section-title-row">
        <h2>{t.bestTitle}</h2>
        <Link to="/collections/fishing-rods" className="view-all-link">
          <span>{t.viewAll}</span>
          <span aria-hidden="true">›</span>
        </Link>
      </div>
      <div className="product-grid">
        {featuredProducts.map((product) => (
          <article className="product-card" key={product.id}>
            <Link to={`/products/${product.id}`} className="product-image">
              {product.badge && <span className="sale-badge">{product.badge}</span>}
              <img src={product.image} alt={product.name} />
            </Link>
            <div className="product-info">
              <Link className="product-title" to={`/products/${product.id}`}>{product.name}</Link>
              <p className="price-line">
                {`${t.from} ${product.price}`}
                {product.oldPrice && <span>{product.oldPrice}</span>}
              </p>
              <small>{colorLabel(product.colors)}</small>
              <div className="rating-line" aria-label={`${product.rating} rating`}>
                <span className="stars" aria-hidden="true">★★★★★</span>
                <span>{`${product.rating} (${product.reviews} reviews)`}</span>
              </div>
              <button className="quick-add-button" onClick={() => addToCart(product)}>{t.quick}</button>
            </div>
          </article>
        ))}
      </div>
      <div className="product-slider-controls">
        <span className="product-progress" style={{ "--product-progress-width": progressWidth }} />
        <div>
          <button
            type="button"
            aria-label="Show previous products"
            disabled={pageIndex === 0}
            onClick={() => setPageIndex((current) => Math.max(0, current - 1))}
          >
            ‹
          </button>
          <button
            type="button"
            aria-label="Show next products"
            disabled={pageIndex >= pageCount - 1}
            onClick={() => setPageIndex((current) => Math.min(pageCount - 1, current + 1))}
          >
            ›
          </button>
        </div>
      </div>
    </section>
  );
}

function AboutSection({ t }) {
  return (
    <section className="about-band" id="about">
      <div className="about-copy">
        <p className="kicker">{t.aboutTitle}</p>
        <h2>{t.aboutTitle}</h2>
        <p>{t.aboutBody}</p>
        <Link className="button dark" to="/about">{t.learn}</Link>
      </div>
    </section>
  );
}

function BlogSection({ t, lang }) {
  return (
    <section className="section blog-section">
      <div className="section-title-row">
        <div>
          <h2>{t.experienceTitle}</h2>
          <p>{t.experienceSub}</p>
        </div>
        <Link to="/stories/common-fishing-mistakes">{t.viewAll}</Link>
      </div>
      <div className="blog-grid">
        {blogs.map((blog) => (
          <article className="blog-card" key={blog.slug}>
            <Link to={`/stories/${blog.slug}`}>
              <img src={blog.image} alt={blog.title} />
            </Link>
            <Link to={`/stories/${blog.slug}`}>{lang === "en" ? blog.title : blog.zh}</Link>
          </article>
        ))}
      </div>
    </section>
  );
}

function Testimonials({ t }) {
  return (
    <section className="section testimonials">
      <div className="section-title-row">
        <h2>{t.testimonials}</h2>
        <Link to="/?scroll=best-sellers">{t.viewAll}</Link>
      </div>
      <div className="review-grid">
        {reviews.map(([name, title, body]) => (
          <article className="review-card" key={name}>
            <strong>{name}</strong>
            <h3>{title}</h3>
            <p>{body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function ServiceBar({ t }) {
  return (
    <section className="service-bar">
      {t.services.map((item) => <div key={item}>{item}</div>)}
    </section>
  );
}

export function HomePage({ t, lang, addToCart }) {
  return (
    <main>
      <Hero />
      <div className="content-container">
        <CategorySection t={t} lang={lang} />
        <ProductSection t={t} addToCart={addToCart} />
        <AboutSection t={t} />
        <BlogSection t={t} lang={lang} />
        <Testimonials t={t} />
        <ServiceBar t={t} />
      </div>
    </main>
  );
}
