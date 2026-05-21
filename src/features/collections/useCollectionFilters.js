import { useMemo, useState } from "react";

export function useCollectionFilters({
  products,
  categories,
  secondaryOptions,
  secondaryPanelKey,
  maxPrice,
  matchesSecondary,
}) {
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);
  const [sortBy, setSortBy] = useState("featured");
  const [inStockOnly, setInStockOnly] = useState(false);
  const [priceRange, setPriceRange] = useState([0, maxPrice]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSecondaryOptions, setSelectedSecondaryOptions] = useState([]);
  const [openPanels, setOpenPanels] = useState({
    categories: true,
    [secondaryPanelKey]: true,
  });

  const categoryCounts = useMemo(
    () => categories.reduce((acc, item) => ({
      ...acc,
      [item.value]: products.filter((product) => product.category === item.value).length,
    }), {}),
    [categories, products]
  );

  const secondaryCounts = useMemo(
    () => secondaryOptions.reduce((acc, item) => {
      const value = String(item.value);
      return {
        ...acc,
        [item.value]: products.filter((product) => matchesSecondary(product, value)).length,
      };
    }, {}),
    [matchesSecondary, products, secondaryOptions]
  );

  const filteredProducts = useMemo(() => {
    let nextProducts = products.filter((product) => {
      if (inStockOnly && !product.inStock) return false;
      if (product.amount < priceRange[0] || product.amount > priceRange[1]) return false;
      if (selectedCategories.length && !selectedCategories.includes(product.category)) return false;
      if (selectedSecondaryOptions.length && !selectedSecondaryOptions.some((value) => matchesSecondary(product, value))) return false;
      return true;
    });

    if (sortBy === "best-selling") {
      nextProducts = [...nextProducts].sort((a, b) => b.reviews - a.reviews);
    } else if (sortBy === "price-low") {
      nextProducts = [...nextProducts].sort((a, b) => a.amount - b.amount);
    } else if (sortBy === "price-high") {
      nextProducts = [...nextProducts].sort((a, b) => b.amount - a.amount);
    }

    return nextProducts;
  }, [inStockOnly, matchesSecondary, priceRange, products, selectedCategories, selectedSecondaryOptions, sortBy]);

  const updatePriceValue = (index, nextValue) => {
    const safeValue = Number.isFinite(nextValue) ? nextValue : 0;
    if (index === 0) {
      setPriceRange((current) => [Math.max(0, Math.min(safeValue, current[1])), current[1]]);
      return;
    }
    setPriceRange((current) => [current[0], Math.min(maxPrice, Math.max(safeValue, current[0]))]);
  };

  const toggleCategory = (value) => {
    setSelectedCategories((current) =>
      current.includes(value) ? current.filter((item) => item !== value) : [...current, value]
    );
  };

  const toggleSecondaryOption = (value) => {
    setSelectedSecondaryOptions((current) =>
      current.includes(value) ? current.filter((item) => item !== value) : [...current, value]
    );
  };

  const togglePanel = (panel) => {
    setOpenPanels((current) => ({ ...current, [panel]: !current[panel] }));
  };

  return {
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
    selectedSecondaryOptions,
    openPanels,
    categoryCounts,
    secondaryCounts,
    filteredProducts,
    updatePriceValue,
    toggleCategory,
    toggleSecondaryOption,
    togglePanel,
  };
}
