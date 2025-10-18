import { Separator } from "@/components/ui/separator";
import UserProfileForm from "./UserProfileForm";
import UserProfilePicture from "./UserProfilePicture";

async function UserProfile({}) {

  return (
    <div className="px-10 py-12 rounded-md bg-card border max-w-4xl mx-auto w-full flex flex-col gap-5">
      <UserProfilePicture />
      <Separator />
      <UserProfileForm />
    </div>
  );
}

export default UserProfile;
