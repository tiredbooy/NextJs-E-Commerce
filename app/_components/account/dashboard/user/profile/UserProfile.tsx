import { getCurrentUser } from "@/app/_lib/services/authService";
import { getUserAddress } from "@/app/_lib/services/userService";
import { Separator } from "@/components/ui/separator";
import UserProfileForm from "./UserProfileForm";
import UserProfilePicture from "./UserProfilePicture";

async function UserProfile({}) {
  const [profileData, address] = await Promise.all([
    getCurrentUser(),
    getUserAddress()
  ])
  return (
    <div className="px-10 py-12 rounded-md bg-card border max-w-4xl mx-auto w-full flex flex-col gap-5">
      <UserProfilePicture profileData={profileData} />
      <Separator />
      <UserProfileForm profileData={profileData} addressData={address} />
    </div>
  );
}

export default UserProfile;
