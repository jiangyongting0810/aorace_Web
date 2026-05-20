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
    expect(screen.getAllByRole("button", { name: "+ Quick add" })).toHaveLength(4);
  });

  test("persists language choice in localStorage", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole("button", { name: /switch to chinese/i }));

    expect(screen.getByText("订单满 $50 免运费")).toBeInTheDocument();
    expect(window.localStorage.getItem("tideforge-lang")).toBe("\"zh\"");
  });

  test("adds a home page product to cart and persists cart state", async () => {
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

    expect(screen.getByRole("heading", { name: "Aorace M1 Travel Casting Rod" })).toBeInTheDocument();
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

  test("renders the fishing reels collection page with faq and seo content", async () => {
    const user = userEvent.setup();
    window.history.pushState({}, "", "/collections/fishing-reels");
    render(<App />);

    expect(screen.getByRole("heading", { name: "Fishing Reels" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Reel Buying Questions" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Fishing reel guide and selection advice" })).toBeInTheDocument();

    const firstQuestion = screen.getByRole("button", { name: "How do I choose the right reel size?" });
    const secondQuestion = screen.getByRole("button", { name: "What is the difference between spinning and casting reels?" });

    await user.click(firstQuestion);
    expect(firstQuestion).toHaveAttribute("aria-expanded", "true");

    await user.click(secondQuestion);
    expect(firstQuestion).toHaveAttribute("aria-expanded", "false");
    expect(secondQuestion).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText(/Spinning reels are easier for beginners/i)).toBeInTheDocument();
  });

  test("renders the about page and switches timeline milestones", async () => {
    const user = userEvent.setup();
    window.history.pushState({}, "", "/about");
    render(<App />);

    expect(screen.getByRole("heading", { name: "About Aorace Fishing" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "We are Trust Worthy" })).toBeInTheDocument();

    await user.click(screen.getByRole("tab", { name: "2020" }));

    expect(
      screen.getAllByRole("heading", { name: "30,000 square meter industrial park" }).length
    ).toBeGreaterThan(0);
    expect(screen.getByRole("link", { name: "Shop Aorace Fishing Gear" })).toHaveAttribute(
      "href",
      "/collections/fishing-rods"
    );
  });

  test("requires reel quick add selections before adding to cart", async () => {
    const user = userEvent.setup();
    window.history.pushState({}, "", "/collections/fishing-reels");
    render(<App />);

    await user.click(screen.getAllByRole("button", { name: "+ Quick add" })[0]);

    expect(screen.getByRole("heading", { name: "Aorace M1 Spinning Reel" })).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Add to cart" }));
    expect(screen.getByText("Please choose both side and size.")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Right" }));
    await user.click(screen.getByRole("button", { name: "4000" }));
    await user.click(screen.getByRole("button", { name: "Add to cart" }));

    expect(screen.getByRole("heading", { name: "Cart" })).toBeInTheDocument();
    await waitFor(() => {
      expect(window.localStorage.getItem("tideforge-cart")).toContain("Right / 4000");
    });
  });
});
