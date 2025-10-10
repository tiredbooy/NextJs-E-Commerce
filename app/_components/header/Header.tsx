import { Announcment } from "@/app/_lib/types";
import AnnouncementBar from "./AnnouncementBar";
import HeaderLogo from "./HeaderLogo";
import HeaderNav from "./HeaderNav";
import HeaderSearch from "./HeaderSearch";
import HeaderUserMenu from "./HeaderUserMenu";

const announcment: Announcment = {
  announcmentTxt: "Sign up and get 20% off your first order.",
  linkTxt: "Sign Up Now",
  href: "/products",
};

function Header() {
  return (
    <header className="flex flex-col ">
      {announcment && (
        <div>
          <AnnouncementBar announcmentObj={announcment} />
        </div>
      )}
      <div className=" flex-row justify-between items-center bg-accent h-fit p-4 hidden sm:flex">
        <HeaderLogo />
        <HeaderNav />
        <HeaderSearch />
        <HeaderUserMenu />
      </div>
    </header>
  );
}

export default Header;
