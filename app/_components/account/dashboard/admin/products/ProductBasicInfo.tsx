import { Brand, Category } from "@/app/_lib/types/product_types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useCallback } from "react";
import { MdInfo } from "react-icons/md";
import { ProductFormData } from "./ProductForm";
import { CategorySelector } from "./CategorySelector"; // New Import
import { BrandSelector } from "./BrandSelector"; // New Import

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
            <CategorySelector
              categories={categories}
              selectedIds={data.category_ids || []}
              onChange={(ids) => onChange({ category_ids: ids })}
            />
            <BrandSelector
              brands={brands}
              selectedId={data.brand}
              onChange={(id) => onChange({ brand: id })}
            />
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
