import Login from "@/app/_components/auth/Login";
import Header from "@/app/_components/header/Header";

interface Props {
  // props here
}

export default function page({}: Props) {
  return (
    <>
      <Login />
    </>
  );
}
