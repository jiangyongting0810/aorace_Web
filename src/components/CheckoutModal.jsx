import { useState } from "react";
import { formatMoney } from "../utils/format.js";

export function CheckoutModal({
  t,
  cartItems,
  cartSubtotal,
  checkoutOpen,
  setCheckoutOpen,
  setCartOpen,
  orderResult,
  setOrderResult,
  setCartItems,
}) {
  const [form, setForm] = useState({
    email: "",
    name: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    notes: "",
    payment: "card",
  });
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  const update = (field, value) => setForm((current) => ({ ...current, [field]: value }));

  const close = () => {
    setCheckoutOpen(false);
    setError("");
    setStatus("idle");
    if (orderResult) setOrderResult(null);
  };

  const submitOrder = async (event) => {
    event.preventDefault();
    const required = ["email", "name", "phone", "address", "city", "state", "zip"];
    if (!cartItems.length || required.some((field) => !form[field].trim())) {
      setError(t.required);
      return;
    }

    setStatus("submitting");
    setError("");
    const order = {
      customer: form,
      items: cartItems,
      subtotal: Number(cartSubtotal.toFixed(2)),
      createdAt: new Date().toISOString(),
    };

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(order),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Order failed");
      setOrderResult(data);
      setCartItems([]);
      setStatus("idle");
    } catch (err) {
      setError(err.message);
      setStatus("idle");
    }
  };

  return (
    <div className={checkoutOpen ? "checkout-modal open" : "checkout-modal"}>
      <form className="checkout-panel" onSubmit={submitOrder}>
        <button type="button" className="drawer-close" onClick={close}>{t.close}</button>
        {orderResult ? (
          <div className="order-success">
            <h2>{t.thankYou}</h2>
            <p>{`${t.orderReceived} #${orderResult.orderId}`}</p>
            <button type="button" className="checkout-button" onClick={close}>{t.continue}</button>
          </div>
        ) : (
          <div className="checkout-grid">
            <div className="checkout-fields">
              <h2>{t.checkout}</h2>
              <h3>{t.contact}</h3>
              <input value={form.email} onChange={(e) => update("email", e.target.value)} placeholder={t.email} type="email" />
              <h3>{t.delivery}</h3>
              <input value={form.name} onChange={(e) => update("name", e.target.value)} placeholder={t.customerName} />
              <input value={form.phone} onChange={(e) => update("phone", e.target.value)} placeholder={t.phone} />
              <input value={form.address} onChange={(e) => update("address", e.target.value)} placeholder={t.address} />
              <div className="checkout-row">
                <input value={form.city} onChange={(e) => update("city", e.target.value)} placeholder={t.city} />
                <input value={form.state} onChange={(e) => update("state", e.target.value)} placeholder={t.state} />
                <input value={form.zip} onChange={(e) => update("zip", e.target.value)} placeholder={t.zip} />
              </div>
              <textarea value={form.notes} onChange={(e) => update("notes", e.target.value)} placeholder={t.notes} />
              <h3>{t.payment}</h3>
              <div className="payment-options">
                {[["card", t.card], ["paypal", t.paypal], ["shop", t.shopPay]].map(([value, label]) => (
                  <label key={value} className={form.payment === value ? "selected" : ""}>
                    <input
                      checked={form.payment === value}
                      onChange={() => update("payment", value)}
                      type="radio"
                      name="payment"
                    />
                    {label}
                  </label>
                ))}
              </div>
              {error && <p className="checkout-error">{error}</p>}
              <button className="checkout-button" disabled={status === "submitting"}>
                {status === "submitting" ? t.submitting : t.completeOrder}
              </button>
            </div>
            <aside className="checkout-summary">
              <h3>{t.orderSummary}</h3>
              {cartItems.map((item) => (
                <div className="summary-item" key={item.key}>
                  <span>{`${item.name} x ${item.quantity}`}</span>
                  <strong>{formatMoney(item.amount * item.quantity)}</strong>
                </div>
              ))}
              <div className="cart-total">
                <span>{t.subtotal}</span>
                <strong>{formatMoney(cartSubtotal)}</strong>
              </div>
              <button type="button" onClick={() => { setCheckoutOpen(false); setCartOpen(true); }}>{t.cart}</button>
            </aside>
          </div>
        )}
      </form>
    </div>
  );
}
