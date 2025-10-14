import { SearchParams } from "next/dist/server/request/search-params";
import FilterBar from "../_components/products/filter/FilterBar";
import ProductsCards from "../_components/products/ProductsCards";
import ProductsHeader from "../_components/products/ProductsHeader";
import SortBy from "../_components/products/SortBy";

interface Props {
  children?: React.ReactNode;
}

const Layout: React.FC<Props> = ({children}) => {
  return (
    <>
      <ProductsHeader />

      <main className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
        {children}
      </main>
    </>
  );
};

export default Layout;
