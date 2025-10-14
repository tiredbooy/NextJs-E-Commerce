"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import { Check, ChevronDown, ArrowUpDown } from "lucide-react";

// Types
export type SortOption =
  | "relevance"
  | "price-asc"
  | "price-desc"
  | "name-asc"
  | "name-desc"
  | "newest"
  | "rating"
  | "popular";

interface SortConfig {
  value: SortOption;
  label: string;
  icon?: string;
}

interface Props {
  defaultSort?: SortOption;
  onSortChange?: (sortValue: SortOption) => void;
  className?: string;
  compact?: boolean;
}

// Sort options configuration
const SORT_OPTIONS: SortConfig[] = [
  { value: "relevance", label: "Relevance" },
  { value: "popular", label: "Most Popular" },
  { value: "newest", label: "Newest First" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "name-asc", label: "Name: A to Z" },
  { value: "name-desc", label: "Name: Z to A" },
  { value: "rating", label: "Highest Rated" },
];

// Update URL with sort parameter
const updateURLWithSort = (sortValue: SortOption) => {
  const params = new URLSearchParams(location.search);

  if (sortValue === "relevance") {
    params.delete("sort");
  } else {
    params.set("sort", sortValue);
  }

  const newURL = `${location.pathname}${
    params.toString() ? "?" + params.toString() : ""
  }`;
  history.pushState({}, "", newURL);
};

// Get sort from URL
const getSortFromURL = (): SortOption | null => {
  const params = new URLSearchParams(location.search);
  const sortParam = params.get("sort");

  if (sortParam && SORT_OPTIONS.some((opt) => opt.value === sortParam)) {
    return sortParam as SortOption;
  }

  return null;
};

const SortBy: React.FC<Props> = ({
  defaultSort = "relevance",
  onSortChange,
  className = "",
  compact = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState<SortOption>(
    getSortFromURL() || defaultSort
  );
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Get current sort label
  const currentSortLabel =
    SORT_OPTIONS.find((opt) => opt.value === selectedSort)?.label || "Sort By";

  // Handle sort selection
  const handleSortChange = useCallback(
    (sortValue: SortOption) => {
      setSelectedSort(sortValue);
      setIsOpen(false);
      updateURLWithSort(sortValue);
      onSortChange?.(sortValue);
    },
    [onSortChange]
  );

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

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
          <div className="absolute left-0 top-full mt-2 w-56 bg-popover border border-border rounded-md shadow-lg z-50 py-1">
            {SORT_OPTIONS.map((option) => (
              <button
                key={option.value}
                onClick={() => handleSortChange(option.value)}
                className={`w-full flex items-center justify-between px-4 py-2.5 text-sm text-left transition-colors ${
                  selectedSort === option.value
                    ? "bg-accent text-accent-foreground"
                    : "text-popover-foreground hover:bg-muted"
                }`}
              >
                <span>{option.label}</span>
                {selectedSort === option.value && (
                  <Check className="w-4 h-4 text-primary" />
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <div className="flex items-center gap-2">
        <label
          htmlFor="sort-select"
          className="text-sm font-medium text-foreground whitespace-nowrap"
        >
          Sort by:
        </label>

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
        <div className="absolute left-0 sm:left-auto sm:right-0 top-full mt-2 w-full sm:w-56 bg-popover border border-border rounded-md shadow-lg z-50 py-1">
          {SORT_OPTIONS.map((option) => (
            <button
              key={option.value}
              onClick={() => handleSortChange(option.value)}
              className={`w-full flex items-center justify-between px-4 py-2.5 text-sm text-left transition-colors ${
                selectedSort === option.value
                  ? "bg-accent text-accent-foreground font-medium"
                  : "text-popover-foreground hover:bg-muted"
              }`}
            >
              <span>{option.label}</span>
              {selectedSort === option.value && (
                <Check className="w-4 h-4 text-primary" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SortBy;
