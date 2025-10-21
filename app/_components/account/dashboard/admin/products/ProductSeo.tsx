import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ProductFormData } from "./ProductForm";
import { MdSearch } from "react-icons/md";

interface Props {
  data: ProductFormData;
  onChange: (updates: Partial<ProductFormData>) => void;
}

export function ProductSEO({ data, onChange }: Props) {
  const previewUrl = `https://yourstore.com/products/${
    data.slug || "product-name"
  }`;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MdSearch />
          Search Engine Optimization
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="metaTitle">Meta Title</Label>
          <Input
            id="metaTitle"
            value={data.metaTitle}
            onChange={(e) => onChange({ metaTitle: e.target.value })}
            placeholder={data.name || "Product meta title"}
            maxLength={60}
          />
          <p className="text-xs text-gray-500">
            {data.metaTitle.length}/60 characters - Appears in search results
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="metaDescription">Meta Description</Label>
          <Textarea
            id="metaDescription"
            value={data.metaDescription}
            onChange={(e) => onChange({ metaDescription: e.target.value })}
            placeholder="Brief description that appears in search engine results"
            rows={3}
            maxLength={160}
          />
          <p className="text-xs text-gray-500">
            {data.metaDescription.length}/160 characters - Encourage clicks with
            compelling copy
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="keywords">SEO Keywords</Label>
          <Input
            id="keywords"
            value={data.keywords}
            onChange={(e) => onChange({ keywords: e.target.value })}
            placeholder="wireless headphones, bluetooth, noise cancelling"
          />
          <p className="text-xs text-gray-500">
            Separate keywords with commas - helps search engines understand your
            product
          </p>
        </div>

        {/* Search Preview */}
        <div className="border rounded-lg p-4 bg-card">
          <p className="text-xs font-semibold text-gray-600 mb-3">
            SEARCH ENGINE PREVIEW
          </p>
          <div className="space-y-1">
            <p className="text-foreground text-lg hover:underline cursor-pointer">
              {data.metaTitle || data.name || "Your Product Title"}
            </p>
            <p className="text-green-700 text-sm">{previewUrl}</p>
            <p className="text-gray-600 text-sm">
              {data.metaDescription ||
                data.shortDescription ||
                "Your product description will appear here in search results. Make it compelling to increase click-through rates."}
            </p>
          </div>
        </div>

        <div className="p-4 bg-card rounded-lg border border-border">
          <p className="text-sm font-semibold text-foreground mb-2">SEO Tips</p>
          <ul className="text-sm text-text space-y-1 list-disc list-inside">
            <li>Include your main keyword in the title</li>
            <li>Write unique descriptions for each product</li>
            <li>Use natural language that appeals to customers</li>
            <li>Add alt text to all product images</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
