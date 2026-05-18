import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, test } from "vitest";
import { App } from "./App.jsx";

describe("FishWeb React app", () => {
  beforeEach(() => {
    window.localStorage.clear();
    window.history.pushState({}, "", "/");
  });

  test("renders the storefront home page", () => {
    render(<App />);

    expect(screen.getByText("Free Shipping on Orders Over $50")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Shop by Categories" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Best Sellers" })).toBeInTheDocument();
  });

  test("persists language choice in localStorage", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole("button", { name: "切换到中文" }));

    expect(screen.getByText("订单满 $50 免运费")).toBeInTheDocument();
    expect(window.localStorage.getItem("tideforge-lang")).toBe("\"zh\"");
  });

  test("adds a product to cart and persists cart state", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getAllByRole("button", { name: "+ Quick add" })[0]);

    expect(screen.getByRole("button", { name: "Cart 1" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Cart" })).toBeInTheDocument();
    await waitFor(() => {
      expect(window.localStorage.getItem("tideforge-cart")).toContain("m1-spinning-reel");
    });
  });

  test("renders a product detail route", () => {
    window.history.pushState({}, "", "/products/m1-travel-casting-rod");
    render(<App />);

    expect(screen.getByRole("heading", { name: "HANDING M1 Travel Casting Rod" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "+ Quick add" })).toBeInTheDocument();
  });

  test("renders the fishing rods collection page and opens sorting options", async () => {
    const user = userEvent.setup();
    window.history.pushState({}, "", "/collections/fishing-rods");
    render(<App />);

    expect(screen.getByRole("heading", { name: "Fishing Rods" })).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /Sort by:/i }));

    expect(screen.getByRole("button", { name: "Best selling" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Price, high to low" })).toBeInTheDocument();
  });
});
