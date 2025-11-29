import ProductThumbnail from "@/app/_components/products/product-details/ProductThumbnail";
import ProductInformation from "@/app/_components/products/product-details/ProductInformation";
import { Product } from "@/app/_lib/types";
import image1 from "@/public/1.jpg"
import image2 from "@/public/a.jpg"
import image3 from "@/public/aiony-haust-K0DxxljcRv0-unsplash.jpg"
import image4 from "@/public/alireza-dolati-OVS3rqXq9gg-unsplash.jpg"
import ProductDetailLayout from "@/app/_components/products/product-details/ProductDetailLayout";
import { getProductById } from "@/app/_lib/services/productsService";

interface Props {
  // props here
  params: {productId: number}
}

const page: React.FC<Props> = async ({params}) => {
  const {productId} = await params;
  // const sampleProduct: Product = {
  //   id: 1,
  //   title: "Premium Cotton T-Shirt",
  //   description:
  //     "Experience ultimate comfort with our premium cotton t-shirt. Made from 100% organic cotton, this versatile piece features a modern fit and exceptional durability. Perfect for everyday wear or layering.",
  //   price: 49.99,
  //   discount_price: 29.99,
  //   sizes: [
  //     { id: 1, size: "XS" },
  //     { id: 2, size: "S" },
  //     { id: 3, size: "M" },
  //     { id: 4, size: "L" },
  //     { id: 5, size: "XL" },
  //   ],
  //   colros: [
  //     { id: 1, title: "black" },
  //     { id: 2, title: "white" },
  //     { id: 3, title: "blue" },
  //     { id: 4, title: "red" },
  //   ],
  //   category: [
  //     { id: 1, title: "T-Shirts" },
  //     { id: 2, title: "New Arrivals" },
  //   ],
  //   images: [
  //       { id: 1, url: image1 },
  //       { id: 2, url: image2 },
  //       { id: 3, url: image3 },
  //       { id: 4, url: image4 },
  //   ],
  //   stock_quantity: 3,
  //   sales: 247,
  //   created_at: new Date().toISOString(),
  // };

  const product = await getProductById(productId)
console.log('product:', product);
  return <ProductDetailLayout product={product} />
};

export default page;
