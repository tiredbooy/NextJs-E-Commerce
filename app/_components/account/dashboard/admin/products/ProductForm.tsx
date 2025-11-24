"use client";
import { Breadcrumb } from "@/app/_components/reusable/BreadCrump";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import { MdPreview, MdSave } from "react-icons/md";
import { ProductBasicInfo } from "./ProductBasicInfo";
import { ProductImages } from "./ProductImages";
import { ProductInventory } from "./ProductInventory";
import { ProductPricing } from "./ProductPricing";
import { ProductSEO } from "./ProductSeo";
import { ProductVariants } from "./ProductVariants";

export interface ProductFormData {
  // Basic Info
  title: string;
  description: string;
  category: string;
  brand: number;
  slug: string;
  // Pricing
  price: string;
  compareAtPrice: string;
  costPerItem: string;
  include_tax: boolean;

  // Images
  images: Array<{
    id: number;
    product_id: number;
    url: string;
    name: string;
  }>;

  stock: number;

  meta_description: string;
  meta_tags: string[];

  is_featured: boolean;
  is_active: boolean;
}

interface Props {
  mode?: "create" | "edit";
  initialData?: Partial<ProductFormData>;
  onSubmit: (data: ProductFormData) => void;
  isLoading?: boolean;
}


export default function ProductForm({
  mode = "create",
  initialData,
  onSubmit,
  isLoading = false,
}: Props) {
  const [formData, setFormData] = useState<ProductFormData>({
    title: initialData?.title || "",
    price: initialData?.price || "",
    description: initialData?.description || "",
    stock: initialData?.stock || 0,
    category: initialData?.category || "",
    brand: initialData?.brand || 1,
    slug: initialData?.slug || "",
    compareAtPrice: initialData?.compareAtPrice || "",
    costPerItem: initialData?.costPerItem || "",
    include_tax: initialData?.include_tax ?? true,
    images: initialData?.images || [],
    meta_description: initialData?.meta_description || "",
    meta_tags: initialData?.meta_tags || [],
    is_featured: initialData?.is_featured ?? false,
    is_active: initialData?.is_active ?? false,
  });

  const [activeTab, setActiveTab] = useState<string>("basic");

  const updateFormData = (updates: Partial<ProductFormData>) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  };

  const handleSubmit = () => {

    const {compareAtPrice , costPerItem, images, ...requestData} = formData;
    console.log('...formData:', formData);
    console.log('requestData:', requestData);
    
  };

  const calculateProfit = () => {
    const price: number = parseFloat(formData.price) || 0;
    const cost: number = parseFloat(formData.costPerItem) || 0;
    const profit: number = price - cost;
    const margin = price > 0 ? ((profit / price) * 100).toFixed(2) : 0;
    return { profit: Number(profit.toFixed(2)), margin };
  };

  const tabs = [
    { id: "basic", label: "Basic Info" },
    { id: "pricing", label: "Pricing" },
    { id: "images", label: "Images" },
    { id: "inventory", label: "Inventory" },
    { id: "variants", label: "Variants" },
    { id: "seo", label: "SEO" },
  ];

  return (
    <div className="space-y-6">
      <Breadcrumb />
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">
          {mode === "create" ? "Add New Product" : "Edit Product"}
        </h1>
        <div className="flex gap-2">
          <Button variant="outline" disabled={isLoading}>
            <MdPreview className="mr-2 cursor-pointer" />
            Preview
          </Button>
          <Button
            variant="outline"
            disabled={isLoading}
            onClick={() => handleSubmit()}
            className="cursor-pointer"
          >
            Save as Draft
          </Button>
          <Button
            disabled={isLoading}
            onClick={() => handleSubmit()}
            className="gap-2 text-background font-semibold cursor-pointer"
          >
            <MdSave />
            {isLoading ? "Publishing..." : "Publish Product"}
          </Button>
        </div>
      </div>

      {/* Profit Calculator Card */}
      {formData.price && formData.costPerItem && (
        <Card className="bg-card border-card">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Profit per item</p>
                <p
                  className={`text-2xl font-bold ${
                    calculateProfit().profit > 0
                      ? "text-success"
                      : "text-destructive"
                  }`}
                >
                  ${calculateProfit().profit.toLocaleString()}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Profit margin</p>
                <p
                  className={`text-2xl font-bold ${
                    Number(calculateProfit().margin) > 0
                      ? "text-success"
                      : "text-destructive"
                  }`}
                >
                  {calculateProfit().margin}%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Navigation Tabs */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-wrap gap-2 border-b pb-4">
            {tabs.map((tab) => (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? "default" : "ghost"}
                onClick={() => setActiveTab(tab.id)}
                className="transition-all cursor-pointer"
              >
                {tab.label}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Tab Content */}
      <div className="space-y-6">
        {activeTab === "basic" && (
          <ProductBasicInfo data={formData} onChange={updateFormData} />
        )}

        {activeTab === "pricing" && (
          <ProductPricing data={formData} onChange={updateFormData} />
        )}

        {activeTab === "images" && (
          <ProductImages data={formData} onChange={updateFormData} />
        )}

        {activeTab === "inventory" && (
          <ProductInventory data={formData} onChange={updateFormData} />
        )}

        {activeTab === "variants" && (
          <ProductVariants data={formData} onChange={updateFormData} />
        )}

        {activeTab === "seo" && (
          <ProductSEO data={formData} onChange={updateFormData} />
        )}
      </div>
    </div>
  );
}
