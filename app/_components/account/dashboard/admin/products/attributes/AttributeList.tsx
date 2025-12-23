import { CommandEmpty, CommandGroup, CommandItem, CommandSeparator } from "@/components/ui/command";
import { Color, Size } from "@/app/_lib/types/product_types";
import { MdAdd, MdCheck } from "react-icons/md";

interface AttributeListProps {
  type: "size" | "color";
  items: Size[] | Color[];
  selectedIds: number[];
  onToggle: (id: number) => void;
  onShowCreate: () => void;
}

export function AttributeList({
  type,
  items,
  selectedIds,
  onToggle,
  onShowCreate,
}: AttributeListProps) {
  const isColorType = type === "color";

  return (
    <>
      <CommandEmpty>No {type}s found.</CommandEmpty>
      <CommandGroup>
        {isColorType ? (
          <div className="grid grid-cols-2 gap-1 p-2">
            {(items as Color[])?.map((color) => {
              const isSelected = selectedIds.includes(color.id);
              return (
                <button
                  key={color.id}
                  onClick={() => onToggle(color.id)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-md hover:bg-accent cursor-pointer transition-colors ${
                    isSelected ? "bg-accent" : ""
                  }`}
                >
                  <div
                    className="w-6 h-6 rounded-full border-2 border-border shadow-sm flex-shrink-0"
                    style={{ backgroundColor: `#${color.hex}` }}
                  />
                  <span className="font-medium text-sm flex-1 text-left">
                    {color.title}
                  </span>
                  {isSelected && (
                    <MdCheck className="w-4 h-4 text-primary flex-shrink-0" />
                  )}
                </button>
              );
            })}
          </div>
        ) : (
          (items as Size[])?.map((size) => {
            const isSelected = selectedIds.includes(size.id);
            return (
              <CommandItem
                key={size.id}
                onSelect={() => onToggle(size.id)}
                className="cursor-pointer"
              >
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-4 h-4 border-2 rounded flex items-center justify-center ${
                        isSelected
                          ? "bg-primary border-primary"
                          : "border-input"
                      }`}
                    >
                      {isSelected && (
                        <MdCheck className="w-3 h-3 text-primary-foreground" />
                      )}
                    </div>
                    <div className="font-medium">{size.size}</div>
                  </div>
                </div>
              </CommandItem>
            );
          })
        )}
      </CommandGroup>
      <CommandSeparator />
      <CommandGroup>
        <CommandItem
          onSelect={onShowCreate}
          className="cursor-pointer text-primary"
        >
          <MdAdd className="mr-2 h-4 w-4" />
          <span>Create new {type}</span>
        </CommandItem>
      </CommandGroup>
    </>
  );
}