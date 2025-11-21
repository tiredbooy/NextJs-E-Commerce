import HeaderNavigation from "@/app/_components/account/HeaderNavigation";
import SideNavigation from "@/app/_components/account/SideNavigation";
import { getCurrentSession, getCurrentUser } from "@/app/_lib/services/authService";

interface Props {
  // props here
  children: React.ReactNode;
}

const DashboardLayout: React.FC<Props> = async ({ children }) => {
  const user = await getCurrentUser();
  const fullName = `${user.first_name} ${user.last_name}`;

  return (
    <>
      <SideNavigation role={user?.role} />
      <main className="max-w-screen w-full">
        <HeaderNavigation userName={fullName} userAvatar={user?.image || ""} />
        <div className="px-4 py-3">{children}</div>
      </main>
    </>
  );
};

export default DashboardLayout;
