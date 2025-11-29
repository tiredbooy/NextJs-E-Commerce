import { FilterState } from "@/app/_components/products/filter/FilterBar";
import Checkbox from "@/app/_components/products/filter/Checkbox";
import CollapsibleSection from "@/app/_components/products/filter/CollapsibleSection";
import PriceRangeFilter from "@/app/_components/products/filter/PriceRangeFilter";
import { Brand, Category, Color, Size } from "@/app/_lib/types/product_types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { useState } from "react";
import { Label } from "@/components/ui/label";

interface FilterContentProps {
  filters: FilterState;
  activeFilterCount: number;
  clearAllFilters: () => void;
  toggleArrayFilter: (
    key: "categories" | "brands" | "sizes" | "colors",
    item: Category | Brand | Size | Color
  ) => void;
  setSingleFilter: (
    key: "categories" | "brands",
    item: Category | Brand | null
  ) => void;
  // toggleBooleanFilter: (key: "inStock" | "onSale") => void;
  updatePriceRange: (range: { min: number; max: number }) => void;
  updateSearch: (search: string) => void;
  availableCategories: Category[];
  availableBrands: Brand[];
  availableSizes: Size[];
  availableColors: Color[];
  onClose?: () => void;
  isMobile?: boolean;
}

const FilterContent: React.FC<FilterContentProps> = ({
  filters,
  activeFilterCount,
  clearAllFilters,
  toggleArrayFilter,
  setSingleFilter,
  // toggleBooleanFilter,
  updatePriceRange,
  updateSearch,
  availableCategories,
  availableBrands,
  availableSizes,
  availableColors,
  onClose,
  isMobile = false,
}) => {
  const [searchInput, setSearchInput] = useState(filters.search);

  const handleSearch = () => {
    updateSearch(searchInput);
  };

  const handleCategoryChange = (categoryId: string) => {
    const category = availableCategories.find(
      (c) => c.id === Number(categoryId)
    );
    if (category) {
      // If clicking the same category, deselect it
      const isSameCategory = filters.categories[0]?.id === Number(categoryId);
      setSingleFilter("categories", isSameCategory ? null : category);
    }
  };

  const handleBrandChange = (brandId: string) => {
    const brand = availableBrands.find((b) => b.id === Number(brandId));
    if (brand) {
      // If clicking the same brand, deselect it
      const isSameBrand = filters.brands[0]?.id === Number(brandId);
      setSingleFilter("brands", isSameBrand ? null : brand);
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="px-4 py-3 border-b border-divider bg-muted/30">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-foreground flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4" />
            Filters
            {activeFilterCount > 0 && (
              <Badge variant="default" className="ml-1">
                {activeFilterCount}
              </Badge>
            )}
          </h2>
          <div className="flex items-center gap-2">
            {activeFilterCount > 0 && (
              <Button
                onClick={clearAllFilters}
                variant="ghost"
                size="sm"
                className="text-xs h-auto py-1"
              >
                Clear all
              </Button>
            )}
            {isMobile && onClose && (
              <Button
                onClick={onClose}
                variant="ghost"
                size="icon"
                className="h-8 w-8"
              >
                <X className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="px-4 py-4 border-b border-divider">
        <div className="relative">
          <Input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            placeholder="Search products..."
            className="pl-9"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          {searchInput && (
            <Button
              onClick={() => {
                setSearchInput("");
                updateSearch("");
              }}
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
            >
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Active Filters */}
      {activeFilterCount > 0 && (
        <div className="px-4 py-3 border-b border-divider bg-muted/20">
          <div className="flex flex-wrap gap-2 overflow-y-auto max-h-24">
            {filters.search && (
              <Badge variant="secondary" className="gap-1">
                Search: {filters.search}
                <button
                  onClick={() => {
                    setSearchInput("");
                    updateSearch("");
                  }}
                  className="ml-1 hover:bg-muted-foreground/20 rounded-full"
                >
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            )}

            {filters.categories.map((cat) => (
              <Badge key={cat.id} variant="secondary" className="gap-1">
                {cat.title}
                <button
                  onClick={() => setSingleFilter("categories", null)}
                  className="ml-1 hover:bg-muted-foreground/20 rounded-full"
                >
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            ))}

            {filters.brands.map((brand) => (
              <Badge key={brand.id} variant="secondary" className="gap-1">
                {brand.title}
                <button
                  onClick={() => setSingleFilter("brands", null)}
                  className="ml-1 hover:bg-muted-foreground/20 rounded-full"
                >
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            ))}

            {filters.sizes.map((size) => (
              <Badge key={size.id} variant="secondary" className="gap-1">
                {size.size}
                <button
                  onClick={() => toggleArrayFilter("sizes", size)}
                  className="ml-1 hover:bg-muted-foreground/20 rounded-full"
                >
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            ))}

            {filters.colors.map((color) => (
              <Badge key={color.id} variant="secondary" className="gap-1">
                {color.title}
                <button
                  onClick={() => toggleArrayFilter("colors", color)}
                  className="ml-1 hover:bg-muted-foreground/20 rounded-full"
                >
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            ))}

            {(filters.priceRange.min > 0 || filters.priceRange.max < 20000) && (
              <Badge variant="secondary" className="gap-1">
                ${filters.priceRange.min} - ${filters.priceRange.max}
                <button
                  onClick={() => updatePriceRange({ min: 0, max: 20000 })}
                  className="ml-1 hover:bg-muted-foreground/20 rounded-full"
                >
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            )}

            {/* {filters.inStock && (
              <Badge variant="secondary" className="gap-1">
                In Stock
                <button
                  onClick={() => toggleBooleanFilter("inStock")}
                  className="ml-1 hover:bg-muted-foreground/20 rounded-full"
                >
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            )}

            {filters.onSale && (
              <Badge variant="secondary" className="gap-1">
                On Sale
                <button
                  onClick={() => toggleBooleanFilter("onSale")}
                  className="ml-1 hover:bg-muted-foreground/20 rounded-full"
                >
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            )} */}
          </div>
        </div>
      )}

      {/* Filter Options - Scrollable */}
      <div className="flex-1 overflow-y-auto px-4">
        {/* Quick Filters */}
        {/* <CollapsibleSection title="Quick Filters">
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
        </CollapsibleSection> */}

        {/* Categories - Radio Group */}
        {availableCategories.length > 0 && (
          <CollapsibleSection title="Categories">
            <RadioGroup
              value={filters.categories[0]?.id || ""}
              onValueChange={handleCategoryChange}
            >
              {availableCategories.map((category) => (
                <div key={category.id} className="flex items-center space-x-2">
                  <RadioGroupItem
                    value={category.id}
                    id={`cat-${category.id}`}
                  />
                  <Label
                    htmlFor={`cat-${category.id}`}
                    className="cursor-pointer flex-1"
                  >
                    {category.title}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </CollapsibleSection>
        )}

        {/* Brands - Radio Group */}
        {availableBrands.length > 0 && (
          <CollapsibleSection title="Brands">
            <RadioGroup
              value={filters.brands[0]?.id || ""}
              onValueChange={handleBrandChange}
            >
              {availableBrands.map((brand) => (
                <div key={brand.id} className="flex items-center space-x-2">
                  <RadioGroupItem value={brand.id} id={`brand-${brand.id}`} />
                  <Label
                    htmlFor={`brand-${brand.id}`}
                    className="cursor-pointer flex-1"
                  >
                    {brand.title}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </CollapsibleSection>
        )}

        {/* Price Range */}
        <CollapsibleSection title="Price Range">
          <PriceRangeFilter
            value={filters.priceRange}
            onChange={updatePriceRange}
          />
        </CollapsibleSection>

        {/* Sizes */}
        {availableSizes.length > 0 && (
          <CollapsibleSection title="Sizes" defaultOpen={false}>
            <div className="grid grid-cols-5 gap-2">
              {availableSizes.map((size) => (
                <Button
                  key={size.id}
                  onClick={() => toggleArrayFilter("sizes", size)}
                  variant={
                    filters.sizes.some((s) => s.id === size.id)
                      ? "default"
                      : "outline"
                  }
                  size="sm"
                  className="h-auto py-2"
                >
                  {size.size}
                </Button>
              ))}
            </div>
          </CollapsibleSection>
        )}

        {/* Colors */}
        {availableColors.length > 0 && (
          <CollapsibleSection title="Colors" defaultOpen={false}>
            {availableColors.map((color) => (
              <div
                key={color.id}
                className="flex flex-row items-center justify-between"
              >
                <Checkbox
                  id={`color-${color.id}`}
                  label={color.title}
                  checked={filters.colors.some((c) => c.id === color.id)}
                  onChange={() => toggleArrayFilter("colors", color)}
                />
                <div
                  className="w-5 h-5 rounded-full border border-border"
                  style={{ backgroundColor: `#${color.hex}` }}
                />
              </div>
            ))}
          </CollapsibleSection>
        )}
      </div>
    </div>
  );
};

export default FilterContent;
