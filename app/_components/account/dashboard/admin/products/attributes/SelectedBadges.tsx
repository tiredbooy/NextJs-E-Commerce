import { Badge } from "@/components/ui/badge";
import { Color, Size } from "@/app/_lib/types/product_types";
import { MdClose } from "react-icons/md";

interface SelectedBadgesProps {
  type: "size" | "color";
  items: Size[] | Color[];
  onRemove: (id: number) => void;
}

export function SelectedBadges({ type, items, onRemove }: SelectedBadgesProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => {
        const isColor = type === "color" && "hex" in item;
        const isSize = type === "size" && "size" in item;

        return (
          <Badge
            key={item.id}
            className={`text-sm px-3 py-1.5 gap-2 ${
              isColor
                ? "bg-secondary/30 text-foreground"
                : "bg-primary/40 text-foreground"
            }`}
          >
            {isColor && (
              <div
                className="w-4 h-4 rounded-full shadow-sm"
                style={{ backgroundColor: `#${(item as Color).hex}` }}
              />
            )}
            <span className={isSize ? "font-semibold" : "font-medium"}>
              {isColor ? (item as Color).title : (item as Size).size}
            </span>
            <button
              onClick={() => onRemove(item.id)}
              className={`ml-1 rounded-full transition-colors cursor-pointer ${
                isColor
                  ? "hover:bg-secondary-foreground/20"
                  : "hover:bg-primary/20"
              }`}
            >
              <MdClose className="w-3.5 h-3.5" />
            </button>
          </Badge>
        );
      })}
    </div>
  );
}