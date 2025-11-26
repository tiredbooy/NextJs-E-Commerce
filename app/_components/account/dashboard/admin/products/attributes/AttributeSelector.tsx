import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandInput, CommandList } from "@/components/ui/command";
import { Color, Size } from "@/app/_lib/types/product_types";
import { MdExpandMore } from "react-icons/md";
import { AttributeList } from "./AttributeList";
import { CreateAttributeForm } from "./CreateAttributeForm";

interface AttributeSelectorProps {
  type: "size" | "color";
  items: Size[] | Color[];
  selectedIds: number[];
  isPending: boolean
  onToggle: (id: number) => void;
  onCreate: (name: string, hex?: string) => void;
}

export function AttributeSelector({
  type,
  items,
  selectedIds,
  isPending,
  onToggle,
  onCreate,
}: AttributeSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);

  const handleCreate = (name: string, hex?: string) => {
    onCreate(name, hex);
    setShowCreateForm(false);
  };

  const handleCancel = () => {
    setShowCreateForm(false);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild disabled={isPending}>
        <Button variant="outline" className="w-full justify-between" role="combobox">
          <span className="text-muted-foreground">
            {selectedIds.length === 0
              ? `Select ${type}s...`
              : `Add more ${type}s...`}
          </span>
          <MdExpandMore className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0" align="start">
        <Command>
          <CommandInput placeholder={`Search ${type}s...`} />
          <CommandList>
            {!showCreateForm ? (
              <AttributeList
                type={type}
                items={items}
                selectedIds={selectedIds}
                onToggle={onToggle}
                onShowCreate={() => setShowCreateForm(true)}
              />
            ) : (
              <CreateAttributeForm
                isPending={isPending}
                type={type}
                onCreate={handleCreate}
                onCancel={handleCancel}
              />
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}