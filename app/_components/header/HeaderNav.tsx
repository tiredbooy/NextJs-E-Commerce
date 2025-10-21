import Link from "next/link";
import { IoIosArrowDown } from "react-icons/io";

interface DropDown {
  title: string;
  href: string;
  icon?: React.ElementType;
}

interface NavItems {
  title: string;
  href: string;
  icon?: React.ElementType;
  dropdown?: DropDown[];
}

const navItems: NavItems[] = [
  {
    title: "Shop",
    href: "/products",
    icon: IoIosArrowDown,
    dropdown: [{ title: "Casual", href: "/products/?category=casual" }],
  },
  { title: "On Sale", href: "/products/?onSale=true" },
  { title: "New Arrivals", href: "/products/?date=new" },
  { title: "Brands", href: "/products/" },
];

function HeaderNav() {
  return (
    <ul className="flex flex-row items-center justify-between gap-6 px-4">
      {navItems.map((item, i) => (
        <li key={i} className="relative group">
          <Link
            href={item.href}
            className="flex items-center gap-1 text-accent-foreground dark:text-gray-100 transition-colors hover:text-foreground"
          >
            {item.title}
            {item.icon && <item.icon className="text-sm" />}
          </Link>

          {/* Underline animation */}
          <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-foreground transition-all duration-300 group-hover:w-full group-hover:right-0"></span>
        </li>
      ))}
    </ul>
  );
}

export default HeaderNav;
