import Header from "@/app/_components/header/Header";
import Footer from "@/app/_components/reusable/Footer";

interface Props {
  children?: React.ReactNode;
}

const ProductDetailLayout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <Header />
      <main className="w-full max-w-screen mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
        {children}
      </main>
      <Footer />
    </>
  );
};

export default ProductDetailLayout;
