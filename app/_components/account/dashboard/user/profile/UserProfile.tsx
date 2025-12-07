import { getCurrentUser } from "@/app/_lib/services/authService";
import { Separator } from "@/components/ui/separator";
import UserProfileForm from "./UserProfileForm";
import UserProfilePicture from "./UserProfilePicture";
import { User } from "@/app/_lib/types/user_types";

async function UserProfile({}) {
  const profileData: User = await getCurrentUser()
  return (
    <div className="px-10 py-12 rounded-md bg-card border max-w-4xl mx-auto w-full flex flex-col gap-5">
      <UserProfilePicture profileData={profileData} />
      <Separator />
      <UserProfileForm profileData={profileData} />
    </div>
  );
}

export default UserProfile;
