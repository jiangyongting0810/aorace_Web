import { lazy, Suspense, useEffect, useLayoutEffect, useMemo, useState } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { CartDrawer } from "./components/CartDrawer.jsx";
import { CheckoutModal } from "./components/CheckoutModal.jsx";
import { CookiePanel } from "./components/CookiePanel.jsx";
import { ErrorBoundary } from "./components/ErrorBoundary.jsx";
import { Footer } from "./components/Footer.jsx";
import { Header } from "./components/Header.jsx";
import { AppRouter } from "./router.jsx";
import { SearchOverlay } from "./components/SearchOverlay.jsx";
import { assets, copy } from "./data/content.js";
import { useLocalStorageState } from "./hooks/useLocalStorageState.js";

const HomePage = lazy(() => import("./pages/HomePage.jsx").then((module) => ({ default: module.HomePage })));
const AboutUsPage = lazy(() => import("./pages/AboutUsPage.jsx").then((module) => ({ default: module.AboutUsPage })));
const FishingRodsPage = lazy(() => import("./pages/FishingRodsPage.jsx").then((module) => ({ default: module.FishingRodsPage })));
const FishingReelsPage = lazy(() => import("./pages/FishingReelsPage.jsx").then((module) => ({ default: module.FishingReelsPage })));
const ProductDetailPage = lazy(() => import("./pages/ProductDetailPage.jsx").then((module) => ({ default: module.ProductDetailPage })));
const StoryDetailPage = lazy(() => import("./pages/StoryDetailPage.jsx").then((module) => ({ default: module.StoryDetailPage })));

function ScrollEffects() {
  const location = useLocation();

  useLayoutEffect(() => {
    let enterFrame = 0;
    let scrollFrame = 0;
    let retryFrame = 0;
    const forcePinnedHeader = location.pathname.startsWith("/collections/");

    const updateHeaderState = () => {
      const header = document.querySelector(".site-header");
      if (!header) return;
      if (forcePinnedHeader) {
        header.classList.add("is-pinned");
        return;
      }
      const hero = document.querySelector(".hero, .rods-hero, .reels-hero, .about-hero");
      if (!hero) {
        header.classList.remove("is-pinned");
        return;
      }
      const threshold = hero.offsetTop + hero.offsetHeight / 2;
      header.classList.toggle("is-pinned", window.scrollY >= threshold);
    };

    const scheduleHeaderStateUpdate = () => {
      if (scrollFrame) return;
      scrollFrame = window.requestAnimationFrame(() => {
        scrollFrame = 0;
        updateHeaderState();
      });
    };

    scheduleHeaderStateUpdate();
    retryFrame = window.requestAnimationFrame(scheduleHeaderStateUpdate);
    const header = document.querySelector(".site-header");
    if (header) {
      header.classList.remove("is-entered");
      enterFrame = window.requestAnimationFrame(() => {
        header.classList.add("is-entered");
      });
    }

    window.addEventListener("scroll", scheduleHeaderStateUpdate, { passive: true });
    window.addEventListener("resize", scheduleHeaderStateUpdate);

    return () => {
      window.cancelAnimationFrame(enterFrame);
      window.cancelAnimationFrame(scrollFrame);
      window.cancelAnimationFrame(retryFrame);
      window.removeEventListener("scroll", scheduleHeaderStateUpdate);
      window.removeEventListener("resize", scheduleHeaderStateUpdate);
    };
  }, [location.pathname]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const scrollTarget = params.get("scroll");

    if (scrollTarget) {
      window.requestAnimationFrame(() => {
        document.getElementById(scrollTarget)?.scrollIntoView({ behavior: "smooth" });
      });

      params.delete("scroll");
      const nextSearch = params.toString();
      const nextUrl = `${location.pathname}${nextSearch ? `?${nextSearch}` : ""}${location.hash}`;
      window.history.replaceState(window.history.state, "", nextUrl);
      return;
    }

    if (!location.hash) {
      window.scrollTo({ top: 0, behavior: "instant" });
      return;
    }

    window.requestAnimationFrame(() => {
      document.querySelector(location.hash)?.scrollIntoView({ behavior: "smooth" });
    });
  }, [location.pathname, location.hash, location.search]);

  return null;
}

function AppShell() {
  const [lang, setLang] = useLocalStorageState("tideforge-lang", "en");
  const [cartItems, setCartItems] = useLocalStorageState("tideforge-cart", []);
  const [cookieConsent, setCookieConsent] = useLocalStorageState("tideforge-cookie-consent", null);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const t = copy[lang] || copy.en;
  const otherLang = lang === "en" ? "zh" : "en";

  const navItems = useMemo(() => [
    { key: "home", label: t.nav[0], href: "/" },
    {
      key: "rods",
      label: t.nav[1],
      href: "/collections/fishing-rods",
      megaMenu: {
        heading: (t.megaMenuRods || t.megaMenu).allRods,
        headingHref: "/collections/fishing-rods",
        links: [
          { key: "spinning", label: (t.megaMenuRods || t.megaMenu).spinningRods, href: "/collections/fishing-rods" },
          { key: "casting", label: (t.megaMenuRods || t.megaMenu).castingRods, href: "/collections/fishing-rods" },
        ],
        feature: {
          href: "/collections/fishing-rods",
          image: assets.categoryRods,
          alt: (t.megaMenuRods || t.megaMenu).featuredAlt,
          eyebrow: (t.megaMenuRods || t.megaMenu).featuredEyebrow,
          title: (t.megaMenuRods || t.megaMenu).featuredTitle,
        },
      },
    },
    {
      key: "reels",
      label: t.nav[2],
      href: "/collections/fishing-reels",
      megaMenu: {
        heading: t.megaMenuReels.allReels,
        headingHref: "/collections/fishing-reels",
        links: [
          { key: "spinning", label: t.megaMenuReels.spinningReels, href: "/collections/fishing-reels" },
          { key: "casting", label: t.megaMenuReels.castingReels, href: "/collections/fishing-reels" },
        ],
        feature: {
          href: "/collections/fishing-reels",
          image: assets.categoryReels,
          alt: t.megaMenuReels.featuredAlt,
          eyebrow: t.megaMenuReels.featuredEyebrow,
          title: t.megaMenuReels.featuredTitle,
        },
      },
    },
    { key: "lures", label: t.nav[3], href: "/?scroll=best-sellers" },
    { key: "sale", label: t.nav[4], href: "/?scroll=best-sellers" },
    { key: "about", label: t.nav[5], href: "/about" },
    { key: "support", label: t.nav[6], href: "/#support" },
  ], [t]);

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cartItems.reduce((sum, item) => sum + item.amount * item.quantity, 0);

  const addToCart = (product, option = product.options[0]) => {
    setCartItems((items) => {
      const key = `${product.id}-${option}`;
      const existing = items.find((item) => item.key === key);
      if (existing) {
        return items.map((item) =>
          item.key === key ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [
        ...items,
        {
          key,
          id: product.id,
          name: product.name,
          option,
          amount: product.amount,
          image: product.image,
          quantity: 1,
        },
      ];
    });
    setCartOpen(true);
  };

  const updateQuantity = (key, quantity) => {
    setCartItems((items) =>
      items.map((item) => item.key === key ? { ...item, quantity: Math.max(1, quantity) } : item)
    );
  };

  const removeItem = (key) => {
    setCartItems((items) => items.filter((item) => item.key !== key));
  };

  return (
    <>
      <ScrollEffects />
      <div className="announcement">{t.top}</div>
      <Header
        t={t}
        navItems={navItems}
        cartCount={cartCount}
        lang={lang}
        otherLang={otherLang}
        setLang={setLang}
        setSearchOpen={setSearchOpen}
        setCartOpen={setCartOpen}
      />
      <Suspense fallback={<main className="detail-page" aria-live="polite">{t.loading || "Loading..."}</main>}>
        <Routes>
          <Route path="/" element={<HomePage t={t} lang={lang} addToCart={addToCart} />} />
          <Route path="/about" element={<AboutUsPage t={t} />} />
          <Route path="/collections/fishing-rods" element={<FishingRodsPage t={t} lang={lang} addToCart={addToCart} />} />
          <Route path="/collections/fishing-reels" element={<FishingReelsPage t={t} lang={lang} addToCart={addToCart} />} />
          <Route path="/products/:productId" element={<ProductDetailPage t={t} addToCart={addToCart} />} />
          <Route path="/stories/:slug" element={<StoryDetailPage t={t} lang={lang} />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
      <Footer t={t} navItems={navItems} />
      <CartDrawer
        t={t}
        cartItems={cartItems}
        cartCount={cartCount}
        cartSubtotal={cartSubtotal}
        cartOpen={cartOpen}
        setCartOpen={setCartOpen}
        setCheckoutOpen={setCheckoutOpen}
        updateQuantity={updateQuantity}
        removeItem={removeItem}
      />
      <CheckoutModal
        t={t}
        cartItems={cartItems}
        cartSubtotal={cartSubtotal}
        checkoutOpen={checkoutOpen}
        setCheckoutOpen={setCheckoutOpen}
        setCartOpen={setCartOpen}
        setCartItems={setCartItems}
      />
      <SearchOverlay t={t} lang={lang} searchOpen={searchOpen} setSearchOpen={setSearchOpen} />
      {!cookieConsent && <CookiePanel t={t} setCookieConsent={setCookieConsent} />}
    </>
  );
}

export function App() {
  return (
    <AppRouter>
      <ErrorBoundary>
        <AppShell />
      </ErrorBoundary>
    </AppRouter>
  );
}
