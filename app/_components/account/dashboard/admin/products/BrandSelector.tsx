import { createBrand } from "@/app/_lib/actions/productsAction";
import { Brand } from "@/app/_lib/types/product_types";
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
import { Spinner } from "@/components/ui/spinner";
import { useCallback, useMemo, useState, useTransition } from "react";
import { MdAdd, MdCheck, MdExpandMore } from "react-icons/md";
import { toast } from "sonner";

interface Props {
  brands: Brand[];
  selectedId?: number;
  onChange: (id: number) => void;
}

export function BrandSelector({ brands, selectedId, onChange }: Props) {
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [showAddBrand, setShowAddBrand] = useState(false);
  const [brandName, setBrandName] = useState("");
  const [newBrandName, setNewBrandName] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleSelectBrand = useCallback(
    (brandId: number) => {
      onChange(brandId);
      setPopoverOpen(false);
    },
    [onChange]
  );

  const handleAddBrand = useCallback(async () => {
    if (!newBrandName.trim()) return;
    startTransition(async () => {
      try {
        const newBrand = await createBrand(newBrandName.toLowerCase().trim());

        setNewBrandName("");
        setShowAddBrand(false);
      } catch (error: any) {
        toast.error(`Failed to create brand: ${error.message}`);
      }
    });
  }, [newBrandName]);

  const selectedBrand = useMemo(
    () => brands?.find((b) => b.id === selectedId),
    [brands, selectedId]
  );

  const displayText = selectedBrand ? selectedBrand.title : "Select brand...";

  return (
    <div className="space-y-2">
      <Label>Brand</Label>
      <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-full justify-between">
            <span className="truncate capitalize text-muted-foreground">
              {displayText}
            </span>
            <MdExpandMore className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0" align="start">
          <Command>
            <CommandInput
              placeholder="Search brands..."
              value={brandName}
              onValueChange={setBrandName}
            />
            <CommandList>
              <CommandEmpty>
                {showAddBrand ? "Create new brand" : "No brands found."}
              </CommandEmpty>

              {!showAddBrand && (
                <CommandGroup>
                  {brands?.map((brand) => {
                    const isSelected = selectedId === brand.id;
                    return (
                      <CommandItem
                        key={brand.id}
                        disabled={isPending}
                        onSelect={() => handleSelectBrand(brand.id)}
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
                          <span className="capitalize">{brand.title}</span>
                        </div>
                      </CommandItem>
                    );
                  })}
                </CommandGroup>
              )}

              <CommandSeparator />

              {!showAddBrand ? (
                <CommandGroup>
                  <CommandItem
                    onSelect={() => setShowAddBrand(true)}
                    className="cursor-pointer text-primary"
                  >
                    <MdAdd className="mr-2 h-4 w-4" />
                    <span>Create new brand</span>
                  </CommandItem>
                </CommandGroup>
              ) : (
                <div className="p-4 space-y-3">
                  <Label>Brand Name</Label>
                  <Input
                    value={newBrandName}
                    onChange={(e) => setNewBrandName(e.target.value)}
                    placeholder="e.g., Sony"
                    autoFocus
                  />
                  <div className="flex gap-2">
                    <Button
                      onClick={handleAddBrand}
                      disabled={!newBrandName.trim() || isPending}
                      className="flex-1"
                      size="sm"
                    >
                      {isPending ? <Spinner /> : "Create"}
                    </Button>
                    <Button
                      onClick={() => {
                        setShowAddBrand(false);
                        setNewBrandName("");
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
        Only one brand can be selected
      </p>
    </div>
  );
}
