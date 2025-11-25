import { Category } from "@/app/_lib/types/product_types";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useCallback, useMemo, useState } from "react";
import { MdAdd, MdCheck, MdExpandMore } from "react-icons/md";

interface Props {
  categories: Category[];
  selectedIds: number[];
  onChange: (ids: number[]) => void;
}

export function CategorySelector({ categories, selectedIds, onChange }: Props) {
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [newName, setNewName] = useState("");

  const toggleCategory = useCallback(
    (categoryId: number) => {
      const updated = selectedIds.includes(categoryId)
        ? selectedIds.filter((id) => id !== categoryId)
        : [...selectedIds, categoryId];
      onChange(updated);
    },
    [selectedIds, onChange]
  );

  const handleAddCategory = useCallback(() => {
    if (!newName.trim()) return;
    // TODO: Add logic here to actually create the category via API
    // and then update the parent component's list.
    // The original code didn't have this, so I've left it as-is.
    // Example: await createCategory({ title: newName.trim() });
    setNewName("");
    setShowAdd(false);
  }, [newName, onChange]);

  const selectedTitles = useMemo(
    () =>
      categories
        ?.filter((c) => selectedIds.includes(c.id))
        .map((c) => c.title),
    [categories, selectedIds]
  );

  const displayText =
    selectedTitles?.length === 0
      ? "Select categories..."
      : selectedTitles?.join(", ");

  return (
    <div className="space-y-2">
      <Label>Categories *</Label>
      <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-full justify-between">
            <span className="truncate text-muted-foreground">
              {displayText}
            </span>
            <MdExpandMore className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0" align="start">
          <Command>
            <CommandInput
              placeholder="Search categories..."
              value={showAdd ? newName : undefined}
              onValueChange={showAdd ? setNewName : undefined}
            />
            <CommandList>
              <CommandEmpty>
                {showAdd ? "Create new category" : "No categories found."}
              </CommandEmpty>

              {!showAdd && (
                <CommandGroup>
                  {categories?.map((category) => {
                    const isSelected = selectedIds.includes(category.id);
                    return (
                      <CommandItem
                        key={category.id}
                        onSelect={() => toggleCategory(category.id)}
                        className="cursor-pointer"
                      >
                        <div className="flex items-center gap-3 w-full">
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
                          <span className="capitalize">{category.title}</span>
                        </div>
                      </CommandItem>
                    );
                  })}
                </CommandGroup>
              )}

              <CommandSeparator />

              {!showAdd ? (
                <CommandGroup>
                  <CommandItem
                    onSelect={() => setShowAdd(true)}
                    className="cursor-pointer text-primary"
                  >
                    <MdAdd className="mr-2 h-4 w-4" />
                    <span>Create new category</span>
                  </CommandItem>
                </CommandGroup>
              ) : (
                <div className="p-4 space-y-3">
                  <Label>Category Name</Label>
                  <Input
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="e.g., Home Decor"
                    autoFocus
                  />
                  <div className="flex gap-2">
                    <Button
                      onClick={handleAddCategory}
                      disabled={!newName.trim()}
                      className="flex-1"
                      size="sm"
                    >
                      Create
                    </Button>
                    <Button
                      onClick={() => {
                        setShowAdd(false);
                        setNewName("");
                      }}
                      variant="outline"
                      size="sm"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <p className="text-xs text-muted-foreground">
        {selectedTitles?.length} categories selected
      </p>
    </div>
  );
}