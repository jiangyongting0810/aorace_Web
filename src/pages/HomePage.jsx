import { Link } from "react-router-dom";
import { assets, blogs, categories, products, reviews } from "../data/content.js";

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
      <h2>{t.categoriesTitle}</h2>
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
  const featuredProducts = products.slice(0, 4);

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
              {product.colors === 1 && <small>{`${product.colors} color available`}</small>}
              <div className="rating-line" aria-label={`${product.rating} rating`}>
                <span className="stars" aria-hidden="true">★★★★★</span>
                <span>{`${product.rating} (${product.reviews} reviews)`}</span>
              </div>
              <button className="quick-add-button" onClick={() => addToCart(product)}>{t.quick}</button>
            </div>
          </article>
        ))}
      </div>
      <div className="product-slider-controls" aria-hidden="true">
        <span className="product-progress" />
        <div>
          <button>‹</button>
          <button>›</button>
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
