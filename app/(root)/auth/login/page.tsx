import Login from "@/app/_components/auth/Login"

interface Props {
  // props here
  searchParams : {error?: string}
}

export default async function page({searchParams}: Props) {
  return (
      <Login />
  );
}
