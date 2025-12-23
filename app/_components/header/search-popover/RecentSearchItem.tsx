import { CommandItem } from "@/components/ui/command";
import { FaSearch } from "react-icons/fa";

interface RecentSearchItemProps {
  search: string;
  onSelect: () => void;
}

export function RecentSearchItem({ search, onSelect }: RecentSearchItemProps) {
  return (
    <CommandItem
      value={search}
      onSelect={onSelect}
      className="px-4 py-3 cursor-pointer"
    >
      <FaSearch className="mr-3 h-4 w-4 text-muted-foreground" />
      {search}
    </CommandItem>
  );
}