import { Input } from "@/components/ui/input";
import { FaSearch } from "react-icons/fa";

export default function HeaderSearch() {
  return (
    <div className="relative w-full max-w-1/4 group">
      <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus:text-foreground z-10 cursor-pointer" />
      <Input
        type="search"
        placeholder="Search for products"
        className="pl-10 border-border-hover focus:border-border-focus" // adds padding to make room for the icon
      />
    </div>
  );
}
