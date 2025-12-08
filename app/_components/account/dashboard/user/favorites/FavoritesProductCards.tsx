"use client"
import { AnimatePresence, motion } from "framer-motion";
import FavoriteProductCard from "./FavoriteProductCard";
import { useState } from "react";
import { Favorites } from "@/app/_lib/types/user_types";

interface Props {
  favorites: Favorites[]
}

export default function FavoritesProductCards({favorites}: Props) {
  const [viewMode, setViewMode] = useState<"list"| "grid">("grid");
  return (
    <AnimatePresence mode="popLayout">
      <motion.div
        layout
        className={
          viewMode === "grid"
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6"
            : "flex flex-col gap-4"
        }
      >
        {favorites.map((f) => (
          <FavoriteProductCard
            key={f.product.id}
            product={f.product}
            favoritedAt={f.created_at}
            viewMode={viewMode}
          />
        ))}
      </motion.div>
    </AnimatePresence>
  );
}
