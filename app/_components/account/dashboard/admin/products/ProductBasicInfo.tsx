import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { ProductFormData } from "./ProductForm";
import { MdInfo } from "react-icons/md";

interface Props {
  data: ProductFormData;
  onChange: (updates: Partial<ProductFormData>) => void;
}

export function ProductBasicInfo({ data, onChange }: Props) {
  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  const handleNameChange = (title: string) => {
    onChange({
      title,
      slug: generateSlug(title) || data.slug,
    });
  };

  return (
    <div className="space-y-6">
      {/* Product Details */}
      <Card>
        <CardHeader>
          <CardTitle>Product Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Product Name *</Label>
            <Input
              id="name"
              value={data.title}
              onChange={(e) => handleNameChange(e.target.value)}
              placeholder="e.g., Premium Wireless Headphones"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Full Description *</Label>
            <Textarea
              id="description"
              value={data.description}
              onChange={(e) => onChange({ description: e.target.value })}
              placeholder="Detailed product description with features, benefits, and specifications"
              rows={8}
              required
            />
            <p className="text-xs text-muted-foreground">
              Include key features, materials, care instructions, etc.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Select
                value={data.category}
                onValueChange={(value) => onChange({ category: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="electronics">Electronics</SelectItem>
                  <SelectItem value="clothing">Clothing & Apparel</SelectItem>
                  <SelectItem value="home">Home & Garden</SelectItem>
                  <SelectItem value="sports">Sports & Outdoors</SelectItem>
                  <SelectItem value="books">Books & Media</SelectItem>
                  <SelectItem value="toys">Toys & Games</SelectItem>
                  <SelectItem value="beauty">Beauty & Personal Care</SelectItem>
                  <SelectItem value="food">Food & Beverages</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="brand">Brand</Label>
              <Input
                id="brand"
                value={data.brand}
                onChange={(e) => onChange({ brand: Number(e.target.value) })}
                placeholder="e.g., Nike, Apple, Samsung"
              />
            </div>
          </div>

          <div className="flex items-center space-x-2 p-4 bg-card rounded-lg border border-border">
            <Switch
              id="featured"
              checked={data.is_featured}
              onCheckedChange={(checked) => onChange({ is_featured: checked })}
            />
            <div className="flex-1">
              <Label htmlFor="featured" className="cursor-pointer">
                Featured Product
              </Label>
              <p className="text-xs text-gray-600">
                Display this product prominently on the homepage
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Product Identification */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Product Identification
            <MdInfo className="text-gray-400" size={18} />
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="slug">URL Slug *</Label>
            <Input
              id="slug"
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
