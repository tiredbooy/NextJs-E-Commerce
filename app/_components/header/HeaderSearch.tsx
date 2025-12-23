"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { debounce } from "lodash";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import {
  FaSearch,
  FaHistory,
  FaSpinner,
  FaExternalLinkAlt,
} from "react-icons/fa";

interface Product {
  id: string;
  title: string;
  price?: number;
  categories?: Array<{ title: string }>;
  images?: Array<{ url: string; name?: string }>;
}

export default function HeaderSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  // Load recent searches
  useEffect(() => {
    const saved = localStorage.getItem("recentSearches");
    if (saved) {
      try {
        setRecentSearches(JSON.parse(saved).slice(0, 5));
      } catch (e) {
        console.error("Error loading recent searches:", e);
      }
    }
  }, []);

  // Save search
  const saveSearch = useCallback(
    (search: string) => {
      if (!search.trim()) return;
      const updated = [
        search,
        ...recentSearches.filter(
          (s) => s.toLowerCase() !== search.toLowerCase()
        ),
      ].slice(0, 5);
      setRecentSearches(updated);
      localStorage.setItem("recentSearches", JSON.stringify(updated));
    },
    [recentSearches]
  );

  // Search function
  const performSearch = useCallback(
    debounce(async (searchQuery: string) => {
      if (!searchQuery.trim()) {
        setResults([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const response = await fetch(
          `http://localhost:8080/api/products?search=${encodeURIComponent(
            searchQuery
          )}&limit=8`
        );

        if (!response.ok) throw new Error(`Search failed: ${response.status}`);

        const data = await response.json();
        setResults(data.products || data || []);
      } catch (error) {
        console.error("Search error:", error);
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 300),
    []
  );

  // Handle query changes
  useEffect(() => {
    if (query.trim()) {
      performSearch(query);
    } else {
      setResults([]);
    }
  }, [query, performSearch]);

  // Handle search action
  const handleSearch = useCallback(
    (searchQuery: string, navigateToPage = true) => {
      if (!searchQuery.trim()) return;

      saveSearch(searchQuery);
      setOpen(false);
      setQuery("");

      if (navigateToPage) {
        router.push(`/products?search=${encodeURIComponent(searchQuery)}`);
      }
    },
    [saveSearch, router]
  );

  // Handle product selection
  const handleProductSelect = useCallback(
    (product: Product) => {
      saveSearch(product.title);
      setOpen(false);
      setQuery("");
      router.push(`/products/${product.id}`);
    },
    [saveSearch, router]
  );

  // Handle keyboard
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (query.trim()) {
        handleSearch(query);
      }
    }
    if (e.key === "Escape") {
      setOpen(false);
    }
  };

  // Keep input focused
  const handleInputClick = () => {
    setOpen(true);
    // Ensure input stays focused
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  // Handle popover open change
  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    // If closing, don't blur input
    if (!isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 10);
    }
  };

  return (
    <div className="relative w-full max-w-full">
      <Popover open={open} onOpenChange={handleOpenChange}>
        <div className="relative">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground z-10" />
          <PopoverTrigger asChild>
            <Input
              ref={inputRef}
              type="search"
              placeholder="Search products..."
              className="pl-10 pr-10 border-border-hover focus:border-border-focus cursor-text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setOpen(true);
              }}
              onFocus={() => setOpen(true)}
              onKeyDown={handleKeyDown}
              onClick={handleInputClick}
              autoFocus={false}
            />
          </PopoverTrigger>

          <button
            onClick={() => handleSearch(query)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Search"
          >
            <FaSearch className="h-4 w-4" />
          </button>
        </div>

        <PopoverContent
          className="w-[500px] p-0 rounded-lg shadow-lg border"
          align="start"
          sideOffset={5}
          // REMOVED onInteractOutside to prevent focus issues
          onOpenAutoFocus={(e) => e.preventDefault()}
          onCloseAutoFocus={(e) => e.preventDefault()}
        >
          <Command className="rounded-lg">
            <CommandList className="max-h-[400px] overflow-y-auto">
              {/* Loading State */}
              {loading && (
                <div className="flex items-center justify-center py-6">
                  <FaSpinner className="h-5 w-5 animate-spin text-primary mr-2" />
                  <span className="text-sm text-muted-foreground">
                    Searching...
                  </span>
                </div>
              )}

              {/* Search Results */}
              {!loading && query && results.length > 0 && (
                <CommandGroup heading="Products">
                  {results.map((product) => (
                    <CommandItem
                      key={product.id}
                      value={product.title}
                      onSelect={() => handleProductSelect(product)}
                      className="flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-accent"
                    >
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        {/* Product Image */}
                        {product.images?.[0]?.url ? (
                          <div className="h-10 w-10 rounded-md overflow-hidden flex-shrink-0">
                            <img
                              src={product.images[0].url}
                              alt={product.images[0].name || product.title}
                              className="h-full w-full object-cover"
                            />
                          </div>
                        ) : (
                          <div className="h-10 w-10 rounded-md bg-accent flex items-center justify-center flex-shrink-0">
                            <FaSearch className="h-4 w-4" />
                          </div>
                        )}

                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">
                            {product.title}
                          </p>
                          {product.categories?.[0] && (
                            <p className="text-xs text-muted-foreground truncate">
                              {product.categories[0].title}
                              {product.price &&
                                ` • $${product.price.toFixed(2)}`}
                            </p>
                          )}
                        </div>

                        <FaExternalLinkAlt className="h-3 w-3 text-muted-foreground ml-2 flex-shrink-0" />
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}

              {/* No Results */}
              {!loading && query && results.length === 0 && (
                <CommandEmpty>
                  <div className="py-8 text-center">
                    <FaSearch className="h-10 w-10 text-muted-foreground mx-auto mb-3 opacity-50" />
                    <p className="font-medium">
                      No products found for "{query}"
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Try different keywords or browse categories
                    </p>
                  </div>
                </CommandEmpty>
              )}

              {/* Recent Searches */}
              {!loading && !query && recentSearches.length > 0 && (
                <CommandGroup
                  heading={
                    <div className="flex items-center gap-2 px-2">
                      <FaHistory className="h-4 w-4" />
                      <span>Recent Searches</span>
                    </div>
                  }
                >
                  {recentSearches.map((search) => (
                    <CommandItem
                      key={search}
                      value={search}
                      onSelect={() => {
                        setQuery(search);
                        setTimeout(() => handleSearch(search), 100);
                      }}
                      className="px-4 py-3 cursor-pointer"
                    >
                      <FaSearch className="mr-3 h-4 w-4 text-muted-foreground" />
                      {search}
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}

              {/* View All Button */}
              {!loading && query && results.length > 0 && (
                <div className="border-t p-2">
                  <CommandItem
                    onSelect={() => handleSearch(query)}
                    className="font-medium text-primary justify-center py-3 cursor-pointer hover:bg-accent"
                  >
                    View all results for "{query}"
                    <FaExternalLinkAlt className="ml-2 h-3 w-3" />
                  </CommandItem>
                </div>
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
