"use client";
import { CategoryCard } from "@/app/_lib/types";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";

interface Props {
  category: CategoryCard;
}

export default function CategoryCardItem({ category }: Props) {
  return (
    <Link
      href={category.href ? category.href : "/products"}
      className="group relative overflow-hidden rounded-2xl cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl"
    >
      {/* Image Container */}
      <div className="relative aspect-[4/5] overflow-hidden bg-muted">
        <Image
          src={category.image}
          alt={category.title}
          fill
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

        {/* Content Overlay */}
        <div className="absolute inset-0 p-6 flex flex-col justify-between">
          {/* Badge at top */}
          <div className="flex justify-start">
            <Badge className="bg-white/90 text-black hover:bg-white font-semibold text-sm px-4 py-1.5 backdrop-blur-sm">
              {category.title}
            </Badge>
          </div>

          {/* Description at bottom */}
          <div className="transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
            <p className="text-white text-sm font-medium leading-relaxed">
              {category.description}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
