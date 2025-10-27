import { SidebarProvider } from "@/components/ui/sidebar";

interface Props {
  // props here
  children: React.ReactNode;
}

const DashboardLayout: React.FC<Props> = ({ children }) => {
  return (
    <div className="h-full">
      <SidebarProvider>
        {children}
      </SidebarProvider>
    </div>
  );
};

export default DashboardLayout;
