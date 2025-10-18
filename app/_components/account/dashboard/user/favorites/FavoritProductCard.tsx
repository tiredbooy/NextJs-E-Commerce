import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import {
    FiHeart,
    FiShoppingCart,
    FiTrash2
} from "react-icons/fi";
import { IoStarSharp } from "react-icons/io5";


export default function FavoritProductCard({ product, onRemove, onAddToCart, viewMode }) {
  const [isRemoving, setIsRemoving] = useState(false);

  const handleRemove = () => {
    setIsRemoving(true);
    setTimeout(() => onRemove(product.id), 300);
  };

  const isGridView = viewMode === "grid";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: isRemoving ? 0 : 1, scale: isRemoving ? 0.9 : 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className={isGridView ? "" : "w-full"}
    >
      <Card
        className={`group relative overflow-hidden border-border bg-card hover:shadow-xl transition-all duration-300 h-full ${
          isGridView ? "" : "flex flex-row"
        }`}
      >
        {/* Discount Badge */}
        {product.discount > 0 && (
          <Badge className="absolute top-3 left-3 z-10 bg-sale-badge text-sale-badge-foreground">
            -{product.discount}%
          </Badge>
        )}

        {/* Favorite Icon */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleRemove}
          className="absolute top-3 right-3 z-10 p-2 bg-background/80 backdrop-blur-sm rounded-full shadow-md hover:bg-destructive hover:text-destructive-foreground transition-colors"
        >
          <FiHeart className="w-5 h-5 fill-destructive text-destructive" />
        </motion.button>

        {/* Product Image */}
        <div
          className={`relative bg-muted overflow-hidden ${
            isGridView ? "aspect-square" : "w-48 h-full"
          }`}
        >
          <img
            src={product.image}
            alt={product.name}
            // fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
          />
          {!product.inStock && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
              <Badge variant="destructive" className="text-sm">
                Out of Stock
              </Badge>
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className={`flex flex-col flex-1 ${isGridView ? "" : "p-6"}`}>
          <CardHeader className={isGridView ? "" : "p-0 pb-4"}>
            <div className="flex items-start justify-between gap-2 mb-2">
              <Badge variant="secondary" className="text-xs">
                {product.category}
              </Badge>
              <div className="flex items-center gap-1">
                <IoStarSharp className="w-4 h-4 text-rating-star fill-rating-star" />
                <span className="text-sm font-medium text-foreground">
                  {product.rating}
                </span>
                <span className="text-xs text-muted-foreground">
                  ({product.reviews})
                </span>
              </div>
            </div>
            <CardTitle className="text-lg line-clamp-2 group-hover:text-primary transition-colors">
              {product.name}
            </CardTitle>
          </CardHeader>

          <CardContent className={`flex-1 ${isGridView ? "" : "p-0 pb-4"}`}>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-primary">
                ${product.price}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-muted-foreground line-through">
                  ${product.originalPrice}
                </span>
              )}
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Added on {new Date(product.addedDate).toLocaleDateString()}
            </p>
          </CardContent>

          <CardFooter
            className={`gap-2 mt-4 ${isGridView ? "" : "p-0"} flex-row`}
          >
            <Button
              onClick={() => onAddToCart(product)}
              disabled={!product.inStock}
              className="flex-1 gap-2 bg-primary-dark hover:bg-primary text-primary-foreground"
              size={isGridView ? "default" : "sm"}
            >
              <FiShoppingCart className="w-4 h-4" />
              Add to Cart
            </Button>
            <Button
              variant="outline"
              onClick={handleRemove}
              size={isGridView ? "default" : "sm"}
              className="gap-2 hover:bg-destructive hover:text-destructive-foreground hover:border-destructive"
            >
              <FiTrash2 className="w-4 h-4" />
              {isGridView ? "Remove" : ""}
            </Button>
          </CardFooter>
        </div>
      </Card>
    </motion.div>
  );
}
