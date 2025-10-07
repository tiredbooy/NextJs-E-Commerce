import Link from "next/link";
import { FaShoppingBasket, FaUser } from "react-icons/fa";

function HeaderUserMenu() {
  return (
    <div className="flex flex-row items-center gap-5">
      <Link href="account">
        <FaUser className="h-5 w-5 text-muted-foreground hover:text-foreground" />
      </Link>
      <Link href="cart">
        <FaShoppingBasket className="h-5 w-5 text-muted-foreground hover:text-foreground" />
      </Link>
    </div>
  );
}

export default HeaderUserMenu;
