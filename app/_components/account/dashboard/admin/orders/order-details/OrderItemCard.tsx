// components/OrderItemCard.tsx

import ImageFallback from "@/app/_components/cart/ImageFallBack";
import { getProductImage } from "@/app/_lib/actions/productsAction";
import { OrderDetailItem } from "@/app/_lib/types/order_types";
import { Image as ImageType } from "@/app/_lib/types/product_types";
import { orderHelpers } from "@/app/_lib/utils/orderHelpers";
import Link from "next/link";
// import { useEffect, useState, useTransition } from "react";

interface OrderItemCardProps {
  item: OrderDetailItem;
  className?: string;
}

export async function OrderItemCard({
  item,
  className = "",
}: OrderItemCardProps) {
  const itemTotal = item.quantity * item.price_at_purchase;

  const productImg = await getProductImage(item?.product_id);
  return (
    <Link
      href={`/products/${item.id}`}
      className={`flex gap-4 p-4 border rounded-lg hover:bg-accent/50 transition-colors ${className}`}
    >
      {/* Product Image Placeholder */}
      <div className="w-20 h-20 bg-muted rounded-md flex items-center justify-center flex-shrink-0">
        {/* <span className="text-2xl">📦</span> */}
        {productImg.url && productImg.url !== "" ? (
          <img
            src={productImg?.url}
            alt={productImg?.name}
            className="w-full h-full object-cover rounded-md"
          />
        ) : <ImageFallback />}
        
      </div>

      {/* Product Details */}
      <div className="flex-1 min-w-0">
        <h4 className="font-semibold text-foreground truncate">
          {item.product_name}
        </h4>

        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <span className="font-medium">Size:</span> {item.size_name}
          </span>
          <span className="flex items-center gap-1">
            <span className="font-medium">Color:</span> {item.color_name}
          </span>
          <span className="flex items-center gap-1">
            <span className="font-medium">Qty:</span> {item.quantity}
          </span>
        </div>

        <div className="mt-2 flex items-center justify-between">
          <span className="text-sm text-muted-foreground">
            {orderHelpers.formatPrice(item.price_at_purchase)} × {item.quantity}
          </span>
          <span className="font-semibold text-base">
            {orderHelpers.formatPrice(itemTotal)}
          </span>
        </div>
      </div>
    </Link>
  );
}
