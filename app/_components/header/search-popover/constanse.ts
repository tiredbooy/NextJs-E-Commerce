export const SEARCH_CONFIG = {
  DEBOUNCE_MS: 300,
  RESULTS_LIMIT: 8,
  MAX_RECENT_SEARCHES: 5,
  STORAGE_KEY: "recentSearches",
  API_BASE_URL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080",
} as const;