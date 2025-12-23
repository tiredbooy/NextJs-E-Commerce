import { CommandEmpty } from "@/components/ui/command";
import { FaSearch } from "react-icons/fa";

interface EmptyStateProps {
  show: boolean;
  query: string;
}

export default function EmptyState({ show, query }: EmptyStateProps) {
  if (!show) return null;

  return (
    <CommandEmpty>
      <div className="py-8 text-center">
        <FaSearch className="h-10 w-10 text-muted-foreground mx-auto mb-3 opacity-50" />
        <p className="font-medium">No products found for "{query}"</p>
        <p className="text-sm text-muted-foreground mt-1">
          Try different keywords or browse categories
        </p>
      </div>
    </CommandEmpty>
  );
}