const rawApiBaseUrl = import.meta.env.VITE_API_BASE_URL || "/api";

export const routerMode = import.meta.env.VITE_ROUTER_MODE === "hash" ? "hash" : "browser";

export function getApiUrl(pathname) {
  const normalizedBaseUrl = rawApiBaseUrl.endsWith("/")
    ? rawApiBaseUrl.slice(0, -1)
    : rawApiBaseUrl;
  const normalizedPath = pathname.startsWith("/") ? pathname : `/${pathname}`;

  return `${normalizedBaseUrl}${normalizedPath}`;
}
