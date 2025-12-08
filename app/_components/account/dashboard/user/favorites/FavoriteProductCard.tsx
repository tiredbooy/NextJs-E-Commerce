import { Product } from "@/app/_lib/types/product_types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { FiHeart, FiShoppingCart, FiTrash2 } from "react-icons/fi";

interface Props {
  product: Product;
  favoritedAt: string;
  viewMode: "grid" | "list";
}

export default function FavoriteProductCard({
  product,
  favoritedAt,
  viewMode,
}: Props) {
  const [isRemoving, setIsRemoving] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const outOfStock = product.stock === 0;

  const handleRemove = () => {
    setIsRemoving(true);
  };

  const discountPercentage = product?.discount_price
    ? Math.round(
        ((product.price - product.discount_price) / product.price) * 100
      )
    : 0;

  const isGridView = viewMode === "grid";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: isRemoving ? 0 : 1, y: isRemoving ? -20 : 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="h-full cursor-pointer"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Card
        className={`group relative overflow-hidden border bg-card/50 backdrop-blur-sm hover:bg-gradient-to-br hover:from-background hover:to-card hover:border-primary/20 transition-all duration-500 h-full ${
          isGridView ? "flex flex-col" : "flex flex-col sm:flex-row"
        }`}
      >
        {/* Discount Badge */}
        {discountPercentage > 0 && (
          <Badge className="absolute top-2 left-2 sm:top-3 sm:left-3 z-20 bg-gradient-to-r from-red-500 to-pink-500 text-background border-0 shadow-lg text-xs font-bold px-2.5 py-1 rotate-0">
            -{discountPercentage}%
          </Badge>
        )}

        {/* Favorite Icon */}
        <motion.button
          whileHover={{ scale: 1.15, rotate: [0, -10, 10, 0] }}
          whileTap={{ scale: 0.85 }}
          onClick={handleRemove}
          className="absolute top-2 right-2 sm:top-3 sm:right-3 z-20 p-2 bg-background/90 cursor-pointer backdrop-blur-md rounded-full shadow-lg hover:shadow-xl border border-border hover:bg-gradient-to-br hover:from-destructive/30 hover:to-destructive/10 transition-all duration-300"
          aria-label="Remove from favorites"
        >
          <FiHeart className="w-4 h-4 fill-red-500 text-red-500" />
        </motion.button>

        {/* Product Image */}
        <div
          className={`relative bg-gradient-to-br from-muted to-muted/50 overflow-hidden ${
            isGridView
              ? "aspect-square w-full"
              : "w-full sm:w-56 sm:h-56 aspect-square sm:aspect-auto"
          }`}
        >
          <motion.div
            animate={{ scale: isHovered ? 1.02 : 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="w-full h-full"
          >
            <Image
              src={product?.image || ""}
              alt={product.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              unoptimized={product?.image?.startsWith("http://localhost")}
              className="object-cover"
            />
          </motion.div>

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {outOfStock && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center"
            >
              <Badge
                variant="destructive"
                className="text-sm font-semibold px-4 py-1.5 shadow-lg"
              >
                Out of Stock
              </Badge>
            </motion.div>
          )}
        </div>

        {/* Product Info */}
        <div
          className={`flex flex-col flex-1 ${
            isGridView ? "p-4" : "p-4 sm:p-6"
          }`}
        >
          <CardHeader className="p-0 pb-3">
            <CardTitle className="text-foreground text-xl font-semibold line-clamp-2 group-hover:text-primary transition-colors duration-300">
              {product.title}
            </CardTitle>
          </CardHeader>

          <CardContent className="flex-1 p-0 pb-4">
            {product.discount_price && product.discount_price > 0 ? (
              <div className="flex items-baseline gap-2.5">
                <motion.p
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  className="text-2xl font-bold bg-gradient-to-br from-destructive to-destructive/60 bg-clip-text text-transparent"
                >
                  ${product.discount_price.toFixed(2)}
                </motion.p>
                <span className="text-muted-foreground line-through text-sm font-medium">
                  ${product.price.toFixed(2)}
                </span>
              </div>
            ) : (
              <p className="text-2xl font-bold text-foreground">
                ${product.price.toFixed(2)}
              </p>
            )}
            <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
              <span className="w-1 h-1 rounded-full bg-muted-foreground/50" />
              Added{" "}
              {new Date(favoritedAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          </CardContent>

          <CardFooter className="gap-2.5 p-0 mt-auto">
            <Button
              disabled={outOfStock}
              className="flex-1 gap-2 bg-gradient-to-br from-primary via-primary-dark to-primary-dark/80 shadow-md hover:shadow-lg transition-all duration-300 font-medium"
              size="sm"
            >
              <FiShoppingCart className="w-4 h-4" />
              Add to Cart
            </Button>
            <Button
              variant="outline"
              onClick={handleRemove}
              size="sm"
              className="gap-2 hover:bg-destructive hover:text-destructive-foreground hover:border-destructive transition-all duration-300 px-3 shadow-sm"
            >
              <FiTrash2 className="w-4 h-4" />
              <span className="hidden sm:inline font-medium">Remove</span>
            </Button>
          </CardFooter>
        </div>
      </Card>
    </motion.div>
  );
}
