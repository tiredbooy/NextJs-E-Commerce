import { dashboardRole, SideBar, SideBarItem } from "@/app/_lib/types";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { FaHome } from "react-icons/fa";

const sideBarItems: SideBar<dashboardRole> = {
  admin: [
    {
      title: "Dashboard",
      href: "/",
      icon: FaHome,
    },
    {
      title: "Orders",
      href: "/orders",
      icon: FaHome,
    },
    {
      title: "Produts",
      href: "/products",
      icon: FaHome,
    },
    {
      title: "Blogs",
      href: "/blogs",
      icon: FaHome,
    },
    {
      title: "Users",
      href: "/users",
      icon: FaHome,
    },
    {
      title: "Tickets",
      href: "/tickets",
      icon: FaHome,
    },
  ],
  user: [
    {
      title: "Dashboard",
      href: "/",
      icon: FaHome,
    },
    {
      title: "Orders",
      href: "/orders",
      icon: FaHome,
    },
    {
      title: "Profile",
      href: "/",
      icon: FaHome,
    },
  ],
};

interface Props {
  // props here
}

const SideNavigation: React.FC<Props> = ({}) => {
  const items = sideBarItems.admin;

  return (
    <Sidebar className="h-full bg-red-500">
      <SidebarHeader>
        Hello
      </SidebarHeader>
      <SidebarContent>
        {/* <SidebarGroup /> */}
        {/* <SidebarGroup /> */}
        <SidebarMenu className="bg-blue-500">
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                    <Link href={item.href}>
                        <item.icon />
                        <span>{item.title}</span>
                    </Link>
                </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
};

export default SideNavigation;
