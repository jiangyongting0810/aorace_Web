import { BrowserRouter, HashRouter } from "react-router-dom";
import { routerMode } from "./config/runtime.js";

export function AppRouter({ children }) {
  const Router = routerMode === "hash" ? HashRouter : BrowserRouter;

  return <Router>{children}</Router>;
}
