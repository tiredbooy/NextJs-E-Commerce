import Image from "next/image";
import logo from "@/public/logo.png";
import Link from "next/link";
import clsx from "clsx"; // optional: for conditional classNames

interface HeaderLogoProps {
  role?: "header" | "sideNav";
}

export default function HeaderLogo({ role = "header" }: HeaderLogoProps) {
  return (
    <Link
      href="/"
      className={clsx(
        "flex items-center transition-all",
        role === "header" && "gap-2",
        role === "sideNav" && "justify-center flex-col py-4"
      )}
    >
      <div
        className={clsx(
          "relative",
          role === "header" ? "w-14 h-14" : "w-20 h-20"
        )}
      >
        <Image
          src={logo}
          alt="logo"
          className="object-contain"
          fill
          priority
        />
      </div>

      {role === "sideNav" && (
        <span className="text-xl font-semibold text-accent-foreground">Velisse</span>
      )}
    </Link>
  );
}
