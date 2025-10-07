import Image from "next/image";
import hero from "@/public/hero-suits.jpg";

function HeroBackground() {
  return (
    <div className="relative w-full" style={{ height: "85vh" }}>
      <Image
        src={hero}
        alt="Hero section"
        fill
        className="object-cover"
        priority
      />
      {/* Optional overlay or content */}
      <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
        <h1 className="text-white text-4xl font-bold">Welcome to My Site</h1>
      </div>
    </div>
  );
}

export default HeroBackground;
