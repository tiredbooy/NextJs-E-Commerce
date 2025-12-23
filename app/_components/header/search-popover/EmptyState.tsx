import { FaSearch } from "react-icons/fa";

interface EmptyStateProps {
  query: string;
}

export function EmptyState({ query }: EmptyStateProps) {
  return (
    <div className="py-8 text-center">
      <FaSearch className="h-10 w-10 text-muted-foreground mx-auto mb-3 opacity-50" />
      <p className="font-medium">No products found for "{query}"</p>
      <p className="text-sm text-muted-foreground mt-1">
        Try different keywords or browse categories
      </p>
    </div>
  );
}