import Image from "next/image";
import logo from "@/public/logo.png";
import Link from "next/link";

function HeaderLogo() {
  return (
    <Link href="/" className="flex flex-row gap-2 items-center">
      <div className="w-14 h-14 relative text-center">
        <Image src={logo} alt="logo" className="object-contain" fill />
      </div>
    </Link>
  );
}

export default HeaderLogo;
