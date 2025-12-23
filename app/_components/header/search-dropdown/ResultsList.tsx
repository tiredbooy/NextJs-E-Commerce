import { CommandGroup, CommandItem } from "@/components/ui/command";
import { FaExternalLinkAlt, FaSearch } from "react-icons/fa";

interface ResultsListProps {
  results: any[];
  query: string;
  onSelect: (product: any) => void;
}

export default function ResultsList({ results, query, onSelect }: ResultsListProps) {
  if (results.length === 0) return null;

  return (
    <CommandGroup heading={`Results for "${query}"`}>
      {results?.map((product) => (
        <CommandItem
          key={product.id}
          value={product.title}
          onSelect={() => onSelect(product)}
          className="px-4 py-3 cursor-pointer hover:bg-accent"
        >
          <div className="flex items-center gap-3 flex-1 min-w-0">
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
              <p className="font-medium truncate">{product.title}</p>
              {product.categories?.[0] && (
                <p className="text-xs text-muted-foreground truncate">
                  {product.categories[0].title}
                  {product.price && ` • $${product.price.toFixed(2)}`}
                </p>
              )}
            </div>
            
            <FaExternalLinkAlt className="h-3 w-3 text-muted-foreground ml-2 flex-shrink-0" />
          </div>
        </CommandItem>
      ))}
    </CommandGroup>
  );
}