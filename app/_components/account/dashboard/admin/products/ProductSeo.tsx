import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ProductFormData } from "./ProductForm";
import { MdSearch } from "react-icons/md";
import { useState, useCallback } from "react";

interface Props {
  data: ProductFormData;
  onChange: (updates: Partial<ProductFormData>) => void;
}

export function ProductSEO({ data, onChange }: Props) {
  const [tagInput, setTagInput] = useState(data.meta_tags?.join(", ") || "");

  const previewUrl = `https://velisse.com/products/${
    data.slug || "product-name"
  }`;

  const handleTagsChange = useCallback(
    (value: string) => {
      setTagInput(value);
      // Split by commas and filter out empty strings
      const tags = value
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag.length > 0);
      onChange({ meta_tags: tags });
    },
    [onChange]
  );

  const handleDescriptionChange = useCallback(
    (value: string) => {
      if (value.length <= 160) {
        onChange({ meta_description: value });
      }
    },
    [onChange]
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MdSearch />
          Search Engine Optimization
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Meta Description */}
        <div className="space-y-2">
          <div className="flex justify-between">
            <Label>Meta Description</Label>
            <span className="text-xs text-gray-500">
              {data.meta_description?.length || 0}/160
            </span>
          </div>
          <Textarea
            value={data.meta_description || ""}
            onChange={(e) => handleDescriptionChange(e.target.value)}
            placeholder="Brief description that appears in search engine results"
            rows={3}
          />
          <p className="text-xs text-gray-500">
            Encourage clicks with compelling copy
          </p>
        </div>

        {/* Meta Tags */}
        <div className="space-y-2">
          <Label>SEO Meta Tags</Label>
          <Input
            value={tagInput}
            onChange={(e) => handleTagsChange(e.target.value)}
            placeholder="wireless headphones, bluetooth, noise cancelling"
          />
          <p className="text-xs text-gray-500">Separate tags with commas</p>
          {data.meta_tags && data.meta_tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {data.meta_tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-secondary text-secondary-foreground text-xs rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Search Preview */}
        <div className="border rounded-lg p-4 bg-card">
          <p className="text-xs font-semibold text-gray-600 mb-3">
            SEARCH ENGINE PREVIEW
          </p>
          <div className="space-y-1">
            <p className="text-green-700 text-sm">{previewUrl}</p>
            <p className="text-gray-600 text-sm">
              {data.meta_description ||
                "Your product description will appear here in search results."}
            </p>
          </div>
        </div>

        {/* SEO Tips */}
        <div className="p-4 bg-card rounded-lg border">
          <p className="text-sm font-semibold mb-2">SEO Tips</p>
          <ul className="text-sm space-y-1 list-disc list-inside">
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
