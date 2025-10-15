// components/product/ProductDetailLayout.tsx (Server Component)
import ProductThumbnail from "./ProductThumbnail";
import ProductInformation from "./ProductInformation";
import { Product } from "@/app/_lib/types";

interface Props {
  product: Product;
}

const ProductDetailLayout: React.FC<Props> = ({ product }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Product Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        <ProductThumbnail
          productTitle={product.title}
          images={product.images}
        />
        <ProductInformation product={product} />
      </div>

      {/* Reviews Section - Add later */}
      <div className="mt-16">
        {/* <ProductReviews productId={product.id} /> */}
      </div>

      {/* Related Products Section - Add later */}
      <div className="mt-16">
        {/* <RelatedProducts category={product.category} /> */}
      </div>
    </div>
  );
};

export default ProductDetailLayout;
