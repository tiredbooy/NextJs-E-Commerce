import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Grid3x3, List } from "lucide-react";

type ViewType = "grid" | "list";

interface Props {
  viewType: "grid" | "list";
  onViewChange: (v: ViewType) => void;
}

export function ProductViewToggle({ viewType, onViewChange }: Props) {
  return (
    <ToggleGroup
      type="single"
      value={viewType}
      onValueChange={(value) => {
        if (value) onViewChange(value);
      }}
      className="bg-muted p-1 rounded-lg "
    >
      <ToggleGroupItem
        value="grid"
        aria-label="Grid view"
        className="data-[state=on]:bg-background data-[state=on]:text-foreground  cursor-pointer"
      >
        <Grid3x3 className="h-4 w-4" />
        <span className="sr-only">Grid view</span>
      </ToggleGroupItem>

      <ToggleGroupItem
        value="list"
        aria-label="List view"
        className="data-[state=on]:bg-background data-[state=on]:text-foreground  cursor-pointer"
      >
        <List className="h-4 w-4" />
        <span className="sr-only">List view</span>
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
