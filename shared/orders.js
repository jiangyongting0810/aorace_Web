export function validateOrder(order) {
  if (!order || typeof order !== "object") {
    return "Invalid order payload";
  }

  if (!order.customer?.email || !order.customer?.name) {
    return "Missing order information";
  }

  if (!Array.isArray(order.items) || !order.items.length) {
    return "Missing order information";
  }

  return null;
}

export function createSavedOrder(order) {
  return {
    ...order,
    orderId: `TF-${Date.now()}`,
    status: "paid_pending_fulfillment",
  };
}
