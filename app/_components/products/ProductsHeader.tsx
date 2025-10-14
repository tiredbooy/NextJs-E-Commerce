import Image from "next/image";
import headerImg from "@/public/yichen-wang-4gudySb9j00-unsplash.jpg";

function ProductsHeader() {
  return (
    <header className="relative w-screen h-[45vh] sm:h-[55vh] lg:h-[65vh] overflow-hidden">
      {/* Background Image */}
      <div className="relative w-full h-full">
        <Image
          src={headerImg}
          alt="Velisse Collection"
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Text Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 sm:px-8">
        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-serif font-semibold text-white tracking-wide drop-shadow-lg">
          The Velisse Collection
        </h1>
        <p className="mt-4 text-sm sm:text-base lg:text-lg text-gray-200 drop-shadow-md leading-relaxed">
          Timeless elegance meets modern sophistication. Each piece by Velisse
          is crafted to embody the art of luxury—where design, detail, and
          refinement converge in perfect harmony.
        </p>
      </div>
    </header>
  );
}

export default ProductsHeader;
