import React from "react";
import { Badge } from "@/components/ui/badge";
import CategoryCardItem from "./CategoryCards";
import formalImage from "@/public/formalCategory.jpeg";
import casualImage from "@/public/casualCategory.jpeg";
import partyImage from "@/public/partyCategory.jpeg";
import sportImage from "@/public/sportCategory.jpeg";

// Mock images for demo - replace with your actual imports
const categories = [
  {
    title: "Formal",
    image: formalImage,
    description: "Elegant attire for professional occasions",
  },
  {
    title: "Sport",
    image: partyImage,
    description: "Active wear for your fitness journey",
  },
  {
    title: "Casual",
    image: casualImage,
    description: "Comfortable styles for everyday wear",
  },
  {
    title: "Party",
    image: sportImage,
    description: "Stand out at your next celebration",
  },
];

const CategorySection = () => {
  return (
    <section className="w-full h-fit bg-background flex flex-col py-12 md:py-20 px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
            Shop by Category
          </h2>
          <p className="text-muted-foreground text-lg mx-auto">
            Discover your perfect style across our curated collections
          </p>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {categories.map((category, index) => (
            <CategoryCardItem key={index} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
