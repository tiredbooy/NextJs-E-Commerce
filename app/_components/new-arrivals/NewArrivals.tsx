import { Product } from "@/app/_lib/types";
import productImage from "@/public/a.jpg";
import React from "react";
import NewArrivalProducts from "./NewArrivalProducts";
import NewArrivalHeader from "./SectionHeader";
import SwiperProducts from "./NewArrivalProducts";

export const products: Product[] = [
  {
    id: 1,
    title: "White T-Shirt",
    description: "White Compression T-Shirt For Showing Good Body part",
    price: 19.99,
    discount_price: 10,
    sizes: [
      { id: 1, size: "M" },
      { id: 1, size: "L" },
    ],
    colros: [{ id: 1, title: "black" }],
    category: [{ id: 1, title: "T-Shirts" }],
    images: [{ id: 1, url: productImage }],
    stock_quantity: 10,
    sales: 1,
    created_at: new Date().toISOString(),
  },
  {
    id: 2,
    title: "Black T-Shirt",
    description: "White Compression T-Shirt For Showing Good Body part",
    price: 19.99,
    discount_price: 14.99,
    sizes: [
      { id: 1, size: "M" },
      { id: 1, size: "L" },
    ],
    colros: [{ id: 1, title: "black" }],
    category: [{ id: 1, title: "T-Shirts" }],
    images: [{ id: 1, url: productImage }],
    stock_quantity: 10,
    sales: 1,
    created_at: new Date().toISOString(),
  },
  {
    id: 3,
    title: "Green T-Shirt",
    description: "White Compression T-Shirt For Showing Good Body part",
    price: 19.99,
    discount_price: 9.99,
    sizes: [
      { id: 1, size: "M" },
      { id: 1, size: "L" },
    ],
    colros: [{ id: 1, title: "black" }],
    category: [{ id: 1, title: "T-Shirts" }],
    images: [{ id: 1, url: productImage }],
    stock_quantity: 10,
    sales: 1,
    created_at: new Date().toISOString(),
  },
  {
    id: 4,
    title: "Green T-Shirt",
    description: "White Compression T-Shirt For Showing Good Body part",
    price: 19.99,
    sizes: [
      { id: 1, size: "M" },
      { id: 1, size: "L" },
    ],
    colros: [{ id: 1, title: "black" }],
    category: [{ id: 1, title: "T-Shirts" }],
    images: [{ id: 1, url: productImage }],
    stock_quantity: 10,
    sales: 1,
    created_at: new Date().toISOString(),
  },
  {
    id: 5,
    title: "Green T-Shirt",
    description: "White Compression T-Shirt For Showing Good Body part",
    price: 19.99,
    sizes: [
      { id: 1, size: "M" },
      { id: 1, size: "L" },
    ],
    colros: [{ id: 1, title: "black" }],
    category: [{ id: 1, title: "T-Shirts" }],
    images: [{ id: 1, url: productImage }],
    stock_quantity: 10,
    sales: 1,
    created_at: new Date().toISOString(),
  },
];

const NewArrivals: React.FC = ({}) => {
  return (
    <section className="w-full max-w-screen h-screen bg-background flex flex-col py-8 md:py-20 px-4 md:px-8 items-center">
      <NewArrivalHeader />

      <SwiperProducts products={products} usage="New" />
    </section>
  );
};

export default NewArrivals;
