import { Link, useParams } from "react-router-dom";
import { products } from "../data/content.js";

export function ProductDetailPage({ t, addToCart }) {
  const { productId } = useParams();
  const product = products.find((item) => item.id === productId);

  if (!product) {
    return (
      <main className="detail-page">
        <h1>{t.notFound}</h1>
        <Link className="button dark" to="/">{t.backHome}</Link>
      </main>
    );
  }

  return (
    <main className="detail-page">
      <div className="detail-grid">
        <div className="detail-media">
          {product.badge && <span className="sale-badge">{product.badge}</span>}
          <img src={product.image} alt={product.name} />
        </div>
        <section className="detail-copy">
          <Link className="detail-back" to="/#best-sellers">← {t.bestTitle}</Link>
          <h1>{product.name}</h1>
          <p className="price-line">
            {`${t.from} ${product.price}`}
            {product.oldPrice && <span>{product.oldPrice}</span>}
          </p>
          <p>{product.description}</p>
          <div className="detail-options">
            <strong>{t.quantity}</strong>
            {product.options.map((option) => <span key={option}>{option}</span>)}
          </div>
          <button className="checkout-button" onClick={() => addToCart(product)}>{t.quick}</button>
        </section>
      </div>
    </main>
  );
}
