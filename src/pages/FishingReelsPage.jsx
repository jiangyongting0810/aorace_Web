import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ReelsFAQ } from "../components/ReelsFAQ.jsx";
import { ReelQuickAddModal } from "../components/ReelQuickAddModal.jsx";
import { ReelsSEOContent } from "../components/ReelsSEOContent.jsx";
import { reelCategories, reelProducts, reelSizes } from "../data/content.js";
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
  reelsCopy,
  inStockOnly,
  setInStockOnly,
  priceRange,
  updatePriceValue,
  selectedCategories,
  toggleCategory,
  selectedSizes,
  toggleSize,
  categoryCounts,
  sizeCounts,
  openPanels,
  togglePanel,
}) {
  return (
    <div className="filter-stack">
      <div className="filter-block">
        <div className="toggle-row">
          <span>{reelsCopy.inStockOnly}</span>
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
        <div className="filter-heading static">{reelsCopy.price}</div>
        <div className="range-slider">
          <div className="range-track" />
          <div
            className="range-progress"
            style={{
              left: `${(priceRange[0] / 150) * 100}%`,
              right: `${100 - (priceRange[1] / 150) * 100}%`,
            }}
          />
          <input
            type="range"
            min="0"
            max="150"
            value={priceRange[0]}
            onChange={(event) => updatePriceValue(0, Number(event.target.value))}
          />
          <input
            type="range"
            min="0"
            max="150"
            value={priceRange[1]}
            onChange={(event) => updatePriceValue(1, Number(event.target.value))}
          />
        </div>
        <div className="price-inputs">
          <label>
            <span>{reelsCopy.fromLabel}</span>
            <input
              type="number"
              min="0"
              max={priceRange[1]}
              value={priceRange[0]}
              onChange={(event) => updatePriceValue(0, Number(event.target.value))}
            />
          </label>
          <label>
            <span>{reelsCopy.toLabel}</span>
            <input
              type="number"
              min={priceRange[0]}
              max="150"
              value={priceRange[1]}
              onChange={(event) => updatePriceValue(1, Number(event.target.value))}
            />
          </label>
        </div>
      </div>

      <AccordionFilter title={reelsCopy.categories} open={openPanels.categories} onToggle={() => togglePanel("categories")}>
        {reelCategories.map((item) => (
          <FilterCheckbox
            key={item.value}
            checked={selectedCategories.includes(item.value)}
            label={lang === "en" ? item.en : item.zh}
            count={categoryCounts[item.value]}
            onChange={() => toggleCategory(item.value)}
          />
        ))}
      </AccordionFilter>

      <AccordionFilter title={reelsCopy.sizes} open={openPanels.sizes} onToggle={() => togglePanel("sizes")}>
        {reelSizes.map((item) => (
          <FilterCheckbox
            key={item.value}
            checked={selectedSizes.includes(String(item.value))}
            label={lang === "en" ? item.en : item.zh}
            count={sizeCounts[item.value]}
            onChange={() => toggleSize(String(item.value))}
          />
        ))}
      </AccordionFilter>
    </div>
  );
}

function ReelCard({ product, reelsCopy, t, openQuickAdd }) {
  return (
    <article className="rod-card reel-card">
      <Link to={`/products/${product.id}`} className="rod-card-media reel-card-media">
        {product.compareAtAmount && <span className="rod-badge sale">{reelsCopy.onSale}</span>}
        {product.discountPercent && <span className="rod-badge discount">{`${product.discountPercent}% OFF`}</span>}
        <div className={product.secondaryImageMode === "detail" ? "reel-card-images detail-mode" : "reel-card-images"}>
          <img className="reel-image primary" src={product.primaryImage} alt={product.name} />
          <img className="reel-image secondary" src={product.secondaryImage || product.primaryImage} alt={`${product.name} detail`} />
        </div>
      </Link>
      <div className="rod-card-body reel-card-body">
        <Link to={`/products/${product.id}`} className="rod-card-title">{product.name}</Link>
        <small className="reel-variant-hint">
          {product.variantHint === "multiple" ? reelsCopy.variantMultiple : reelsCopy.variantSingle}
        </small>
        <p className={product.compareAtAmount ? "rod-card-price sale" : "rod-card-price"}>
          <span>{`${reelsCopy.pricePrefix} ${formatMoney(product.amount)}`}</span>
          {product.compareAtAmount && <del>{formatMoney(product.compareAtAmount)}</del>}
        </p>
        <div className="rod-rating" aria-label={`${product.rating} rating`}>
          <span className="rod-stars" aria-hidden="true">★★★★★</span>
          <span>{`${product.rating} (${product.reviews} ${reelsCopy.reviews})`}</span>
        </div>
        <button type="button" className="quick-add-button rod-quick-add" onClick={() => openQuickAdd(product)}>
          {t.quick}
        </button>
      </div>
    </article>
  );
}

export function FishingReelsPage({ t, lang, addToCart }) {
  const reelsCopy = t.reelsPage || t.rodsPage;
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
    selectedSecondaryOptions: selectedSizes,
    openPanels,
    categoryCounts,
    secondaryCounts: sizeCounts,
    filteredProducts,
    updatePriceValue,
    toggleCategory,
    toggleSecondaryOption: toggleSize,
    togglePanel,
  } = useCollectionFilters({
    products: reelProducts,
    categories: reelCategories,
    secondaryOptions: reelSizes,
    secondaryPanelKey: "sizes",
    maxPrice: 150,
    matchesSecondary: (product, value) => product.sizeOptions.includes(value),
  });
  const [quickAddProduct, setQuickAddProduct] = useState(null);

  const sortOptions = useMemo(() => ([
    { value: "featured", label: reelsCopy.sortFeatured },
    { value: "best-selling", label: reelsCopy.sortBestSelling },
    { value: "price-low", label: reelsCopy.sortPriceLow },
    { value: "price-high", label: reelsCopy.sortPriceHigh },
  ]), [reelsCopy]);

  const activeSortLabel = sortOptions.find((option) => option.value === sortBy)?.label || reelsCopy.sortFeatured;

  const confirmQuickAdd = ({ hand, size }) => {
    const option = `${hand} / ${size}`;
    addToCart(
      {
        ...quickAddProduct,
        image: quickAddProduct.primaryImage,
        options: [option],
      },
      option
    );
    setQuickAddProduct(null);
  };

  return (
    <main>
      <section className="reels-hero">
        <div className="rods-hero-overlay" />
        <div className="rods-hero-content">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link to="/">{reelsCopy.breadcrumbHome}</Link>
            <span aria-hidden="true">/</span>
            <strong>{reelsCopy.breadcrumbCurrent}</strong>
          </nav>
          <h1>{reelsCopy.heroTitle}</h1>
          <p>{reelsCopy.heroBody}</p>
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
              <span>{reelsCopy.toolbarFilters}</span>
            </button>
            <p className="rods-toolbar-note">{reelsCopy.featuredCount}</p>
            <div className={sortOpen ? "sort-dropdown open" : "sort-dropdown"}>
              <button type="button" className="sort-trigger" aria-expanded={sortOpen} onClick={() => setSortOpen((open) => !open)}>
                <span className="sort-label">{`${reelsCopy.sortLabel}:`}</span>
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
                reelsCopy={reelsCopy}
                inStockOnly={inStockOnly}
                setInStockOnly={setInStockOnly}
                priceRange={priceRange}
                updatePriceValue={updatePriceValue}
                selectedCategories={selectedCategories}
                toggleCategory={toggleCategory}
                selectedSizes={selectedSizes}
                toggleSize={toggleSize}
                categoryCounts={categoryCounts}
                sizeCounts={sizeCounts}
                openPanels={openPanels}
                togglePanel={togglePanel}
              />
            </aside>

            <div className="rods-results">
              <div className="rods-grid">
                {filteredProducts.length ? (
                  filteredProducts.map((product) => (
                    <ReelCard
                      key={product.id}
                      product={product}
                      reelsCopy={reelsCopy}
                      t={t}
                      openQuickAdd={setQuickAddProduct}
                    />
                  ))
                ) : (
                  <div className="rods-empty">{reelsCopy.empty}</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <ReelsFAQ title={reelsCopy.faqTitle} intro={reelsCopy.faqIntro} items={reelsCopy.faq} />
      <ReelsSEOContent title={reelsCopy.seoTitle} content={reelsCopy.seoContent} />

      <div className={mobileFilterOpen ? "filter-drawer-overlay open" : "filter-drawer-overlay"} onClick={() => setMobileFilterOpen(false)} />
      <aside className={mobileFilterOpen ? "filter-drawer open" : "filter-drawer"}>
        <div className="filter-drawer-header">
          <strong>{reelsCopy.toolbarFilters}</strong>
          <button type="button" onClick={() => setMobileFilterOpen(false)}>{t.close}</button>
        </div>
        <FilterSidebar
          lang={lang}
          reelsCopy={reelsCopy}
          inStockOnly={inStockOnly}
          setInStockOnly={setInStockOnly}
          priceRange={priceRange}
          updatePriceValue={updatePriceValue}
          selectedCategories={selectedCategories}
          toggleCategory={toggleCategory}
          selectedSizes={selectedSizes}
          toggleSize={toggleSize}
          categoryCounts={categoryCounts}
          sizeCounts={sizeCounts}
          openPanels={openPanels}
          togglePanel={togglePanel}
        />
        <button type="button" className="apply-filters-button" onClick={() => setMobileFilterOpen(false)}>
          {reelsCopy.applyFilters}
        </button>
      </aside>

      <ReelQuickAddModal
        product={quickAddProduct}
        reelsCopy={reelsCopy}
        open={Boolean(quickAddProduct)}
        onClose={() => setQuickAddProduct(null)}
        onConfirm={confirmQuickAdd}
      />
    </main>
  );
}
