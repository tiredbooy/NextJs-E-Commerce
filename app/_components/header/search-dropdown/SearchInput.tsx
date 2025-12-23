"use client";

import { Input } from "@/components/ui/input";
import { PopoverTrigger } from "@/components/ui/popover";
import { FaSearch } from "react-icons/fa";

interface SearchInputProps {
  query: string;
  setQuery: (query: string) => void;
  onSearch: () => void;
  setOpen: (open: boolean) => void;
}

export default function SearchInput({
  query,
  setQuery,
  onSearch,
  setOpen,
}: SearchInputProps) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      onSearch();
    }
    if (e.key === "Escape") {
      setOpen(false);
    }
  };

  return (
    <div className="relative">
      <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground z-10" />
      <PopoverTrigger asChild>
        <Input
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
          onClick={() => setOpen(true)}
        />
      </PopoverTrigger>

      <button
        onClick={onSearch}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
        aria-label="Search"
      >
        <FaSearch className="h-4 w-4" />
      </button>
    </div>
  );
}