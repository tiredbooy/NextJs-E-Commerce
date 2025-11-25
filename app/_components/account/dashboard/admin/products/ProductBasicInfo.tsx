import { Brand, Category } from "@/app/_lib/types/product_types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useCallback, useMemo, useState } from "react";
import { MdAdd, MdCheck, MdExpandMore, MdInfo } from "react-icons/md";
import { ProductFormData } from "./ProductForm";

interface Props {
  data: ProductFormData;
  onChange: (updates: Partial<ProductFormData>) => void;
  categories: Category[];
  brands: Brand[];
}

export function ProductBasicInfo({
  data,
  onChange,
  categories,
  brands,
}: Props) {
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [brandPopOver, SetBrandPopOverOpen] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [newName, setNewName] = useState("");

  const generateSlug = useCallback(
    (name: string) =>
      name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, ""),
    []
  );

  const handleNameChange = useCallback(
    (title: string) => {
      onChange({ title, slug: generateSlug(title) || data.slug });
    },
    [data.slug, generateSlug, onChange]
  );

  const toggleCategory = useCallback(
    (categoryId: number) => {
      const current = data.category_ids || [];
      const updated = current.includes(categoryId)
        ? current.filter((id) => id !== categoryId)
        : [...current, categoryId];
      onChange({ category_ids: updated });
    },
    [data.category_ids, onChange]
  );

  const handleAddCategory = useCallback(() => {
    if (!newName.trim()) return;

    const newCategory: Omit<Category, "id"> = {
      title: newName.trim(),
    };
    // setCategories((prev) => [...prev, newCategory]);
    onChange({ category_ids: [...(data.category_ids || [])] });

    setNewName("");
    setShowAdd(false);
  }, [newName, categories, data.category_ids, generateSlug, onChange]);

  const selectedTitles = useMemo(
    () =>
      categories
        ?.filter((c) => data.category_ids?.includes(c.id))
        .map((c) => c.title),
    [categories, data.category_ids]
  );

  const displayText =
    selectedTitles?.length === 0
      ? "Select categories..."
      : selectedTitles?.join(", ");

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Product Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Title */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label>Product Name *</Label>
              <span className="text-xs text-muted-foreground">
                {data.title.length}/200
              </span>
            </div>
            <Input
              value={data.title}
              onChange={(e) =>
                data.title.length <= 200 && handleNameChange(e.target.value)
              }
              placeholder="e.g., Premium Wireless Headphones"
              required
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label>Full Description *</Label>
              <span className="text-xs text-muted-foreground">
                {data.description.length}/1000
              </span>
            </div>
            <Textarea
              value={data.description}
              onChange={(e) =>
                e.target.value.length <= 1000 &&
                onChange({ description: e.target.value })
              }
              placeholder="Detailed product description..."
              rows={8}
              required
            />
          </div>

          {/* Categories & Brand */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                        {showAdd
                          ? "Create new category"
                          : "No categories found."}
                      </CommandEmpty>

                      {!showAdd && (
                        <CommandGroup>
                          {categories?.map((category) => {
                            const isSelected = data.category_ids?.includes(
                              category.id
                            );
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
                                  <span className="capitalize">
                                    {category.title}
                                  </span>
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

            <div className="space-y-2">
              <Label>Brand</Label>
              <Popover open={brandPopOver} onOpenChange={SetBrandPopOverOpen}>
                <PopoverTrigger>
                  <Button variant="outline" className="w-full justify-between">
                    <span>brand</span>
                    <MdExpandMore className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent>
                  <Command>
                    <CommandInput
                      placeholder="Search Brands..."
                      value={showAdd ? newName : undefined}
                      onValueChange={showAdd ? setNewName : undefined}
                    />
                    <CommandList>
                      <CommandEmpty>
                        {showAdd ? "Create new brand" : "No Brand found."}
                      </CommandEmpty>

                      {!showAdd && (
                        <CommandGroup>
                          {brands?.map((brand) => {
                            const isSelected = data?.brand === brand?.id;

                            return (
                              <CommandItem
                                key={brand.id}
                                onSelect={() => toggleCategory(brand.id)}
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
                                  <span className="capitalize">
                                    {brand.title}
                                  </span>
                                </div>
                              </CommandItem>
                            );
                          })}
                        </CommandGroup>
                      )}
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {/* Featured Switch */}
          <div className="flex items-center space-x-2 p-4 bg-card rounded-lg border">
            <Switch
              checked={data.is_featured}
              onCheckedChange={(checked) => onChange({ is_featured: checked })}
            />
            <div className="flex-1">
              <Label className="cursor-pointer">Featured Product</Label>
              <p className="text-xs text-gray-600">
                Display this product prominently on the homepage
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Slug */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Product Identification
            <MdInfo className="text-gray-400" size={18} />
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>URL Slug *</Label>
            <Input
              value={data.slug}
              onChange={(e) => onChange({ slug: e.target.value })}
              placeholder="product-url-slug"
              required
            />
            <p className="text-xs text-muted-foreground">
              URL: /products/{data.slug || "your-product-slug"}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
