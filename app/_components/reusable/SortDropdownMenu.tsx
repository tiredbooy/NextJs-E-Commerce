import { Check } from "lucide-react";
import { SortOption } from "../products/filter/SortBy";

interface DropdownMenuProps<T extends string> {
  options: SortOption<T>[];
  selectedSort: T;
  onSelect: (value: T) => void;
}

export function DropdownMenu<T extends string>({
  options,
  selectedSort,
  onSelect,
}: DropdownMenuProps<T>) {
  return (
    <div className="absolute left-0 sm:left-auto sm:right-0 top-full mt-2 w-full sm:w-56 bg-popover border border-border rounded-md shadow-lg z-50 py-1">
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => onSelect(option.value)}
          className={`w-full flex items-center justify-between px-4 py-2.5 text-sm text-left transition-colors ${
            selectedSort === option.value
              ? "bg-accent text-accent-foreground font-medium"
              : "text-popover-foreground hover:bg-muted"
          }`}
        >
          <span>{option.label}</span>
          {selectedSort === option.value && (
            <Check className="w-4 h-4 text-primary" />
          )}
        </button>
      ))}
    </div>
  );
}