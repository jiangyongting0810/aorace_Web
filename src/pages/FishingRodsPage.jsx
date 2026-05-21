import { useMemo } from "react";
import { Link } from "react-router-dom";
import { assets, rodCategories, rodPieces, rodProducts } from "../data/content.js";
import { useCollectionFilters } from "../features/collections/useCollectionFilters.js";
import { formatMoney } from "../utils/format.js";

function FilterCheckbox({ checked, label, count, onChange }) {
  return (
    <label className="filter-option">
      <span className="filter-option-main">
        <input type="checkbox" checked={checked} onChange={onChange} />
        <span>{label}</span>
      </span>
      <span className="filter-count">{count}</span>
    </label>
  );
}

function AccordionFilter({ title, open, onToggle, children }) {
  return (
    <section className={open ? "accordion-filter open" : "accordion-filter"}>
      <button type="button" className="filter-heading" aria-expanded={open} onClick={onToggle}>
        <span>{title}</span>
        <span className="filter-arrow" aria-hidden="true">⌄</span>
      </button>
      <div className="accordion-panel">
        <div className="accordion-panel-inner">{children}</div>
      </div>
    </section>
  );
}

function FilterSidebar({
  lang,
  rodsCopy,
  inStockOnly,
  setInStockOnly,
  priceRange,
  updatePriceValue,
  selectedCategories,
  toggleCategory,
  selectedPieces,
  togglePiece,
  categoryCounts,
  pieceCounts,
  openPanels,
  togglePanel,
}) {
  return (
    <div className="filter-stack">
      <div className="filter-block">
        <div className="toggle-row">
          <span>{rodsCopy.inStockOnly}</span>
          <button
            type="button"
            className={inStockOnly ? "toggle-switch on" : "toggle-switch"}
            aria-pressed={inStockOnly}
            onClick={() => setInStockOnly((value) => !value)}
          >
            <span />
          </button>
        </div>
      </div>

      <div className="filter-block">
        <div className="filter-heading static">{rodsCopy.price}</div>
        <div className="range-slider">
          <div className="range-track" />
          <div
            className="range-progress"
            style={{
              left: `${(priceRange[0] / 250) * 100}%`,
              right: `${100 - (priceRange[1] / 250) * 100}%`,
            }}
          />
          <input
            type="range"
            min="0"
            max="250"
            value={priceRange[0]}
            onChange={(event) => updatePriceValue(0, Number(event.target.value))}
          />
          <input
            type="range"
            min="0"
            max="250"
            value={priceRange[1]}
            onChange={(event) => updatePriceValue(1, Number(event.target.value))}
          />
        </div>
        <div className="price-inputs">
          <label>
            <span>{rodsCopy.fromLabel}</span>
            <input
              type="number"
              min="0"
              max={priceRange[1]}
              value={priceRange[0]}
              onChange={(event) => updatePriceValue(0, Number(event.target.value))}
            />
          </label>
          <label>
            <span>{rodsCopy.toLabel}</span>
            <input
              type="number"
              min={priceRange[0]}
              max="250"
              value={priceRange[1]}
              onChange={(event) => updatePriceValue(1, Number(event.target.value))}
            />
          </label>
        </div>
      </div>

      <AccordionFilter title={rodsCopy.categories} open={openPanels.categories} onToggle={() => togglePanel("categories")}>
        {rodCategories.map((item) => (
          <FilterCheckbox
            key={item.value}
            checked={selectedCategories.includes(item.value)}
            label={lang === "en" ? item.en : item.zh}
            count={categoryCounts[item.value]}
            onChange={() => toggleCategory(item.value)}
          />
        ))}
      </AccordionFilter>

      <AccordionFilter title={rodsCopy.pieces} open={openPanels.pieces} onToggle={() => togglePanel("pieces")}>
        {rodPieces.map((item) => (
          <FilterCheckbox
            key={item.value}
            checked={selectedPieces.includes(item.value)}
            label={lang === "en" ? item.en : item.zh}
            count={pieceCounts[item.value]}
            onChange={() => togglePiece(item.value)}
          />
        ))}
      </AccordionFilter>
    </div>
  );
}

function RodCard({ product, rodsCopy, t, addToCart }) {
  const cartProduct = {
    ...product,
    amount: product.amount,
  };

  return (
    <article className="rod-card">
      <Link to={`/products/${product.id}`} className="rod-card-media">
        {product.compareAtAmount && <span className="rod-badge sale">{rodsCopy.onSale}</span>}
        {product.discountPercent && <span className="rod-badge discount">{`${product.discountPercent}% OFF`}</span>}
        <img src={product.image} alt={product.name} />
      </Link>
      <div className="rod-card-body">
        <Link to={`/products/${product.id}`} className="rod-card-title">{product.name}</Link>
        <p className={product.compareAtAmount ? "rod-card-price sale" : "rod-card-price"}>
          <span>{`${rodsCopy.pricePrefix} ${formatMoney(product.amount)}`}</span>
          {product.compareAtAmount && <del>{formatMoney(product.compareAtAmount)}</del>}
        </p>
        <div className="rod-rating" aria-label={`${product.rating} rating`}>
          <span className="rod-stars" aria-hidden="true">★★★★★</span>
          <span>{`${product.rating} (${product.reviews} ${rodsCopy.reviews})`}</span>
        </div>
        <button type="button" className="quick-add-button rod-quick-add" onClick={() => addToCart(cartProduct)}>
          {t.quick}
        </button>
      </div>
    </article>
  );
}

export function FishingRodsPage({ t, lang, addToCart }) {
  const rodsCopy = t.rodsPage;
  const {
    mobileFilterOpen,
    setMobileFilterOpen,
    sortOpen,
    setSortOpen,
    sortBy,
    setSortBy,
    inStockOnly,
    setInStockOnly,
    priceRange,
    selectedCategories,
    selectedSecondaryOptions: selectedPieces,
    openPanels,
    categoryCounts,
    secondaryCounts: pieceCounts,
    filteredProducts,
    updatePriceValue,
    toggleCategory,
    toggleSecondaryOption: togglePiece,
    togglePanel,
  } = useCollectionFilters({
    products: rodProducts,
    categories: rodCategories,
    secondaryOptions: rodPieces,
    secondaryPanelKey: "pieces",
    maxPrice: 250,
    matchesSecondary: (product, value) => product.pieces === value,
  });

  const sortOptions = useMemo(() => ([
    { value: "featured", label: rodsCopy.sortFeatured },
    { value: "best-selling", label: rodsCopy.sortBestSelling },
    { value: "price-low", label: rodsCopy.sortPriceLow },
    { value: "price-high", label: rodsCopy.sortPriceHigh },
  ]), [rodsCopy]);

  const activeSortLabel = sortOptions.find((option) => option.value === sortBy)?.label || rodsCopy.sortFeatured;

  return (
    <main>
      <section className="rods-hero">
        <div className="rods-hero-overlay" />
        <div className="rods-hero-content">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link to="/">{rodsCopy.breadcrumbHome}</Link>
            <span aria-hidden="true">/</span>
            <strong>{rodsCopy.breadcrumbCurrent}</strong>
          </nav>
          <h1>{rodsCopy.heroTitle}</h1>
          <p>{rodsCopy.heroBody}</p>
        </div>
      </section>

      <section className="rods-section section">
        <div className="content-container">
          <div className="rods-toolbar">
            <button
              type="button"
              className="filters-trigger"
              onClick={() => {
                if (window.innerWidth <= 1100) {
                  setMobileFilterOpen(true);
                }
              }}
            >
              <span className="filters-icon" aria-hidden="true">☰</span>
              <span>{rodsCopy.toolbarFilters}</span>
            </button>
            <p className="rods-toolbar-note">{rodsCopy.featuredCount}</p>
            <div className={sortOpen ? "sort-dropdown open" : "sort-dropdown"}>
              <button type="button" className="sort-trigger" aria-expanded={sortOpen} onClick={() => setSortOpen((open) => !open)}>
                <span className="sort-label">{`${rodsCopy.sortLabel}:`}</span>
                <strong>{activeSortLabel}</strong>
                <span className="sort-chevron" aria-hidden="true">⌄</span>
              </button>
              <div className="sort-menu">
                {sortOptions.map((option) => (
                  <button
                    type="button"
                    className={option.value === sortBy ? "sort-option active" : "sort-option"}
                    key={option.value}
                    onClick={() => {
                      setSortBy(option.value);
                      setSortOpen(false);
                    }}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="rods-layout">
            <aside className="rods-sidebar">
              <FilterSidebar
                lang={lang}
                rodsCopy={rodsCopy}
                inStockOnly={inStockOnly}
                setInStockOnly={setInStockOnly}
                priceRange={priceRange}
                updatePriceValue={updatePriceValue}
                selectedCategories={selectedCategories}
                toggleCategory={toggleCategory}
                selectedPieces={selectedPieces}
                togglePiece={togglePiece}
                categoryCounts={categoryCounts}
                pieceCounts={pieceCounts}
                openPanels={openPanels}
                togglePanel={togglePanel}
              />
            </aside>

            <div className="rods-results">
              <div className="rods-grid">
                {filteredProducts.length ? (
                  filteredProducts.map((product) => (
                    <RodCard key={product.id} product={product} rodsCopy={rodsCopy} t={t} addToCart={addToCart} />
                  ))
                ) : (
                  <div className="rods-empty">{rodsCopy.empty}</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className={mobileFilterOpen ? "filter-drawer-overlay open" : "filter-drawer-overlay"} onClick={() => setMobileFilterOpen(false)} />
      <aside className={mobileFilterOpen ? "filter-drawer open" : "filter-drawer"}>
        <div className="filter-drawer-header">
          <strong>{rodsCopy.toolbarFilters}</strong>
          <button type="button" onClick={() => setMobileFilterOpen(false)}>{t.close}</button>
        </div>
        <FilterSidebar
          lang={lang}
          rodsCopy={rodsCopy}
          inStockOnly={inStockOnly}
          setInStockOnly={setInStockOnly}
          priceRange={priceRange}
          updatePriceValue={updatePriceValue}
          selectedCategories={selectedCategories}
          toggleCategory={toggleCategory}
          selectedPieces={selectedPieces}
          togglePiece={togglePiece}
          categoryCounts={categoryCounts}
          pieceCounts={pieceCounts}
          openPanels={openPanels}
          togglePanel={togglePanel}
        />
        <button type="button" className="apply-filters-button" onClick={() => setMobileFilterOpen(false)}>
          {rodsCopy.applyFilters}
        </button>
      </aside>
    </main>
  );
}
