import { Link } from "react-router-dom";
import { formatMoney } from "../utils/format.js";

export function CartDrawer({
  t,
  cartItems,
  cartCount,
  cartSubtotal,
  cartOpen,
  setCartOpen,
  setCheckoutOpen,
  updateQuantity,
  removeItem,
}) {
  return (
    <aside className={cartOpen ? "drawer open" : "drawer"}>
      <button className="drawer-close" onClick={() => setCartOpen(false)}>{t.close}</button>
      <h2>{t.cart}</h2>
      {cartCount ? (
        <>
          <div className="cart-items">
            {cartItems.map((item) => (
              <div className="cart-item" key={item.key}>
                <img src={item.image} alt={item.name} />
                <div>
                  <strong>{item.name}</strong>
                  <small>{item.option}</small>
                  <span>{formatMoney(item.amount)}</span>
                </div>
                <div className="quantity-control">
                  <button onClick={() => updateQuantity(item.key, item.quantity - 1)} aria-label="Decrease quantity">-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.key, item.quantity + 1)} aria-label="Increase quantity">+</button>
                </div>
                <button className="remove-button" onClick={() => removeItem(item.key)}>{t.remove}</button>
              </div>
            ))}
          </div>
          <div className="cart-total">
            <span>{t.subtotal}</span>
            <strong>{formatMoney(cartSubtotal)}</strong>
          </div>
          <button
            className="checkout-button"
            onClick={() => {
              setCartOpen(false);
              setCheckoutOpen(true);
            }}
          >
            {t.checkout}
          </button>
          <Link to="/?scroll=best-sellers" onClick={() => setCartOpen(false)}>{t.continue}</Link>
        </>
      ) : (
        <>
          <p>{t.empty}</p>
          <Link to="/?scroll=best-sellers" onClick={() => setCartOpen(false)}>{t.continue}</Link>
        </>
      )}
    </aside>
  );
}
