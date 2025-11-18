import { Announcment } from "@/app/_lib/types";
import HeaderItem from "./HeaderItem";
import HeaderUserMenu from "./HeaderUserMenu";

const announcment: Announcment = {
  announcmentTxt: "Sign up and get 20% off your first order.",
  linkTxt: "Sign Up Now",
  href: "/products",
};

async function Header() {
  
  return (
    <>
      <HeaderItem announcment={announcment}>
        <HeaderUserMenu />
      </HeaderItem>
    </>
  );
}

export default Header;
