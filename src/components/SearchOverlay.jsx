import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { blogs, categories, products } from "../data/content.js";

export function SearchOverlay({ t, lang, searchOpen, setSearchOpen }) {
  const [query, setQuery] = useState("");
  const normalizedQuery = query.trim().toLowerCase();
  const results = useMemo(() => {
    if (!normalizedQuery) return [];

    const productResults = products
      .filter((product) => product.name.toLowerCase().includes(normalizedQuery))
      .map((product) => ({ type: t.bestTitle, label: product.name, to: `/products/${product.id}` }));

    const categoryResults = categories
      .filter((category) => [category.en, category.zh].some((label) => label.toLowerCase().includes(normalizedQuery)))
      .map((category) => ({ type: t.categoriesTitle, label: lang === "en" ? category.en : category.zh, to: "/#best-sellers" }));

    const blogResults = blogs
      .filter((blog) => [blog.title, blog.zh].some((label) => label.toLowerCase().includes(normalizedQuery)))
      .map((blog) => ({ type: t.experienceTitle, label: lang === "en" ? blog.title : blog.zh, to: `/stories/${blog.slug}` }));

    return [...productResults, ...categoryResults, ...blogResults].slice(0, 8);
  }, [lang, normalizedQuery, t]);

  const close = () => {
    setSearchOpen(false);
    setQuery("");
  };

  return (
    <div className={searchOpen ? "search-modal open" : "search-modal"}>
      <div>
        <button onClick={close}>{t.close}</button>
        <input
          autoFocus={searchOpen}
          placeholder={t.search}
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        {results.length ? (
          <div className="search-results">
            {results.map((result) => (
              <Link to={result.to} key={`${result.type}-${result.label}`} onClick={close}>
                <span>{result.type}</span>
                <strong>{result.label}</strong>
              </Link>
            ))}
          </div>
        ) : (
          <p>Rods / Reels / Lures / Lines</p>
        )}
      </div>
    </div>
  );
}
