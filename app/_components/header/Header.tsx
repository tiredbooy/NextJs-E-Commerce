import { Announcment } from "@/app/_lib/types";
import HeaderItem from "./HeaderItem";
import HeaderUserMenu from "./HeaderUserMenu";
import { Suspense } from "react";
import { Spinner } from "@/components/ui/spinner";

const announcment: Announcment = {
  announcmentTxt: "Sign up and get 20% off your first order.",
  linkTxt: "Sign Up Now",
  href: "/products",
};

async function Header() {
  return (
    <>
      <HeaderItem announcment={announcment}>
        <Suspense fallback={<Spinner />}>
          <HeaderUserMenu />
        </Suspense>
      </HeaderItem>
    </>
  );
}

export default Header;
