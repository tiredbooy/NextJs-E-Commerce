import OAuthBtns from "@/app/_components/auth/OAuthBtns";
import Signup from "@/app/_components/auth/Signup";

interface Props {
  // props here
  searchParams: {
    email: string;
    name: string;
    image: string;
    oauth_provider: string;
    oauth_id: string;
  };
}

export default async function page({ searchParams }: Props) {
  const { email, name, image, oauth_provider, oauth_id } = await searchParams;
  const defaultValues = { email, name, image, oauth_provider, oauth_id };
  return (
    <>
      <Signup defaultValues={defaultValues}>
        <OAuthBtns />
      </Signup>
    </>
  );
}
