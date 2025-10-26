import Signup from "@/app/_components/auth/Signup";
import Header from "@/app/_components/header/Header";

interface Props {
  // props here
}

export default function page({}: Props) {
  return (
    <>
      <Header />
      <Signup />
    </>
  );
}
