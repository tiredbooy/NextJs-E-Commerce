import HeaderSearch from "./HeaderSearch";
import AnnouncementBar from "./AnnouncementBar";
import HeaderNav from "./HeaderNav";
import HeaderLogo from "./HeaderLogo";
import HeaderUserMenu from "./HeaderUserMenu";
import { Announcment } from "@/app/_lib/types";

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
      <div className=" flex-row justify-between items-center bg-accent h-fit p-4 hidden md:flex">
        <HeaderLogo />
        <HeaderNav />
        <HeaderSearch />
        <HeaderUserMenu />
      </div>
    </header>
  );
}

export default Header;
