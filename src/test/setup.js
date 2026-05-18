import "@testing-library/jest-dom/vitest";
import { vi } from "vitest";

Object.defineProperty(window, "scrollTo", {
  value: vi.fn(),
  writable: true,
});

Object.defineProperty(window, "requestAnimationFrame", {
  value: (callback) => window.setTimeout(callback, 0),
  writable: true,
});
