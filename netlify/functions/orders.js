import { createSavedOrder, validateOrder } from "../../shared/orders.js";

export default async (req) => {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json;charset=utf-8" },
    });
  }

  try {
    const order = await req.json();
    const validationError = validateOrder(order);

    if (validationError) {
      return new Response(JSON.stringify({ error: validationError }), {
        status: 400,
        headers: { "Content-Type": "application/json;charset=utf-8" },
      });
    }

    const savedOrder = createSavedOrder(order);

    return new Response(
      JSON.stringify({
        orderId: savedOrder.orderId,
        status: savedOrder.status,
      }),
      {
        status: 201,
        headers: { "Content-Type": "application/json;charset=utf-8" },
      }
    );
  } catch {
    return new Response(JSON.stringify({ error: "Invalid order payload" }), {
      status: 400,
      headers: { "Content-Type": "application/json;charset=utf-8" },
    });
  }
};

export const config = {
  path: "/api/orders",
  preferStatic: true,
};
