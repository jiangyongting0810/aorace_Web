import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      "/api": "http://127.0.0.1:4173",
    },
  },
  test: {
    environment: "jsdom",
    setupFiles: [resolve("src/test/setup.js")],
    globals: true,
  },
});
