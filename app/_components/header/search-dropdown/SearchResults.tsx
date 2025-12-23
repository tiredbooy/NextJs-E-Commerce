"use client";

import { PopoverContent } from "@/components/ui/popover";
import { Command, CommandList } from "@/components/ui/command";
import { FaHistory } from "react-icons/fa";
import ResultsList from "./ResultsList";
import RecentSearches from "./RecentSearches";
import LoadingState from "./LoadingState";
import EmptyState from "./EmptyState";
import ViewAllButton from "./ViewAllButton";

interface SearchResultsProps {
  query: string;
  results: any[];
  loading: boolean;
  recentSearches: string[];
  onProductSelect: (product: any) => void;
  onSearchSelect: (search: string) => void;
  onViewAll: () => void;
}

export default function SearchResults({
  query,
  results,
  loading,
  recentSearches,
  onProductSelect,
  onSearchSelect,
  onViewAll,
}: SearchResultsProps) {
  return (
    <PopoverContent
      className="w-[500px] p-0 rounded-lg shadow-lg border"
      align="start"
      sideOffset={5}
      onInteractOutside={(e) => {
        // Close only if clicking outside the entire search component
        if (!e.target.closest('[data-search-container]')) {
          return true;
        }
        return false;
      }}
    >
      <Command className="rounded-lg" data-search-container>
        <CommandList className="max-h-[400px] overflow-y-auto">
          <LoadingState loading={loading} />
          
          {!loading && query && (
            <>
              <ResultsList 
                results={results} 
                query={query}
                onSelect={onProductSelect} 
              />
              <EmptyState 
                show={results.length === 0} 
                query={query} 
              />
            </>
          )}

          {!loading && !query && recentSearches.length > 0 && (
            <RecentSearches 
              searches={recentSearches} 
              onSelect={onSearchSelect} 
              icon={<FaHistory className="h-4 w-4" />}
              title="Recent Searches"
            />
          )}

          {!loading && query && results.length > 0 && (
            <ViewAllButton query={query} onClick={onViewAll} />
          )}
        </CommandList>
      </Command>
    </PopoverContent>
  );
}