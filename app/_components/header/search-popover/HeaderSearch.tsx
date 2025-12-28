"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { FaSearch } from "react-icons/fa";
import { SearchResults } from "./SearchResult";
import { useSearchQuery } from "./useSearchQuery";
import { useRecentSearches } from "./useRecentSearches";

export default function HeaderSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const { results, loading } = useSearchQuery(query);
  const { recentSearches, saveSearch } = useRecentSearches();

  const handleSearch = (searchQuery: string, navigateToPage = true) => {
    const trimmedQuery = searchQuery.trim();
    if (!trimmedQuery) return;

    saveSearch(trimmedQuery);
    setOpen(false);
    setQuery("");

    if (navigateToPage) {
      router.push(`/products?search=${encodeURIComponent(trimmedQuery)}`);
    }
  };

  const handleProductSelect = (productId: number, productTitle: string) => {
    saveSearch(productTitle);
    setOpen(false);
    setQuery("");
    router.push(`/products/${productId}`);
  };

  const handleRecentSearchSelect = (search: string) => {
    setQuery(search);
    setTimeout(() => handleSearch(search), 100);
  };

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setOpen(true);
  };

  const handleInputFocus = () => {
    setOpen(true);
  };

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
  };

  const handleClosePopover = () => {
    setOpen(false);
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
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              onKeyDown={handleKeyDown}
              autoComplete="off"
            />
          </PopoverTrigger>

          <button
            onClick={() => handleSearch(query)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Search"
            type="button"
          >
            <FaSearch className="h-4 w-4" />
          </button>
        </div>

        <PopoverContent
          className="w-[500px] p-0 rounded-lg shadow-lg border"
          align="start"
          sideOffset={5}
          onOpenAutoFocus={(e) => e.preventDefault()}
          onCloseAutoFocus={(e) => e.preventDefault()}
          onInteractOutside={handleClosePopover}
          onEscapeKeyDown={handleClosePopover}
        >
          <SearchResults
            query={query}
            results={results}
            recentSearches={recentSearches}
            loading={loading}
            onProductSelect={handleProductSelect}
            onRecentSearchSelect={handleRecentSearchSelect}
            onViewAllResults={handleSearch}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}