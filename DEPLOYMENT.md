# Deployment Notes

This project now supports two route modes so it can move between static hosts and full server deployments without code rewrites.

## Frontend

- `VITE_ROUTER_MODE=browser`
  Use this on hosts that support SPA rewrites, such as Netlify, Vercel, Nginx, or your own Node server.
- `VITE_ROUTER_MODE=hash`
  Use this on simple static hosts that cannot rewrite unknown routes to `index.html`.

- `VITE_API_BASE_URL`
  Points the checkout flow to your backend base URL.
  Examples:
  - `/api`
  - `https://api.yourdomain.com`

## Backend contract

The frontend submits orders to `POST {VITE_API_BASE_URL}/orders`.

The backend should:

- accept JSON
- validate `customer.email`, `customer.name`, and `items`
- return:

```json
{
  "orderId": "TF-1234567890",
  "status": "paid_pending_fulfillment"
}
```

The shared validation helpers live in `shared/orders.js` so the same rules can be reused in a local Node server, a serverless function, or a standalone API service.

## Platform notes

- Netlify:
  Keep `VITE_ROUTER_MODE=browser`, build with `npm run build`, publish `dist`, and include `public/_redirects`.
- Static hosts without rewrites:
  Set `VITE_ROUTER_MODE=hash`.
- Custom backend or separate API:
  Set `VITE_API_BASE_URL` to that service URL.
