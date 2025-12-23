import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "recentSearches";
const MAX_RECENT_SEARCHES = 5;

export function useRecentSearches() {
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setRecentSearches(parsed.slice(0, MAX_RECENT_SEARCHES));
        }
      }
    } catch (error) {
      console.error("Error loading recent searches:", error);
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  // Save a search to recent searches
  const saveSearch = useCallback(
    (search: string) => {
      const trimmedSearch = search.trim();
      if (!trimmedSearch) return;

      const updated = [
        trimmedSearch,
        ...recentSearches.filter(
          (s) => s.toLowerCase() !== trimmedSearch.toLowerCase()
        ),
      ].slice(0, MAX_RECENT_SEARCHES);

      setRecentSearches(updated);

      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch (error) {
        console.error("Error saving recent searches:", error);
      }
    },
    [recentSearches]
  );

  // Clear all recent searches
  const clearRecentSearches = useCallback(() => {
    setRecentSearches([]);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error("Error clearing recent searches:", error);
    }
  }, []);

  return { recentSearches, saveSearch, clearRecentSearches };
}