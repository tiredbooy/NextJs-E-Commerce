import { Announcment } from "@/app/_lib/types";
import AnnouncementBar from "./AnnouncementBar";
import HeaderItem from "./HeaderItem";

const announcment: Announcment = {
  announcmentTxt: "Sign up and get 20% off your first order.",
  linkTxt: "Sign Up Now",
  href: "/products",
};

function Header() {
  return (
    <>
      
      <HeaderItem announcment={announcment} />
    </>
  );
}

export default Header;
