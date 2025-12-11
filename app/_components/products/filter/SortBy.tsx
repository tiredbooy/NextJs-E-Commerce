"use client";
import { useClickOutside, useInitialSort } from "@/app/_lib/hooks/useSort";
import { updateURLParams } from "@/app/_lib/utils/sortHelpers";
import { ArrowUpDown, Check, ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useRef, useState } from "react";
import { DropdownMenu } from "../../reusable/SortDropdownMenu";

export interface SortOption<T extends string = string> {
  value: T;
  label: string;
  icon?: string;
}

export interface SortByProps<T extends string = string> {
  options?: SortOption<T>[];
  defaultSort?: T;
  onSortChange?: (sortValue: T) => void;
  className?: string;
  compact?: boolean;
  syncWithURL?: boolean;
  urlParamName?: string;
  showLabel?: boolean;
  labelText?: string;
}

// Default sort for products
export const DEFAULT_PRODUCT_SORT_OPTIONS: SortOption[] = [
  { value: "newest", label: "Newest First" },
  { value: "popular", label: "Most Popular" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "name-asc", label: "Name: A to Z" },
  { value: "name-desc", label: "Name: Z to A" },
  { value: "rating", label: "Highest Rated" },
];

function SortBy<T extends string = string>({
  options = DEFAULT_PRODUCT_SORT_OPTIONS as SortOption<T>[],
  defaultSort = "newest" as T,
  onSortChange,
  className = "",
  compact = false,
  syncWithURL = true,
  urlParamName = "sortBy",
  showLabel = true,
  labelText = "Sort by:",
}: SortByProps<T>) {

  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  // Get initial sort from URL or default
  const initialSort = useInitialSort(
    options,
    defaultSort,
    urlParamName,
    syncWithURL
  );
  const [selectedSort, setSelectedSort] = useState<T>(initialSort);

  const currentSortLabel =
    options.find((opt) => opt.value === selectedSort)?.label || "Sort By";

  const handleSortChange = useCallback(
    (sortValue: T) => {
      setSelectedSort(sortValue);
      setIsOpen(false);

      // Update URL if sync is enabled
      if (syncWithURL) {
        updateURLParams(sortValue, defaultSort, urlParamName, router);
      }

      // Call external handler
      onSortChange?.(sortValue);
    },
    [syncWithURL, defaultSort, urlParamName, router, onSortChange]
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  useClickOutside(dropdownRef, () => setIsOpen(false), isOpen);

  if (compact) {
    return (
      <div className={`relative ${className}`} ref={dropdownRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          onKeyDown={handleKeyDown}
          className="flex items-center gap-2 px-3 py-2 text-sm bg-card border border-border rounded-md hover:bg-card-hover hover:border-border-hover transition-colors focus:outline-none focus:ring-2 focus:ring-ring"
          aria-label="Sort options"
          aria-expanded={isOpen}
          aria-haspopup="true"
        >
          <ArrowUpDown className="w-4 h-4 text-muted-foreground" />
          <ChevronDown
            className={`w-4 h-4 text-muted-foreground transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {isOpen && (
          <DropdownMenu
            options={options}
            selectedSort={selectedSort}
            onSelect={handleSortChange}
          />
        )}
      </div>
    );
  }

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <div className="flex items-center gap-2">
        {showLabel && (
          <label
            htmlFor="sort-select"
            className="text-sm font-medium text-foreground whitespace-nowrap"
          >
            {labelText}
          </label>
        )}

        <button
          id="sort-select"
          onClick={() => setIsOpen(!isOpen)}
          onKeyDown={handleKeyDown}
          className="flex items-center justify-between gap-3 w-full sm:w-[200px] px-4 py-2 text-sm bg-card border border-border rounded-md hover:bg-card-hover hover:border-border-hover transition-colors focus:outline-none focus:ring-2 focus:ring-ring"
          aria-expanded={isOpen}
          aria-haspopup="true"
        >
          <span className="text-foreground">{currentSortLabel}</span>
          <ChevronDown
            className={`w-4 h-4 text-muted-foreground transition-transform duration-200 flex-shrink-0 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>
      </div>

      {isOpen && (
        <DropdownMenu
          options={options}
          selectedSort={selectedSort}
          onSelect={handleSortChange}
        />
      )}
    </div>
  );
}



export default SortBy;