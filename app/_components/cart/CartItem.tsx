"use client";

import { getProductImage } from "@/app/_lib/actions/productsAction";
import { removeCartItem, updateQuantity } from "@/app/_lib/actions/userActions";
import { CartItem as CartItemType } from "@/app/_lib/types";
import { Image } from "@/app/_lib/types/product_types";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState, useTransition } from "react";
import { CiImageOn } from "react-icons/ci";
import { IoMdTrash } from "react-icons/io";
import { toast } from "sonner";
import ImageFallback from "./ImageFallBack";
import QuantitySelector from "./QuantitySelector";

interface CartItemProps {
  item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
  const [isImageLoading, startImageTransition] = useTransition();
  const [isRemoving, startRemoveTransition] = useTransition();
  const [isQuantityUpdating, startQuantityTransition] = useTransition();
  const [quantity, setQuantity] = useState(item.quantity);
  const [image, setImage] = useState<Image>();

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity < 1) return;
    if (newQuantity > 99) return;
    setQuantity(newQuantity);
    startQuantityTransition(async () => {
      await updateQuantity(Number(item?.id), Number(newQuantity));
    });
  };

  const handleRemove = async () => {
    startRemoveTransition(async () => {
      const result = await removeCartItem(Number(item?.id));

      if (result.success) {
        toast.success("Product Removed From Cart.");
      } else {
        toast.success(result.message);
      }
    });
  };

  useEffect(() => {
    startImageTransition(async () => {
      const productImg = await getProductImage(item?.product_id);
      setImage(productImg);
    });
  }, []);

  const product = item.product;

  const subtotal = product?.price * quantity;
  const savings = product.discount_price
    ? (product.price - product.discount_price) * quantity
    : 0;

  const priceAfterSaving = subtotal - savings;

  return (
    <div
      className={`p-6 transition-opacity ${
        isRemoving ? "opacity-50 cursor-progress" : "opacity-100"
      }`}
    >
      <div className="flex gap-6 flex-col sm:flex-row">
        {/* Product Image */}
        <div className="flex-shrink-0">
          <div className="relative w-full sm:w-32 h-48 sm:h-32 bg-muted rounded-lg overflow-hidden">
            {isImageLoading ? (
              <Skeleton className="w-full h-full z-20 flex items-center justify-center">
                <CiImageOn size={32} />
              </Skeleton>
            ) : image?.url === "" ? (
              <ImageFallback className="h-full" />
            ) : (
              <img
                src={image?.url}
                alt={image?.name}
                className="w-full h-full object-cover"
              />
            )}
            {product.stock === 0 && (
              <div className="absolute inset-0 bg-modal-overlay flex items-center justify-center">
                <Badge className="bg-stock-out text-destructive-foreground px-3 py-1 rounded text-sm font-semibold shadow-xl">
                  Out of Stock
                </Badge>
              </div>
            )}
          </div>
        </div>

        {/* Product Details */}
        <div className="flex-1 min-w-0">
          <div className="flex justify-between gap-4 mb-2">
            <div className="flex-1">
              <div className="flex flex-col gap-1 mb-1">
                <h3 className="text-lg font-semibold text-foreground line-clamp-2">
                  {product.title}
                </h3>
                <span className="text-sm text-muted-foreground">
                  {item?.brand}
                </span>
              </div>

              {/* Attributes */}
              {item.hex && item.size && (
                <div className="flex flex-col gap-1 mt-3 mb-3 justify-center">
                  <div className="flex flex-row gap-2 items-center text-muted-foreground">
                    <span>Color: </span>
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: `#${item.hex}` }}
                    />
                  </div>
                  <div className="flex flex-row gap-2 items-center text-muted-foreground">
                    <span>Size: </span>
                    <Badge className="bg-background/40">{item.size}</Badge>
                  </div>
                </div>
              )}

              {/* Price */}
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-xl font-bold text-price">
                  $
                  {product?.discount_price
                    ? product.discount_price.toFixed(2)
                    : product.price.toFixed(2)}
                </span>
                {product.discount_price && (
                  <>
                    <span className="text-sm text-price-original line-through">
                      ${product.price.toFixed(2)}
                    </span>
                  </>
                )}
              </div>

              {/* Actions - Mobile */}
              <div className="flex items-center gap-4 sm:hidden">
                <QuantitySelector
                  quantity={quantity}
                  onChange={handleQuantityChange}
                  disabled={!product.stock}
                />
                <button
                  onClick={handleRemove}
                  disabled={isRemoving}
                  className="text-sm text-destructive hover:text-destructive-hover font-medium transition-colors disabled:opacity-50"
                >
                  <IoMdTrash className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Subtotal - Desktop */}
            <div className="hidden sm:flex flex-col items-end">
              {priceAfterSaving && savings > 0 ? (
                <>
                  <span className="text-xl font-bold text-foreground">
                    ${priceAfterSaving.toFixed(2)}
                  </span>
                  <span className="text-md font-medium text-muted-foreground line-through">
                    ${subtotal.toFixed(2)}
                  </span>
                  {savings > 0 && (
                    <span className="text-sm text-success font-medium">
                      Save ${savings.toFixed(2)}
                    </span>
                  )}
                </>
              ) : (
                <>
                  <span className="text-xl font-bold text-foreground">
                    ${subtotal.toFixed(2)}
                  </span>
                  {savings > 0 && (
                    <span className="text-sm text-success font-medium">
                      Save ${savings.toFixed(2)}
                    </span>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Actions - Desktop */}
          <div className="hidden sm:flex items-center gap-4 mt-4">
            <QuantitySelector
              quantity={quantity}
              onChange={handleQuantityChange}
              disabled={!product.stock || isQuantityUpdating}
            />
            <button
              onClick={handleRemove}
              disabled={isRemoving}
              className="text-sm text-destructive hover:text-destructive-hover font-medium transition-colors disabled:opacity-50 cursor-pointer"
            >
              <IoMdTrash className="w-6 h-6" />
            </button>
            {!product.stock && (
              <span className="text-sm text-stock-out font-medium ml-auto">
                Currently unavailable
              </span>
            )}
          </div>

          {/* Subtotal - Mobile */}
          <div className="flex justify-between items-center mt-4 sm:hidden pt-4 border-t border-divider">
            <span className="text-sm text-muted-foreground">Subtotal:</span>
            {priceAfterSaving && savings > 0 ? (
              <>
                <div className="flex flex-col gap-1">
                  <div className="flex flex-row gap-1">
                    <span className="text-md font-bold text-foreground">
                      ${priceAfterSaving.toFixed(2)}
                    </span>
                    <span className="text-sm font-medium text-muted-foreground line-through">
                      ${subtotal.toFixed(2)}
                    </span>
                  </div>
                  {savings > 0 && (
                    <span className="text-sm text-success font-medium">
                      Save ${savings.toFixed(2)}
                    </span>
                  )}
                </div>
              </>
            ) : (
              <>
                <span className="text-md font-bold text-foreground">
                  ${subtotal.toFixed(2)}
                </span>
                {savings > 0 && (
                  <span className="text-sm text-success font-medium">
                    Save ${savings.toFixed(2)}
                  </span>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
