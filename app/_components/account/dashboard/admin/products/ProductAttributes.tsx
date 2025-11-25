import { Color, Size } from "@/app/_lib/types/product_types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { useState } from "react";
import {
  MdAdd,
  MdCheck,
  MdClose,
  MdColorLens,
  MdExpandMore,
  MdStraighten,
} from "react-icons/md";

interface ProductFormData {
  size_ids: number[];
  color_ids: number[];
}

interface Props {
  data: ProductFormData;
  onChange: (updates: Partial<ProductFormData>) => void;
  sizes: Size[];
  colors: Color[];
}

export default function ProductAttributes({
  data,
  onChange,
  sizes,
  colors,
}: Props) {
  const [sizePopoverOpen, setSizePopoverOpen] = useState(false);
  const [colorPopoverOpen, setColorPopoverOpen] = useState(false);
  const [showAddSize, setShowAddSize] = useState(false);
  const [showAddColor, setShowAddColor] = useState(false);
  const [newSizeName, setNewSizeName] = useState("");
  const [newColorName, setNewColorName] = useState("");
  const [newColorHex, setNewColorHex] = useState("#000000");

  const selectedSizes = sizes.filter((size) => data.size_ids.includes(size.id));

  const selectedColors = colors?.filter((color) =>
    data.color_ids.includes(color.id)
  );

  const toggleSize = (sizeId: number) => {
    const newSizeIds = data.size_ids.includes(sizeId)
      ? data.size_ids.filter((id) => id !== sizeId)
      : [...data.size_ids, sizeId];
    onChange({ size_ids: newSizeIds });
  };

  const toggleColor = (colorId: number) => {
    const newColorIds = data.color_ids.includes(colorId)
      ? data.color_ids.filter((id) => id !== colorId)
      : [...data.color_ids, colorId];
    onChange({ color_ids: newColorIds });
  };

  const removeSize = (sizeId: number) => {
    onChange({ size_ids: data.size_ids.filter((id) => id !== sizeId) });
  };

  const removeColor = (colorId: number) => {
    onChange({ color_ids: data.color_ids.filter((id) => id !== colorId) });
  };

  const handleAddSize = () => {
    console.log("Creating new size:", {
      name: newSizeName,
    });
    setNewSizeName("");
    setShowAddSize(false);
  };

  const handleAddColor = () => {
    console.log("Creating new color:", {
      name: newColorName,
      hex: newColorHex,
    });
    setNewColorName("");
    setNewColorHex("#000000");
    setShowAddColor(false);
  };

  const totalVariants =
    selectedSizes.length && selectedColors.length
      ? selectedSizes.length * selectedColors.length
      : 0;

  return (
    <div className="space-y-6">
      {/* Sizes Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MdStraighten className="w-5 h-5 text-muted-foreground" />
              <div>
                <CardTitle>Product Sizes</CardTitle>
                <CardDescription>
                  Select all available sizes for this product
                </CardDescription>
              </div>
            </div>
            {selectedSizes.length > 0 && (
              <Badge variant="secondary" className="text-sm">
                {selectedSizes.length} selected
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Selected Sizes */}
          {selectedSizes.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {selectedSizes.map((size) => (
                <Badge
                  key={size.id}
                  className="text-sm px-3 py-1.5 gap-2 bg-primary/40 text-foreground"
                >
                  <span className="font-semibold">{size.size}</span>
                  <button
                    onClick={() => removeSize(size.id)}
                    className="ml-1 hover:bg-primary/20 rounded-full transition-colors cursor-pointer"
                  >
                    <MdClose className="w-3.5 h-3.5" />
                  </button>
                </Badge>
              ))}
            </div>
          )}

          {/* Size Selector */}
          <Popover open={sizePopoverOpen} onOpenChange={setSizePopoverOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-between"
                role="combobox"
              >
                <span className="text-muted-foreground">
                  {selectedSizes.length === 0
                    ? "Select sizes..."
                    : "Add more sizes..."}
                </span>
                <MdExpandMore className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0" align="start">
              <Command>
                <CommandInput placeholder="Search sizes..." />
                <CommandList>
                  <CommandEmpty>No sizes found.</CommandEmpty>
                  <CommandGroup>
                    {sizes.map((size) => {
                      const isSelected = data.size_ids.includes(size.id);
                      return (
                        <CommandItem
                          key={size.id}
                          onSelect={() => toggleSize(size.id)}
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
                              <div>
                                <div className="font-medium">{size.size}</div>
                              </div>
                            </div>
                          </div>
                        </CommandItem>
                      );
                    })}
                  </CommandGroup>
                  <CommandSeparator />
                  {!showAddSize ? (
                    <CommandGroup>
                      <CommandItem
                        onSelect={() => setShowAddSize(true)}
                        className="cursor-pointer text-primary"
                      >
                        <MdAdd className="mr-2 h-4 w-4" />
                        <span>Create new size</span>
                      </CommandItem>
                    </CommandGroup>
                  ) : (
                    <div className="p-4 space-y-3">
                      <div className="space-y-2">
                        <Label htmlFor="size-name">Size Name</Label>
                        <Input
                          id="size-name"
                          placeholder="e.g., 4XL"
                          value={newSizeName}
                          onChange={(e) => setNewSizeName(e.target.value)}
                          autoFocus
                        />
                      </div>
                      <div className="flex gap-2">
                        <Button
                          onClick={handleAddSize}
                          disabled={!newSizeName.trim()}
                          className="flex-1"
                          size="sm"
                        >
                          Create
                        </Button>
                        <Button
                          onClick={() => {
                            setShowAddSize(false);
                            setNewSizeName("");
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
        </CardContent>
      </Card>

      {/* Colors Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MdColorLens className="w-5 h-5 text-muted-foreground" />
              <div>
                <CardTitle>Product Colors</CardTitle>
                <CardDescription>
                  Select all available colors for this product
                </CardDescription>
              </div>
            </div>
            {selectedColors.length > 0 && (
              <Badge variant="secondary" className="text-sm">
                {selectedColors.length} selected
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Selected Colors */}
          {selectedColors.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {selectedColors.map((color) => (
                <Badge
                  key={color.id}
                  className="text-sm px-3 py-1.5 gap-2 bg-secondary/30 text-foreground"
                >
                  <div
                    className="w-4 h-4 rounded-full shadow-sm"
                    style={{ backgroundColor: `#${color.hex}` }}
                  />
                  <span className="font-medium">{color.title}</span>
                  <button
                    onClick={() => removeColor(color.id)}
                    className="ml-1 hover:bg-secondary-foreground/20 rounded-full transition-colors"
                  >
                    <MdClose className="w-3.5 h-3.5" />
                  </button>
                </Badge>
              ))}
            </div>
          )}

          {/* Color Selector */}
          <Popover open={colorPopoverOpen} onOpenChange={setColorPopoverOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-between"
                role="combobox"
              >
                <span className="text-muted-foreground">
                  {selectedColors.length === 0
                    ? "Select colors..."
                    : "Add more colors..."}
                </span>
                <MdExpandMore className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0" align="start">
              <Command>
                <CommandInput placeholder="Search colors..." />
                <CommandList>
                  <CommandEmpty>No colors found.</CommandEmpty>
                  <CommandGroup>
                    <div className="grid grid-cols-2 gap-1 p-2">
                      {colors?.map((color) => {
                        const isSelected = data.color_ids.includes(color.id);
                        return (
                          <button
                            key={color.id}
                            onClick={() => toggleColor(color.id)}
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
                  </CommandGroup>
                  <CommandSeparator />
                  {!showAddColor ? (
                    <CommandGroup>
                      <CommandItem
                        onSelect={() => setShowAddColor(true)}
                        className="cursor-pointer text-primary"
                      >
                        <MdAdd className="mr-2 h-4 w-4" />
                        <span>Create new color</span>
                      </CommandItem>
                    </CommandGroup>
                  ) : (
                    <div className="p-4 space-y-3">
                      <div className="space-y-2">
                        <Label htmlFor="color-name">Color Name</Label>
                        <Input
                          id="color-name"
                          placeholder="e.g., Burgundy"
                          value={newColorName}
                          onChange={(e) => setNewColorName(e.target.value)}
                          autoFocus
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="color-hex">Color Code</Label>
                        <div className="flex gap-2">
                          <input
                            type="color"
                            value={newColorHex}
                            onChange={(e) => setNewColorHex(e.target.value)}
                            className="w-14 h-10 rounded border cursor-pointer"
                          />
                          <Input
                            id="color-hex"
                            value={newColorHex}
                            onChange={(e) => setNewColorHex(e.target.value)}
                            placeholder="#000000"
                            className="flex-1 font-mono"
                          />
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          onClick={handleAddColor}
                          disabled={!newColorName.trim()}
                          className="flex-1"
                          size="sm"
                        >
                          Create
                        </Button>
                        <Button
                          onClick={() => {
                            setShowAddColor(false);
                            setNewColorName("");
                            setNewColorHex("#000000");
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
        </CardContent>
      </Card>

      {/* Variants Summary */}
      {totalVariants > 0 && (
        <Card className="border-primary/50 bg-primary/5">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <MdCheck className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-primary mb-1">
                  Product Variants Summary
                </h4>
                <p className="text-sm text-muted-foreground">
                  This product will have{" "}
                  <span className="font-semibold text-foreground">
                    {selectedSizes.length} size
                    {selectedSizes.length !== 1 ? "s" : ""}
                  </span>
                  {" × "}
                  <span className="font-semibold text-foreground">
                    {selectedColors.length} color
                    {selectedColors.length !== 1 ? "s" : ""}
                  </span>
                  {" = "}
                  <span className="font-bold text-primary">
                    {totalVariants} total variants
                  </span>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Empty State */}
      {selectedSizes.length === 0 && selectedColors.length === 0 && (
        <Card className="border-dashed">
          <CardContent className="pt-6">
            <div className="text-center py-8">
              <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-4">
                <MdStraighten className="w-6 h-6 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">No variants added</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Add sizes and colors to create product variants
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
