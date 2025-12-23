import { CommandItem } from "@/components/ui/command";
import { FaExternalLinkAlt } from "react-icons/fa";

interface ViewAllButtonProps {
  query: string;
  onClick: () => void;
}

export default function ViewAllButton({ query, onClick }: ViewAllButtonProps) {
  return (
    <div className="border-t p-2">
      <CommandItem
        onSelect={onClick}
        className="font-medium text-primary justify-center py-3 cursor-pointer hover:bg-accent"
      >
        View all results for "{query}"
        <FaExternalLinkAlt className="ml-2 h-3 w-3" />
      </CommandItem>
    </div>
  );
}