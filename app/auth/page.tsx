import Auth from "../_components/auth/Auth";
import Header from "../_components/header/Header";

interface Props {
  // props here
}

export default function Page({}: Props) {
  return (
    <>
      <Header />
      <Auth />
    </>
  );
}
