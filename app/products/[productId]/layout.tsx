interface Props {
  children?: React.ReactNode;
}

const ProductDetailLayout: React.FC<Props> = ({ children }) => {
  return (
    <main className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
      {children}
    </main>
  );
};

export default ProductDetailLayout;
