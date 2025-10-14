// components/filter-bar/FilterContent.tsx
import { useState } from "react";
import { SlidersHorizontal, Search, X } from "lucide-react";
import {
  FilterState,
  FilterOption,
} from "@/app/_components/products/filter/FilterBar";
import CollapsibleSection from "@/app/_components/products/filter/CollapsibleSection";
import Checkbox from "@/app/_components/products/filter/Checkbox";
import PriceRangeFilter from "@/app/_components/products/filter/PriceRangeFilter";
import ActiveFilterBadge from "@/app/_components/products/filter/ActiveFilterBadge";

interface FilterContentProps {
  filters: FilterState;
  activeFilterCount: number;
  clearAllFilters: () => void;
  updateFilters: (newFilters: FilterState) => void;
  toggleArrayFilter: (
    key: keyof Pick<FilterState, "categories" | "brands" | "sizes" | "colors">,
    value: string
  ) => void;
  toggleBooleanFilter: (key: "inStock" | "onSale") => void;
  updatePriceRange: (range: { min: number; max: number }) => void;
  categories: FilterOption[];
  brands: FilterOption[];
  sizes: FilterOption[];
  colors: FilterOption[];
}

const FilterContent: React.FC<FilterContentProps> = ({
  filters,
  activeFilterCount,
  clearAllFilters,
  updateFilters,
  toggleArrayFilter,
  toggleBooleanFilter,
  updatePriceRange,
  categories,
  brands,
  sizes,
  colors,
}) => {
  const [searchInput, setSearchInput] = useState(filters.search);

  // Handle search
  const handleSearch = () => {
    updateFilters({ ...filters, search: searchInput });
  };

  return (
    <>
      {/* Header */}
      <div className="px-4 py-3 border-b border-divider bg-muted/30">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-foreground flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4" />
            Filters
            {activeFilterCount > 0 && (
              <span className="bg-primary text-primary-foreground text-xs px-2 py-0.5 rounded-full">
                {activeFilterCount}
              </span>
            )}
          </h2>
          {activeFilterCount > 0 && (
            <button
              onClick={clearAllFilters}
              className="text-xs text-link hover:text-link-hover transition-colors"
            >
              Clear all
            </button>
          )}
        </div>
      </div>

      {/* Search */}
      <div className="px-4 py-4 border-b border-divider">
        <div className="relative">
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            placeholder="Search products..."
            className="w-full pl-9 pr-3 py-2 text-sm border border-input rounded bg-background focus:border-border-focus focus:ring-1 focus:ring-ring outline-none"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          {searchInput && (
            <button
              onClick={() => {
                setSearchInput("");
                updateFilters({ ...filters, search: "" });
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Active Filters */}
      {activeFilterCount > 0 && (
        <div className="px-4 py-3 border-b border-divider bg-muted/20">
          <div className="flex flex-wrap gap-2 overflow-y-auto max-h-24">
            {filters.search && (
              <ActiveFilterBadge
                label={`Search: ${filters.search}`}
                onRemove={() => {
                  setSearchInput("");
                  updateFilters({ ...filters, search: "" });
                }}
              />
            )}
            {filters?.categories?.map((cat) => (
              <ActiveFilterBadge
                key={cat}
                label={categories.find((c) => c.id === cat)?.label || cat}
                onRemove={() => toggleArrayFilter("categories", cat)}
              />
            ))}
            {filters?.brands?.map((brand) => (
              <ActiveFilterBadge
                key={brand}
                label={brands.find((b) => b.id === brand)?.label || brand}
                onRemove={() => toggleArrayFilter("brands", brand)}
              />
            ))}
            {filters?.sizes?.map((size) => (
              <ActiveFilterBadge
                key={size}
                label={sizes.find((s) => s.id === size)?.label || size}
                onRemove={() => toggleArrayFilter("sizes", size)}
              />
            ))}
            {filters?.colors?.map((color) => (
              <ActiveFilterBadge
                key={color}
                label={colors.find((c) => c.id === color)?.label || color}
                onRemove={() => toggleArrayFilter("colors", color)}
              />
            ))}
            {(filters?.priceRange?.min > 0 ||
              filters?.priceRange?.max < 1000) && (
              <ActiveFilterBadge
                label={`$${filters.priceRange.min}-$${filters.priceRange.max}`}
                onRemove={() => updatePriceRange({ min: 0, max: 1000 })}
              />
            )}
            {filters?.inStock && (
              <ActiveFilterBadge
                label="In Stock"
                onRemove={() => toggleBooleanFilter("inStock")}
              />
            )}
            {filters?.onSale && (
              <ActiveFilterBadge
                label="On Sale"
                onRemove={() => toggleBooleanFilter("onSale")}
              />
            )}
          </div>
        </div>
      )}

      {/* Filter Options */}
      <div className="px-4 overflow-y-auto max-h-[calc(100vh-300px)] lg:max-h-none">
        {/* Quick Filters */}
        <CollapsibleSection title="Quick Filters">
          <Checkbox
            id="in-stock"
            label="In Stock Only"
            checked={filters.inStock}
            onChange={() => toggleBooleanFilter("inStock")}
          />
          <Checkbox
            id="on-sale"
            label="On Sale"
            checked={filters.onSale}
            onChange={() => toggleBooleanFilter("onSale")}
          />
        </CollapsibleSection>

        {/* Categories */}
        <CollapsibleSection title="Categories">
          {categories.map((category) => (
            <Checkbox
              key={category.id}
              id={`cat-${category.id}`}
              label={category.label}
              count={category.count}
              checked={filters.categories.includes(category.id)}
              onChange={() => toggleArrayFilter("categories", category.id)}
            />
          ))}
        </CollapsibleSection>

        {/* Brands */}
        <CollapsibleSection title="Brands">
          {brands.map((brand) => (
            <Checkbox
              key={brand.id}
              id={`brand-${brand.id}`}
              label={brand.label}
              count={brand.count}
              checked={filters.brands.includes(brand.id)}
              onChange={() => toggleArrayFilter("brands", brand.id)}
            />
          ))}
        </CollapsibleSection>

        {/* Price Range */}
        <CollapsibleSection title="Price Range">
          <PriceRangeFilter
            value={filters.priceRange}
            onChange={updatePriceRange}
          />
        </CollapsibleSection>

        {/* Sizes */}
        <CollapsibleSection title="Sizes" defaultOpen={false}>
          <div className="grid grid-cols-5 gap-2">
            {sizes.map((size) => (
              <button
                key={size.id}
                onClick={() => toggleArrayFilter("sizes", size.id)}
                className={`px-3 py-2 text-sm border rounded transition-colors ${
                  filters.sizes.includes(size.id)
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-background border-border hover:border-border-hover"
                }`}
              >
                {size.label}
              </button>
            ))}
          </div>
        </CollapsibleSection>

        {/* Colors */}
        <CollapsibleSection title="Colors" defaultOpen={false}>
          {colors.map((color) => (
            <Checkbox
              key={color.id}
              id={`color-${color.id}`}
              label={color.label}
              checked={filters.colors.includes(color.id)}
              onChange={() => toggleArrayFilter("colors", color.id)}
            />
          ))}
        </CollapsibleSection>
      </div>
    </>
  );
};

export default FilterContent;
