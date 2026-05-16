const { useMemo, useState } = React;

const copy = {
  en: {
    top: "Free Shipping on Orders Over $50",
    nav: ["Home", "Rods", "Reels", "Lures", "Sale", "About", "Support"],
    brand: "TideForge Fishing Tackle",
    search: "Search",
    account: "Account",
    cart: "Cart",
    heroTitle: "TideForge Fishing Tackle",
    heroSubtitle: "Reliable rods, reels and lures built for everyday anglers.",
    heroCta: "Shop Bestseller",
    categoriesTitle: "Shop by Categories",
    promo1: "Ingenious Lures",
    promo1Sub: "Outwit. Outfish.",
    promo2: "M1 Spinning Reel",
    promo2Sub: "Affordable Excellence",
    promo3: "Tactical Tackles",
    promo3Sub: "Best seller",
    bestTitle: "Best Sellers",
    viewAll: "View all",
    quick: "+ Quick add",
    from: "Sale price From",
    colors: "colors available",
    aboutTitle: "About Us",
    aboutBody:
      "With over 10 years of fishing tackle experience, TideForge focuses on affordable, durable gear that makes fishing easier, more comfortable and more fun.",
    learn: "Learn More",
    experienceTitle: "The TideForge Experience",
    experienceSub: "Latest News, Tips and Stories",
    testimonials: "Testimonials",
    services: ["Free Shipping Over $50", "5 - 7 Working Days Fast Delivery", "One Year Warranty", "30 Days Free Return"],
    footerExplore: "Explore",
    footerService: "Customer Service",
    footerAbout: "About",
    signup: "Sign up for new stories and exclusive offers",
    email: "E-mail",
    subscribe: "Subscribe",
    cookieTitle: "Cookie policy",
    cookieBody: "We use cookies and similar technologies to provide the best experience on our website.",
    accept: "Accept",
    decline: "Decline",
    empty: "Your cart is empty",
    continue: "Continue shopping",
    close: "Close",
    checkout: "Check out",
    subtotal: "Subtotal",
    quantity: "Quantity",
    remove: "Remove",
    orderSummary: "Order summary",
    contact: "Contact",
    delivery: "Delivery",
    payment: "Payment",
    completeOrder: "Complete order",
    customerName: "Full name",
    phone: "Phone",
    address: "Street address",
    city: "City",
    state: "State",
    zip: "ZIP code",
    notes: "Order notes",
    card: "Credit card",
    paypal: "PayPal",
    shopPay: "Shop Pay",
    thankYou: "Thank you for your order",
    orderReceived: "Your order has been received. We will send shipping updates by email.",
    required: "Please complete the required checkout fields.",
    submitting: "Submitting...",
  },
  zh: {
    top: "\u8ba2\u5355\u6ee1 $50 \u514d\u8fd0\u8d39",
    nav: ["\u9996\u9875", "\u9c7c\u7aff", "\u6e14\u8f6e", "\u62df\u9975", "\u4fc3\u9500", "\u5173\u4e8e", "\u652f\u6301"],
    brand: "TideForge \u6e14\u5177\u72ec\u7acb\u7ad9",
    search: "\u641c\u7d22",
    account: "\u8d26\u6237",
    cart: "\u8d2d\u7269\u8f66",
    heroTitle: "TideForge \u6e14\u5177",
    heroSubtitle: "\u4e3a\u65e5\u5e38\u9493\u624b\u6253\u9020\u7684\u9ad8\u6027\u4ef7\u6bd4\u9c7c\u7aff\u3001\u6e14\u8f6e\u548c\u62df\u9975\u3002",
    heroCta: "\u9009\u8d2d\u70ed\u5356",
    categoriesTitle: "\u6309\u5206\u7c7b\u9009\u8d2d",
    promo1: "\u7075\u52a8\u62df\u9975",
    promo1Sub: "\u66f4\u806a\u660e\uff0c\u66f4\u9ad8\u6548",
    promo2: "M1 \u7eba\u8f66\u8f6e",
    promo2Sub: "\u9ad8\u6027\u80fd\u5165\u95e8\u4ef7",
    promo3: "\u6218\u672f\u9493\u5177",
    promo3Sub: "\u70ed\u5356\u7cfb\u5217",
    bestTitle: "\u70ed\u5356\u5546\u54c1",
    viewAll: "\u67e5\u770b\u5168\u90e8",
    quick: "+ \u5feb\u901f\u52a0\u8d2d",
    from: "\u4fc3\u9500\u4ef7 \u4ece",
    colors: "\u8272\u53ef\u9009",
    aboutTitle: "\u5173\u4e8e\u6211\u4eec",
    aboutBody:
      "TideForge \u62e5\u6709 10 \u5e74\u4ee5\u4e0a\u6e14\u5177\u7ecf\u9a8c\uff0c\u4e13\u6ce8\u4e8e\u9ad8\u6027\u4ef7\u6bd4\u3001\u8010\u7528\u4e14\u6613\u4e0a\u624b\u7684\u9493\u9c7c\u88c5\u5907\u3002",
    learn: "\u4e86\u89e3\u66f4\u591a",
    experienceTitle: "TideForge \u4f53\u9a8c",
    experienceSub: "\u6700\u65b0\u8d44\u8baf\u3001\u6280\u5de7\u548c\u6545\u4e8b",
    testimonials: "\u7528\u6237\u8bc4\u4ef7",
    services: ["\u6ee1 $50 \u514d\u8fd0\u8d39", "5 - 7 \u4e2a\u5de5\u4f5c\u65e5\u5feb\u901f\u9001\u8fbe", "\u4e00\u5e74\u8d28\u4fdd", "30 \u5929\u514d\u8d39\u9000\u8d27"],
    footerExplore: "\u63a2\u7d22",
    footerService: "\u5ba2\u6237\u670d\u52a1",
    footerAbout: "\u5173\u4e8e",
    signup: "\u8ba2\u9605\u65b0\u6545\u4e8b\u548c\u4e13\u5c5e\u4f18\u60e0",
    email: "\u90ae\u7bb1",
    subscribe: "\u8ba2\u9605",
    cookieTitle: "Cookie \u653f\u7b56",
    cookieBody: "\u6211\u4eec\u4f7f\u7528 Cookie \u548c\u7c7b\u4f3c\u6280\u672f\u6765\u63d0\u4f9b\u66f4\u597d\u7684\u7f51\u7ad9\u4f53\u9a8c\u3002",
    accept: "\u63a5\u53d7",
    decline: "\u62d2\u7edd",
    empty: "\u8d2d\u7269\u8f66\u662f\u7a7a\u7684",
    continue: "\u7ee7\u7eed\u9009\u8d2d",
    close: "\u5173\u95ed",
    checkout: "\u53bb\u7ed3\u8d26",
    subtotal: "\u5c0f\u8ba1",
    quantity: "\u6570\u91cf",
    remove: "\u79fb\u9664",
    orderSummary: "\u8ba2\u5355\u6458\u8981",
    contact: "\u8054\u7cfb\u65b9\u5f0f",
    delivery: "\u914d\u9001\u4fe1\u606f",
    payment: "\u652f\u4ed8\u65b9\u5f0f",
    completeOrder: "\u5b8c\u6210\u8ba2\u5355",
    customerName: "\u59d3\u540d",
    phone: "\u7535\u8bdd",
    address: "\u8be6\u7ec6\u5730\u5740",
    city: "\u57ce\u5e02",
    state: "\u5dde/\u7701",
    zip: "\u90ae\u7f16",
    notes: "\u8ba2\u5355\u5907\u6ce8",
    card: "\u4fe1\u7528\u5361",
    paypal: "PayPal",
    shopPay: "Shop Pay",
    thankYou: "\u611f\u8c22\u4e0b\u5355",
    orderReceived: "\u6211\u4eec\u5df2\u6536\u5230\u8ba2\u5355\uff0c\u540e\u7eed\u4f1a\u901a\u8fc7\u90ae\u4ef6\u53d1\u9001\u7269\u6d41\u66f4\u65b0\u3002",
    required: "\u8bf7\u586b\u5199\u5fc5\u8981\u7684\u7ed3\u8d26\u4fe1\u606f\u3002",
    submitting: "\u63d0\u4ea4\u4e2d...",
  },
};

const categories = [
  {
    en: "Fishing Reels",
    zh: "\u6e14\u8f6e",
    image: "https://images.unsplash.com/photo-1519678572660-9972c7886d4b?auto=format&fit=crop&w=900&q=80",
  },
  {
    en: "Fishing Rods",
    zh: "\u9c7c\u7aff",
    image: "https://images.unsplash.com/photo-1500463959177-e0869687df26?auto=format&fit=crop&w=900&q=80",
  },
  {
    en: "Fishing Lures",
    zh: "\u62df\u9975",
    image: "https://images.unsplash.com/photo-1524704654690-b56c05c78a00?auto=format&fit=crop&w=900&q=80",
  },
  {
    en: "Fishing Lines",
    zh: "\u9493\u7ebf",
    image: "https://images.unsplash.com/photo-1529230117010-b6c436154f25?auto=format&fit=crop&w=900&q=80",
  },
];

const products = [
  {
    id: "m1-spinning-reel",
    name: "HANDING M1 Spinning Reel",
    price: "$22.99 USD",
    amount: 22.99,
    colors: 1,
    badge: "",
    rating: "4.9",
    reviews: "279",
    options: ["Silver / 2000", "Silver / 3000", "Silver / 4000"],
    image: "https://images.unsplash.com/photo-1519678572660-9972c7886d4b?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "m1-elite-spinning-reel",
    name: "HANDING M1 Elite Spinning Reel",
    price: "$33.99 USD",
    amount: 33.99,
    colors: 2,
    badge: "",
    rating: "4.7",
    reviews: "13",
    options: ["Black / 2500", "Black / 3500", "Red / 3500"],
    image: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "m1-travel-casting-rod",
    name: "HANDING M1 Travel Casting Rod",
    price: "$62.99 USD",
    amount: 62.99,
    colors: 1,
    badge: "",
    rating: "4.7",
    reviews: "22",
    options: ["6'6\" / Medium", "7'0\" / Medium Heavy"],
    image: "https://images.unsplash.com/photo-1500463959177-e0869687df26?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "m1-trout-casting-rod",
    name: "HANDING M1 Trout Ultralight Two Pieces Casting Rod",
    price: "$57.79 USD",
    amount: 57.79,
    oldPrice: "$67.99 USD",
    colors: 3,
    badge: "On sale",
    rating: "4.9",
    reviews: "9",
    options: ["5'6\" / Light", "6'0\" / Light", "6'6\" / Ultralight"],
    image: "https://images.unsplash.com/photo-1455043849284-0b3f18cf6a24?auto=format&fit=crop&w=900&q=80",
  },
];

const blogs = [
  {
    title: "4 Common Fishing Mistakes and How to Fix Them",
    zh: "4 \u4e2a\u5e38\u89c1\u9493\u9c7c\u9519\u8bef\u4ee5\u53ca\u4fee\u6b63\u65b9\u6cd5",
    image: "https://images.unsplash.com/photo-1518110925495-5fe2fda0442c?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Live Bait vs. Artificial Lures",
    zh: "\u6d3b\u9975\u548c\u4eba\u5de5\u62df\u9975\u600e\u4e48\u9009",
    image: "https://images.unsplash.com/photo-1512757776214-26d36777b513?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Spinning or Casting: Pick the Right Reel",
    zh: "\u7eba\u8f66\u8f6e\u8fd8\u662f\u6c34\u6ef4\u8f6e\uff1a\u5982\u4f55\u9009\u62e9",
    image: "https://images.unsplash.com/photo-1518443855757-dfadac7101ae?auto=format&fit=crop&w=900&q=80",
  },
];

const reviews = [
  ["Adam", "Fantastic value rod", "Low priced, durable and ready for rough shorelines."],
  ["Mary U.", "Impressive reel for a great low price.", "Smooth, clean looking and easy to recommend."],
  ["Jodi Jill", "Great rod and reel combo!", "The combo looked great and felt reliable after a week on the water."],
];

function App() {
  const [lang, setLang] = useState("en");
  const [cartItems, setCartItems] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [cookieVisible, setCookieVisible] = useState(true);
  const [orderResult, setOrderResult] = useState(null);
  const t = copy[lang];
  const otherLang = lang === "en" ? "zh" : "en";

  const navItems = useMemo(() => t.nav, [t]);
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
      items
        .map((item) => item.key === key ? { ...item, quantity: Math.max(1, quantity) } : item)
        .filter((item) => item.quantity > 0)
    );
  };
  const removeItem = (key) => {
    setCartItems((items) => items.filter((item) => item.key !== key));
  };

  return React.createElement(
    React.Fragment,
    null,
    React.createElement("div", { className: "announcement" }, t.top),
    React.createElement(Header, {
      t,
      navItems,
      cartCount,
      lang,
      otherLang,
      setLang,
      setSearchOpen,
      setCartOpen,
    }),
    React.createElement("main", null,
      React.createElement(Hero, { t }),
      React.createElement("div", { className: "content-container" },
        React.createElement(CategorySection, { t, lang }),
        React.createElement(ProductSection, { t, addToCart }),
        React.createElement(AboutSection, { t }),
        React.createElement(BlogSection, { t, lang }),
        React.createElement(Testimonials, { t }),
        React.createElement(ServiceBar, { t })
      )
    ),
    React.createElement(Footer, { t, navItems }),
    React.createElement(CartDrawer, {
      t,
      cartItems,
      cartCount,
      cartSubtotal,
      cartOpen,
      setCartOpen,
      setCheckoutOpen,
      updateQuantity,
      removeItem,
    }),
    React.createElement(CheckoutModal, {
      t,
      cartItems,
      cartSubtotal,
      checkoutOpen,
      setCheckoutOpen,
      setCartOpen,
      orderResult,
      setOrderResult,
      setCartItems,
    }),
    React.createElement(SearchOverlay, { t, searchOpen, setSearchOpen }),
    cookieVisible && React.createElement(CookiePanel, { t, setCookieVisible })
  );
}

function Header({ t, navItems, cartCount, lang, otherLang, setLang, setSearchOpen, setCartOpen }) {
  return React.createElement("header", { className: "site-header" },
    React.createElement("div", { className: "site-header-inner" },
      React.createElement("div", { className: "mobile-menu" }, "\u2630"),
      React.createElement("a", { className: "brand", href: "#" },
        React.createElement("img", { className: "brand-logo", src: "./src/assets/aorace.svg", alt: "Aorace" })
      ),
      React.createElement("nav", { className: "main-nav", "aria-label": "Main menu" },
        navItems.map((item, index) =>
          React.createElement("a", { href: "#", key: `${item}-${index}` }, item)
        )
      ),
      React.createElement("div", { className: "header-actions" },
        React.createElement("button", {
          className: lang === "en" ? "lang-button show-zh" : "lang-button show-en",
          onClick: () => setLang(otherLang),
          "aria-label": lang === "en" ? "\u5207\u6362\u5230\u4e2d\u6587" : "Switch to English",
        },
          React.createElement("span", { className: "lang-track", "aria-hidden": "true" }),
          React.createElement("span", { className: "lang-label zh" }, "\u4e2d\u6587"),
          React.createElement("span", { className: "lang-label en" }, "EN")
        ),
        React.createElement("button", { className: "plain-icon", onClick: () => setSearchOpen(true), "aria-label": t.search }, "\u2315"),
        React.createElement("button", { className: "account-link" }, t.account),
        React.createElement("button", { className: "cart-link", onClick: () => setCartOpen(true) }, `${t.cart} ${cartCount}`)
      )
    )
  );
}

function Hero({ t }) {
  return React.createElement("section", { className: "hero" },
    React.createElement("img", {
      src: "./src/assets/hero-banner.png",
      alt: "Travel fishing rod adventure banner",
    })
  );
}

function CategorySection({ t, lang }) {
  return React.createElement("section", { className: "categories section" },
    React.createElement("h2", null, t.categoriesTitle),
    React.createElement("div", { className: "category-grid" },
      categories.slice(0, 3).map((category) =>
        React.createElement("a", { href: "#best-sellers", className: "category-card", key: category.en },
          React.createElement("div", { className: "category-image" },
            React.createElement("img", { src: category.image, alt: category.en }),
            React.createElement("div", { className: "category-overlay" },
              React.createElement("img", { className: "category-arrow", src: "./src/assets/jiantou.svg", alt: "" }),
              React.createElement("h3", null, lang === "en" ? category.en : category.zh)
            )
          )
        )
      )
    )
  );
}

function PromoMosaic({ t }) {
  return React.createElement("section", { className: "promo-grid section" },
    React.createElement(PromoCard, {
      title: t.promo1,
      subtitle: t.promo1Sub,
      image: "https://images.unsplash.com/photo-1524704654690-b56c05c78a00?auto=format&fit=crop&w=1200&q=85",
    }),
    React.createElement(PromoCard, {
      title: t.promo2,
      subtitle: t.promo2Sub,
      image: "https://images.unsplash.com/photo-1519678572660-9972c7886d4b?auto=format&fit=crop&w=1200&q=85",
    }),
    React.createElement(PromoCard, {
      title: t.promo3,
      subtitle: t.promo3Sub,
      image: "https://images.unsplash.com/photo-1529230117010-b6c436154f25?auto=format&fit=crop&w=1200&q=85",
    })
  );
}

function PromoCard({ title, subtitle, image }) {
  return React.createElement("a", { href: "#best-sellers", className: "promo-card" },
    React.createElement("img", { src: image, alt: title }),
    React.createElement("div", null,
      React.createElement("h2", null, title),
      React.createElement("p", null, subtitle)
    )
  );
}

function ProductSection({ t, addToCart }) {
  return React.createElement("section", { className: "section products", id: "best-sellers" },
    React.createElement("div", { className: "section-title-row" },
      React.createElement("h2", null, t.bestTitle),
      React.createElement("a", { href: "#", className: "view-all-link" },
        React.createElement("span", null, t.viewAll),
        React.createElement("span", { "aria-hidden": "true" }, "\u203a")
      )
    ),
    React.createElement("div", { className: "product-grid" },
      products.map((product) =>
        React.createElement("article", { className: "product-card", key: product.name },
          React.createElement("div", { className: "product-image" },
            product.badge && React.createElement("span", { className: "sale-badge" }, product.badge),
            React.createElement("img", { src: product.image, alt: product.name })
          ),
          React.createElement("div", { className: "product-info" },
            React.createElement("a", { className: "product-title", href: "#" }, product.name),
            React.createElement("p", { className: "price-line" },
              `${t.from} ${product.price}`,
              product.oldPrice && React.createElement("span", null, product.oldPrice)
            ),
            product.colors === 1 && React.createElement("small", null, `${product.colors} color available`),
            React.createElement("div", { className: "rating-line", "aria-label": `${product.rating} rating` },
              React.createElement("span", { className: "stars", "aria-hidden": "true" }, "\u2605\u2605\u2605\u2605\u2605"),
              React.createElement("span", null, `${product.rating} (${product.reviews} reviews)`)
            ),
            React.createElement("button", {
              className: "quick-add-button",
              onClick: () => addToCart(product),
            }, t.quick)
          ),
        )
      )
    ),
    React.createElement("div", { className: "product-slider-controls", "aria-hidden": "true" },
      React.createElement("span", { className: "product-progress" }),
      React.createElement("div", null,
        React.createElement("button", null, "\u2039"),
        React.createElement("button", null, "\u203a")
      )
    )
  );
}

function AboutSection({ t }) {
  return React.createElement("section", { className: "about-band" },
    React.createElement("img", {
      src: "https://images.unsplash.com/photo-1518110925495-5fe2fda0442c?auto=format&fit=crop&w=1200&q=85",
      alt: "Fishing gear official store",
    }),
    React.createElement("div", null,
      React.createElement("p", { className: "kicker" }, t.aboutTitle),
      React.createElement("h2", null, t.aboutTitle),
      React.createElement("p", null, t.aboutBody),
      React.createElement("a", { className: "button dark", href: "#" }, t.learn)
    )
  );
}

function BlogSection({ t, lang }) {
  return React.createElement("section", { className: "section blog-section" },
    React.createElement("div", { className: "section-title-row" },
      React.createElement("div", null,
        React.createElement("h2", null, t.experienceTitle),
        React.createElement("p", null, t.experienceSub)
      ),
      React.createElement("a", { href: "#" }, t.viewAll)
    ),
    React.createElement("div", { className: "blog-grid" },
      blogs.map((blog) =>
        React.createElement("article", { className: "blog-card", key: blog.title },
          React.createElement("img", { src: blog.image, alt: blog.title }),
          React.createElement("a", { href: "#" }, lang === "en" ? blog.title : blog.zh)
        )
      )
    )
  );
}

function Testimonials({ t }) {
  return React.createElement("section", { className: "section testimonials" },
    React.createElement("div", { className: "section-title-row" },
      React.createElement("h2", null, t.testimonials),
      React.createElement("a", { href: "#" }, t.viewAll)
    ),
    React.createElement("div", { className: "review-grid" },
      reviews.map(([name, title, body]) =>
        React.createElement("article", { className: "review-card", key: name },
          React.createElement("strong", null, name),
          React.createElement("h3", null, title),
          React.createElement("p", null, body)
        )
      )
    )
  );
}

function ServiceBar({ t }) {
  return React.createElement("section", { className: "service-bar" },
    t.services.map((item) => React.createElement("div", { key: item }, item))
  );
}

function Footer({ t, navItems }) {
  return React.createElement("footer", { className: "footer" },
    React.createElement("div", null,
      React.createElement("h3", null, t.footerExplore),
      navItems.slice(0, 5).map((item) => React.createElement("a", { href: "#", key: item }, item))
    ),
    React.createElement("div", null,
      React.createElement("h3", null, t.footerService),
      ["Shipping & Return", "Warranty", "Pay Methods", "FAQ", "Contact Us"].map((item) => React.createElement("a", { href: "#", key: item }, item))
    ),
    React.createElement("div", null,
      React.createElement("h3", null, t.footerAbout),
      ["About Us", "Why Choose Us", "Customer Reviews", "Privacy Policy", "Wholesale"].map((item) => React.createElement("a", { href: "#", key: item }, item))
    ),
    React.createElement("div", { className: "footer-signup" },
      React.createElement("h3", null, t.signup),
      React.createElement("form", { onSubmit: (event) => event.preventDefault() },
        React.createElement("input", { placeholder: t.email, type: "email" }),
        React.createElement("button", null, t.subscribe)
      ),
      React.createElement("p", null, "Facebook  Instagram  YouTube  TikTok"),
      React.createElement("small", null, "\u00a9 2026 TideForge Fishing Tackle. Powered by Shopify-style commerce.")
    )
  );
}

function formatMoney(value) {
  return `$${value.toFixed(2)} USD`;
}

function CartDrawer({ t, cartItems, cartCount, cartSubtotal, cartOpen, setCartOpen, setCheckoutOpen, updateQuantity, removeItem }) {
  return React.createElement("aside", { className: cartOpen ? "drawer open" : "drawer" },
    React.createElement("button", { className: "drawer-close", onClick: () => setCartOpen(false) }, t.close),
    React.createElement("h2", null, t.cart),
    cartCount
      ? React.createElement(React.Fragment, null,
          React.createElement("div", { className: "cart-items" },
            cartItems.map((item) =>
              React.createElement("div", { className: "cart-item", key: item.key },
                React.createElement("img", { src: item.image, alt: item.name }),
                React.createElement("div", null,
                  React.createElement("strong", null, item.name),
                  React.createElement("small", null, item.option),
                  React.createElement("span", null, formatMoney(item.amount))
                ),
                React.createElement("div", { className: "quantity-control" },
                  React.createElement("button", { onClick: () => updateQuantity(item.key, item.quantity - 1), "aria-label": "Decrease quantity" }, "-"),
                  React.createElement("span", null, item.quantity),
                  React.createElement("button", { onClick: () => updateQuantity(item.key, item.quantity + 1), "aria-label": "Increase quantity" }, "+")
                ),
                React.createElement("button", { className: "remove-button", onClick: () => removeItem(item.key) }, t.remove)
              )
            )
          ),
          React.createElement("div", { className: "cart-total" },
            React.createElement("span", null, t.subtotal),
            React.createElement("strong", null, formatMoney(cartSubtotal))
          ),
          React.createElement("button", {
            className: "checkout-button",
            onClick: () => {
              setCartOpen(false);
              setCheckoutOpen(true);
            },
          }, t.checkout),
          React.createElement("a", { href: "#best-sellers", onClick: () => setCartOpen(false) }, t.continue)
        )
      : React.createElement(React.Fragment, null,
          React.createElement("p", null, t.empty),
          React.createElement("a", { href: "#best-sellers", onClick: () => setCartOpen(false) }, t.continue)
        )
  );
}

function CheckoutModal({ t, cartItems, cartSubtotal, checkoutOpen, setCheckoutOpen, setCartOpen, orderResult, setOrderResult, setCartItems }) {
  const [form, setForm] = useState({
    email: "",
    name: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    notes: "",
    payment: "card",
  });
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  const update = (field, value) => setForm((current) => ({ ...current, [field]: value }));
  const close = () => {
    setCheckoutOpen(false);
    setError("");
    setStatus("idle");
    if (orderResult) setOrderResult(null);
  };
  const submitOrder = async (event) => {
    event.preventDefault();
    const required = ["email", "name", "phone", "address", "city", "state", "zip"];
    if (!cartItems.length || required.some((field) => !form[field].trim())) {
      setError(t.required);
      return;
    }
    setStatus("submitting");
    setError("");
    const order = {
      customer: form,
      items: cartItems,
      subtotal: Number(cartSubtotal.toFixed(2)),
      createdAt: new Date().toISOString(),
    };
    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(order),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Order failed");
      setOrderResult(data);
      setCartItems([]);
      setStatus("idle");
    } catch (err) {
      setError(err.message);
      setStatus("idle");
    }
  };

  return React.createElement("div", { className: checkoutOpen ? "checkout-modal open" : "checkout-modal" },
    React.createElement("form", { className: "checkout-panel", onSubmit: submitOrder },
      React.createElement("button", { type: "button", className: "drawer-close", onClick: close }, t.close),
      orderResult
        ? React.createElement("div", { className: "order-success" },
            React.createElement("h2", null, t.thankYou),
            React.createElement("p", null, `${t.orderReceived} #${orderResult.orderId}`),
            React.createElement("button", { type: "button", className: "checkout-button", onClick: close }, t.continue)
          )
        : React.createElement(React.Fragment, null,
            React.createElement("div", { className: "checkout-grid" },
              React.createElement("div", { className: "checkout-fields" },
                React.createElement("h2", null, t.checkout),
                React.createElement("h3", null, t.contact),
                React.createElement("input", { value: form.email, onChange: (e) => update("email", e.target.value), placeholder: t.email, type: "email" }),
                React.createElement("h3", null, t.delivery),
                React.createElement("input", { value: form.name, onChange: (e) => update("name", e.target.value), placeholder: t.customerName }),
                React.createElement("input", { value: form.phone, onChange: (e) => update("phone", e.target.value), placeholder: t.phone }),
                React.createElement("input", { value: form.address, onChange: (e) => update("address", e.target.value), placeholder: t.address }),
                React.createElement("div", { className: "checkout-row" },
                  React.createElement("input", { value: form.city, onChange: (e) => update("city", e.target.value), placeholder: t.city }),
                  React.createElement("input", { value: form.state, onChange: (e) => update("state", e.target.value), placeholder: t.state }),
                  React.createElement("input", { value: form.zip, onChange: (e) => update("zip", e.target.value), placeholder: t.zip })
                ),
                React.createElement("textarea", { value: form.notes, onChange: (e) => update("notes", e.target.value), placeholder: t.notes }),
                React.createElement("h3", null, t.payment),
                React.createElement("div", { className: "payment-options" },
                  [["card", t.card], ["paypal", t.paypal], ["shop", t.shopPay]].map(([value, label]) =>
                    React.createElement("label", { key: value, className: form.payment === value ? "selected" : "" },
                      React.createElement("input", { checked: form.payment === value, onChange: () => update("payment", value), type: "radio", name: "payment" }),
                      label
                    )
                  )
                ),
                error && React.createElement("p", { className: "checkout-error" }, error),
                React.createElement("button", { className: "checkout-button", disabled: status === "submitting" },
                  status === "submitting" ? t.submitting : t.completeOrder
                )
              ),
              React.createElement("aside", { className: "checkout-summary" },
                React.createElement("h3", null, t.orderSummary),
                cartItems.map((item) =>
                  React.createElement("div", { className: "summary-item", key: item.key },
                    React.createElement("span", null, `${item.name} x ${item.quantity}`),
                    React.createElement("strong", null, formatMoney(item.amount * item.quantity))
                  )
                ),
                React.createElement("div", { className: "cart-total" },
                  React.createElement("span", null, t.subtotal),
                  React.createElement("strong", null, formatMoney(cartSubtotal))
                ),
                React.createElement("button", { type: "button", onClick: () => { setCheckoutOpen(false); setCartOpen(true); } }, t.cart)
              )
            )
          )
    )
  );
}

function SearchOverlay({ t, searchOpen, setSearchOpen }) {
  return React.createElement("div", { className: searchOpen ? "search-modal open" : "search-modal" },
    React.createElement("div", null,
      React.createElement("button", { onClick: () => setSearchOpen(false) }, t.close),
      React.createElement("input", { autoFocus: searchOpen, placeholder: t.search }),
      React.createElement("p", null, "Rods / Reels / Lures / Lines")
    )
  );
}

function CookiePanel({ t, setCookieVisible }) {
  return React.createElement("aside", { className: "cookie-panel" },
    React.createElement("h3", null, t.cookieTitle),
    React.createElement("p", null, t.cookieBody),
    React.createElement("div", null,
      React.createElement("button", { onClick: () => setCookieVisible(false) }, t.accept),
      React.createElement("button", { onClick: () => setCookieVisible(false) }, t.decline)
    )
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(React.createElement(App));

function updateHeaderState() {
  const header = document.querySelector(".site-header");
  const hero = document.querySelector(".hero");
  if (!header || !hero) return;
  const threshold = hero.offsetTop + hero.offsetHeight / 2;
  header.classList.toggle("is-pinned", window.scrollY >= threshold);
}

window.addEventListener("scroll", updateHeaderState, { passive: true });
window.addEventListener("resize", updateHeaderState);
updateHeaderState();
