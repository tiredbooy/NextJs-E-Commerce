import { useState, useEffect, useCallback } from "react";
import { debounce } from "lodash";
import { Product, SearchResponse } from "@/app/_lib/types/product_types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";
const SEARCH_DEBOUNCE_MS = 300;
const SEARCH_RESULTS_LIMIT = 8;

export function useSearchQuery(query: string) {
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const performSearch = useCallback(
    debounce(async (searchQuery: string) => {
      const trimmedQuery = searchQuery.trim();
      
      if (!trimmedQuery) {
        setResults([]);
        setLoading(false);
        return;
      }

      setLoading(true);

      try {
        const url = `${API_BASE_URL}/api/products?search=${encodeURIComponent(
          trimmedQuery
        )}&limit=${SEARCH_RESULTS_LIMIT}`;

        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`Search failed with status: ${response.status}`);
        }

        const data: SearchResponse = await response.json();
        setResults(data.products || []);
      } catch (error) {
        console.error("Search error:", error);
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, SEARCH_DEBOUNCE_MS),
    []
  );

  useEffect(() => {
    if (query.trim()) {
      performSearch(query);
    } else {
      setResults([]);
      setLoading(false);
    }

    // Cleanup function to cancel debounced search on unmount
    return () => {
      performSearch.cancel();
    };
  }, [query, performSearch]);

  return { results, loading };
}