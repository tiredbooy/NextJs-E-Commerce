import { CommandGroup, CommandItem } from "@/components/ui/command";
import { FaSearch } from "react-icons/fa";
import { ReactNode } from "react";

interface RecentSearchesProps {
  searches: string[];
  onSelect: (search: string) => void;
  icon: ReactNode;
  title: string;
}

export default function RecentSearches({ 
  searches, 
  onSelect, 
  icon, 
  title 
}: RecentSearchesProps) {
  return (
    <CommandGroup heading={
      <div className="flex items-center gap-2 px-2">
        {icon}
        <span>{title}</span>
      </div>
    }>
      {searches.map((search) => (
        <CommandItem
          key={search}
          value={search}
          onSelect={() => onSelect(search)}
          className="px-4 py-3 cursor-pointer"
        >
          <FaSearch className="mr-3 h-4 w-4 text-muted-foreground" />
          {search}
        </CommandItem>
      ))}
    </CommandGroup>
  );
}