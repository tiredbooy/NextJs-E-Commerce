"use client";

import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Package,
  Shield,
  Truck,
  Info,
  Star,
  MessageSquare,
} from "lucide-react";
import DescriptionTab from "./DescriptionTab";
import SpecificationsTab from "./SpecificationsTab";
import ReviewsTab from "./ReviewsTab";

interface ProductDetailsTabsProps {
  productId: number;
  description?: string;
  specifications?: Record<string, string>;
  reviews?: [];
}

const ProductDetailsTabs: React.FC<ProductDetailsTabsProps> = ({
  productId,
  description,
  specifications,
  reviews,
}) => {
  return (
    <div className="w-full">
      <Tabs defaultValue="description" className="w-full">
        <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent">
          <TabsTrigger
            value="description"
            className="rounded-md border-b-2 border-transparent data-[state=active]:bg-primary/20 px-6 py-3 cursor-pointer transition-colors duration-200"
          >
            <Info className="w-4 h-4 mr-2" />
            Description
          </TabsTrigger>
          {specifications && (
            <TabsTrigger
              value="specifications"
              className="rounded-md border-b-2 border-transparent data-[state=active]:bg-primary/20 px-6 py-3 cursor-pointer transition-colors duration-200"
            >
              <Package className="w-4 h-4 mr-2" />
              Specifications
            </TabsTrigger>
          )}
          {reviews && reviews.length > 0 && (
            <TabsTrigger
              value="reviews"
              className="rounded-md border-b-2 border-transparent data-[state=active]:bg-primary/20 px-6 py-3 cursor-pointer transition-colors duration-200"
            >
              <Star className="w-4 h-4 mr-2" />
              Reviews
            </TabsTrigger>
          )}
        </TabsList>

        <div className="mt-6">
          <TabsContent value="description" className="mt-0">
            <DescriptionTab description={description} />
          </TabsContent>

          {specifications && (
            <TabsContent value="specifications" className="mt-0">
              <SpecificationsTab specifications={specifications} />
            </TabsContent>
          )}

          {reviews && reviews.length > 0 && (
            <TabsContent value="reviews" className="mt-0">
              <ReviewsTab productId={productId} />
            </TabsContent>
          )}
        </div>
      </Tabs>
    </div>
  );
};

export default ProductDetailsTabs;
