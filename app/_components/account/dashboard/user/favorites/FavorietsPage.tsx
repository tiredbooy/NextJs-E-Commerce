"use client";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import {
    FiFilter,
    FiGrid,
    FiHeart,
    FiList
} from "react-icons/fi";
import EmptyFavorites from "./EmptyFavorites";
import FavoritProductCard from "./FavoritProductCard";

// Mock data for favorites
const mockFavorites = [
  {
    id: 1,
    name: "Wireless Headphones Pro",
    price: 299.99,
    originalPrice: 399.99,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop",
    category: "Electronics",
    rating: 4.8,
    reviews: 342,
    inStock: true,
    discount: 25,
    addedDate: "2024-09-15",
  },
  {
    id: 2,
    name: "Premium Leather Wallet",
    price: 79.99,
    originalPrice: null,
    image:
      "https://images.unsplash.com/photo-1627123424574-724758594e93?w=500&h=500&fit=crop",
    category: "Accessories",
    rating: 4.6,
    reviews: 128,
    inStock: true,
    discount: 0,
    addedDate: "2024-09-20",
  },
  {
    id: 3,
    name: "Smart Watch Series X",
    price: 449.99,
    originalPrice: 599.99,
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop",
    category: "Electronics",
    rating: 4.9,
    reviews: 567,
    inStock: false,
    discount: 25,
    addedDate: "2024-08-10",
  },
  {
    id: 4,
    name: "Running Shoes Ultra",
    price: 159.99,
    originalPrice: 199.99,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop",
    category: "Fashion",
    rating: 4.7,
    reviews: 234,
    inStock: true,
    discount: 20,
    addedDate: "2024-09-25",
  },
  {
    id: 5,
    name: "Coffee Maker Deluxe",
    price: 189.99,
    originalPrice: null,
    image:
      "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=500&h=500&fit=crop",
    category: "Home",
    rating: 4.5,
    reviews: 89,
    inStock: true,
    discount: 0,
    addedDate: "2024-09-18",
  },
  {
    id: 6,
    name: "Mechanical Keyboard RGB",
    price: 129.99,
    originalPrice: 179.99,
    image:
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&h=500&fit=crop",
    category: "Electronics",
    rating: 4.8,
    reviews: 445,
    inStock: true,
    discount: 28,
    addedDate: "2024-09-12",
  },
];

function FavoritesPage() {
  const [favorites, setFavorites] = useState(mockFavorites);
  const [viewMode, setViewMode] = useState("grid"); // 'grid' or 'list'
  const [sortBy, setSortBy] = useState("recent");
  const [filterCategory, setFilterCategory] = useState("all");

  // Get unique categories
  const categories = [
    "all",
    ...new Set(mockFavorites.map((item) => item.category)),
  ];

  // Filter and sort favorites
  const filteredFavorites = favorites
    .filter((item) =>
      filterCategory === "all" ? true : item.category === filterCategory
    )
    .sort((a, b) => {
      switch (sortBy) {
        case "recent":
          return new Date(b.addedDate) - new Date(a.addedDate);
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "rating":
          return b.rating - a.rating;
        default:
          return 0;
      }
    });

  const handleRemove = (id) => {
    setFavorites(favorites.filter((item) => item.id !== id));
  };

  const handleAddToCart = (product) => {
    console.log("Adding to cart:", product);
    // Implement your add to cart logic here
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-2">
          <FiHeart className="w-8 h-8 text-primary" />
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">
            My Favorites
          </h1>
        </div>
        <p className="text-muted-foreground">
          You have {filteredFavorites.length} favorite{" "}
          {filteredFavorites.length !== 1 ? "items" : "item"}
        </p>
      </motion.div>

      {favorites.length === 0 ? (
        <EmptyFavorites />
      ) : (
        <>
          {/* Toolbar */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-6 p-4 bg-card border border-border rounded-lg"
          >
            <div className="flex flex-wrap gap-3 items-center">
              {/* Category Filter */}
              <div className="flex items-center gap-2">
                <FiFilter className="w-4 h-4 text-muted-foreground" />
                <Select
                  value={filterCategory}
                  onValueChange={setFilterCategory}
                >
                  <SelectTrigger className="w-[140px] bg-background border-input">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat.charAt(0).toUpperCase() + cat.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Sort */}
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[160px] bg-background border-input">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recent">Most Recent</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* View Mode Toggle */}
            <div className="flex gap-2 items-center bg-muted rounded-lg p-1">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className={
                  viewMode === "grid"
                    ? "bg-primary text-primary-foreground"
                    : ""
                }
              >
                <FiGrid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
                className={
                  viewMode === "list"
                    ? "bg-primary text-primary-foreground"
                    : ""
                }
              >
                <FiList className="w-4 h-4" />
              </Button>
            </div>
          </motion.div>

          {/* Products Grid/List */}
          <AnimatePresence mode="popLayout">
            {filteredFavorites.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <p className="text-muted-foreground">
                  No items found in this category.
                </p>
              </motion.div>
            ) : (
              <motion.div
                layout
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                    : "flex flex-col gap-4"
                }
              >
                {filteredFavorites.map((product) => (
                  <FavoritProductCard
                    key={product.id}
                    product={product}
                    onRemove={handleRemove}
                    onAddToCart={handleAddToCart}
                    viewMode={viewMode}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </div>
  );
}

export default FavoritesPage;
