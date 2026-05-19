import { getApiUrl } from "../config/runtime.js";

export async function submitOrder(order) {
  const response = await fetch(getApiUrl("/orders"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(order),
  });
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.error || "Order failed");
  }

  return data;
}
