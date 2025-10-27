import HeaderNavigation from "@/app/_components/account/HeaderNavigation";
import SideNavigation from "@/app/_components/account/SideNavigation";

interface Props {
  // props here
  children: React.ReactNode;
}

const DashboardLayout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <SideNavigation role="user" />
      <main className="max-w-screen w-full">
        <HeaderNavigation />
        <div className="px-4 py-3">
          {children}
        </div>
      </main>
    </>
  );
};

export default DashboardLayout;
