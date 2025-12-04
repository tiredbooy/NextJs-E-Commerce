"use client";

import FilterContent from "@/app/_components/products/filter/FilterContent";
import { Brand, Category, Color, Size } from "@/app/_lib/types/product_types";
import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import { SlidersHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";

// Store full objects like before
export interface FilterState {
  categories: Category[];
  brands: Brand[];
  sizes: Size[];
  colors: Color[];
  priceRange: {
    min: number;
    max: number;
  };
  // inStock: boolean;
  // onSale: boolean;
  search: string;
}

interface Props {
  onFilterChange?: (filters: FilterState) => void;
  initialFilters?: Partial<FilterState>;
  availableCategories?: Category[];
  availableBrands?: Brand[];
  availableSizes?: Size[];
  availableColors?: Color[];
}

const FilterBar: React.FC<Props> = ({
  onFilterChange,
  initialFilters,
  availableCategories = [],
  availableBrands = [],
  availableSizes = [],
  availableColors = [],
}) => {
  const router = useRouter();
  const [filters, setFilters] = useState<FilterState>({
    categories: initialFilters?.categories || [],
    brands: initialFilters?.brands || [],
    sizes: initialFilters?.sizes || [],
    colors: initialFilters?.colors || [],
    priceRange: initialFilters?.priceRange || { min: 0, max: 100000 },
    // inStock: initialFilters?.inStock || false,
    // onSale: initialFilters?.onSale || false,
    search: initialFilters?.search || "",
  });

  const updateURLParams = (filters: FilterState) => {
    const params = new URLSearchParams();
    if (filters.search) params.set("search", filters.search);
    if (filters.categories.length)
      params.set(
        "categories",
        filters.categories.map((c) => c.title?.toLowerCase()).join(",")
      );
    if (filters.brands.length)
      params.set(
        "brands",
        filters.brands.map((b) => b.title?.toLowerCase()).join(",")
      );
    if (filters.sizes.length)
      params.set(
        "sizes",
        filters.sizes.map((s) => s.size?.toLowerCase()).join(",")
      );
    if (filters.colors.length)
      params.set(
        "colors",
        filters.colors.map((c) => c.title?.toLowerCase()).join(",")
      );

    if (filters.priceRange.min > 0)
      params.set("minPrice", filters.priceRange.min.toString());
    if (filters.priceRange.max < 100000)
      params.set("maxPrice", filters.priceRange.max.toString());

    // if (filters.inStock) params.set("inStock", "true");
    // if (filters.onSale) params.set("onSale", "true");

    const newURL = `${window.location.pathname}${
      params.toString() ? `?${params.toString()}` : ""
    }`;

    router.push(newURL, { scroll: false });
  };

  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const updateFilters = useCallback(
    (newFilters: FilterState) => {
      setFilters(newFilters);
      updateURLParams(newFilters);
      onFilterChange?.(newFilters);
    },
    [onFilterChange]
  );

  // Fixed: Compare by ID, not by object reference
  const toggleArrayFilter = useCallback(
    (
      key: "categories" | "brands" | "sizes" | "colors",
      item: Category | Brand | Size | Color
    ) => {
      const currentArray = filters[key];
      const exists = currentArray.some((i) => i.id === item.id);

      const newArray = exists
        ? currentArray.filter((i) => i.id !== item.id)
        : [...currentArray, item];

      updateFilters({ ...filters, [key]: newArray } as FilterState);
    },
    [filters, updateFilters]
  );

  const setSingleFilter = useCallback(
    (key: "categories" | "brands", item: Category | Brand | null) => {
      // If item is null, clear the filter. Otherwise, set array to just this one item
      const newArray = item ? [item] : [];
      updateFilters({ ...filters, [key]: newArray } as FilterState);
    },
    [filters, updateFilters]
  );

  const updatePriceRange = useCallback(
    (range: { min: number; max: number }) => {
      updateFilters({ ...filters, priceRange: range });
    },
    [filters, updateFilters]
  );

  const updateSearch = useCallback(
    (search: string) => {
      updateFilters({ ...filters, search });
    },
    [filters, updateFilters]
  );

  const clearAllFilters = useCallback(() => {
    const clearedFilters: FilterState = {
      categories: [],
      brands: [],
      sizes: [],
      colors: [],
      priceRange: { min: 0, max: 100000 },
      search: "",
    };
    updateFilters(clearedFilters);
  }, [updateFilters]);

  const activeFilterCount = useMemo(() => {
    const isPriceRangeActive =
      filters.priceRange.min > 0 ||
      (filters.priceRange.max > 0 && filters.priceRange.max < 20000);

    return (
      filters.categories.length +
      filters.brands.length +
      filters.sizes.length +
      filters.colors.length +
      (isPriceRangeActive ? 1 : 0) +
      (filters.search ? 1 : 0)
    );
  }, [filters]);

  return (
    <>
      {/* Mobile Filter Toggle Button - Sticky Bottom */}
      <div className="lg:hidden fixed bottom-20 right-4 z-50">
        <Button
          onClick={() => setIsMobileOpen(true)}
          variant="default"
          className="h-14 w-14 rounded-full shadow-lg shadow-black/20 hover:shadow-black/30 transition-all duration-200 hover:scale-105 active:scale-95 text-background font-semibold"
        >
          <div className="flex flex-col items-center justify-center gap-0.5">
            <SlidersHorizontal className="w-6 h-6" />
            {activeFilterCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground text-xs font-bold min-w-5 h-5 flex items-center justify-center rounded-full px-1">
                {activeFilterCount}
              </span>
            )}
          </div>
        </Button>
      </div>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Mobile Drawer */}
      <AnimatePresence mode="wait">
        {isMobileOpen && (
          <motion.div
            key="mobile-drawer"
            initial={{ x: "-100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "-100%", opacity: 0 }}
            transition={{
              duration: 0.35,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            className="fixed top-0 left-0 bottom-0 w-[85vw] bg-background z-50 shadow-lg lg:hidden border-r"
          >
            <FilterContent
              filters={filters}
              activeFilterCount={activeFilterCount}
              clearAllFilters={clearAllFilters}
              toggleArrayFilter={toggleArrayFilter}
              setSingleFilter={setSingleFilter}
              updatePriceRange={updatePriceRange}
              updateSearch={updateSearch}
              availableCategories={availableCategories}
              availableBrands={availableBrands}
              availableSizes={availableSizes}
              availableColors={availableColors}
              onClose={() => setIsMobileOpen(false)}
              isMobile={true}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <div className="border border-border bg-card rounded-lg overflow-hidden shadow-sm">
          <FilterContent
            filters={filters}
            activeFilterCount={activeFilterCount}
            clearAllFilters={clearAllFilters}
            toggleArrayFilter={toggleArrayFilter}
            setSingleFilter={setSingleFilter}
            updatePriceRange={updatePriceRange}
            updateSearch={updateSearch}
            availableCategories={availableCategories}
            availableBrands={availableBrands}
            availableSizes={availableSizes}
            availableColors={availableColors}
            onClose={() => setIsMobileOpen(false)}
            isMobile={true}
          />
        </div>
      </div>
    </>
  );
};

export default FilterBar;
