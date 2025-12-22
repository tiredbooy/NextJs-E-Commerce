import ResetPasswordForm from "@/app/_components/auth/ResetPasswordForm";

interface Props {
  // props here
  searchParams: { token: string };
}

export default async function page({ searchParams }: Props) {
  const { token } = await searchParams;
  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-gradient-to-bl from-background via-card to-background p-4">
      <ResetPasswordForm token={token} />;
    </div>
  );
}
