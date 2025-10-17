import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import SideNavigation from "../_components/account/SideNavigation";
import HeaderNavigation from "../_components/account/HeaderNavigation";

interface Props {
  // props here
  children: React.ReactNode;
}

const layout: React.FC<Props> = ({ children }) => {
  return (
    <div className="h-full">
      <SidebarProvider>
        <SideNavigation />
        <main className="max-w-screen w-full">
          <HeaderNavigation />
          <div className="px-4 py-3">
            <SidebarTrigger className="block md:hidden" />
            {children}
          </div>
        </main>
      </SidebarProvider>
    </div>
  );
};

export default layout;
