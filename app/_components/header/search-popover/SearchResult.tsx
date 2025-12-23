import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { FaSearch, FaHistory, FaSpinner } from "react-icons/fa";
import { SearchResultsProps } from "@/app/_lib/types/product_types";
import { ProductItem } from "./ProductItem";
import { RecentSearchItem } from "./RecentSearchItem";
import { EmptyState } from "./EmptyState";
import { LoadingState } from "./LoadingState";

export function SearchResults({
  query,
  results,
  recentSearches,
  loading,
  onProductSelect,
  onRecentSearchSelect,
  onViewAllResults,
}: SearchResultsProps) {
  return (
    <Command className="rounded-lg">
      <CommandList className="max-h-[400px] overflow-y-auto">
        {/* Loading State */}
        {loading && <LoadingState />}

        {/* Search Results */}
        {!loading && query && results.length > 0 && (
          <CommandGroup heading="Products">
            {results.map((product) => (
              <ProductItem
                key={product.id}
                product={product}
                onSelect={() => onProductSelect(product.id, product.title)}
              />
            ))}
          </CommandGroup>
        )}

        {/* No Results */}
        {!loading && query && results.length === 0 && (
          <CommandEmpty>
            <EmptyState query={query} />
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
              <RecentSearchItem
                key={search}
                search={search}
                onSelect={() => onRecentSearchSelect(search)}
              />
            ))}
          </CommandGroup>
        )}

        {/* View All Button */}
        {!loading && query && results.length > 0 && (
          <div className="border-t p-2">
            <CommandItem
              onSelect={() => onViewAllResults(query)}
              className="font-medium text-primary justify-center py-3 cursor-pointer hover:bg-accent"
            >
              View all results for "{query}"
            </CommandItem>
          </div>
        )}
      </CommandList>
    </Command>
  );
}