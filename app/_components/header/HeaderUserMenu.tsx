import { getCurrentUser } from "@/app/_lib/services/authService";
import Link from "next/link";
import { FaUser } from "react-icons/fa";
import HeaderCartIcon from "./HeaderCartIcon";

async function HeaderUserMenu() {
  const user = await getCurrentUser();
  const path = user?.role === "admin" ? "/admin" : "/account";

  return (
    <div className="flex flex-row items-center gap-5">
      {user ? (
        <Link href={path}>
          <FaUser className="h-5 w-5 text-muted-foreground hover:text-foreground" />
        </Link>
      ) : (
        <Link
          href="/auth/login"
          className="border px-3 py-1 rounded-md text-muted-foreground hover:bg-foreground hover:text-background duration-200 transition-colors"
        >
          Login/Signup
        </Link>
      )}
      <HeaderCartIcon />
    </div>
  );
}

export default HeaderUserMenu;
