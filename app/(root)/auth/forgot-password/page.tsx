import ForgotPassword from "@/app/_components/auth/ForgotPassword";

interface Props {
  // props here'
  searchParams: { email: string };
}

export default async function page({ searchParams }: Props) {
  const { email } = await searchParams;
  return <ForgotPassword emailProp={email ? email : ""} />;
}
