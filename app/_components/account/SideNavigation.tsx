"use client";

import { UserRole, SideBar } from "@/app/_lib/types";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { redirect, usePathname } from "next/navigation";
import { CiRouter } from "react-icons/ci";
import { RiCoupon2Line } from "react-icons/ri";
import {
  HiOutlineChatAlt2,
  HiOutlineCog,
  HiOutlineCube,
  HiOutlineHeart,
  HiOutlineHome,
  HiOutlineLogout,
  HiOutlineShoppingBag,
  HiOutlineUser,
  HiOutlineUsers,
} from "react-icons/hi";
import HeaderLogo from "../header/Logo";
import { useTransition } from "react";
import { logout } from "@/app/_lib/actions/authAction";
import { toast } from "sonner";

export const sideBarItems: SideBar<UserRole> = {
  admin: [
    { title: "Dashboard", href: "/admin", icon: HiOutlineHome },
    { title: "Orders", href: "/admin/orders", icon: HiOutlineShoppingBag },
    { title: "Products", href: "/admin/products", icon: HiOutlineCube },
    { title: "Api Monitoring", href: "/admin/api-monitor", icon: CiRouter },
    { title: "Manage Coupons", href: "/admin/coupons", icon: RiCoupon2Line },
    // NO SUPPORT FOR NOW { title: "Blogs", href: "/admin/blogs", icon: HiOutlineNewspaper },
    { title: "Users", href: "/admin/users", icon: HiOutlineUsers },
    { title: "Tickets", href: "/admin/tickets", icon: HiOutlineChatAlt2 },
    { title: "Settings", href: "/admin/settings", icon: HiOutlineCog },
  ],
  user: [
    { title: "Dashboard", href: "/account", icon: HiOutlineHome },
    { title: "Orders", href: "/account/orders", icon: HiOutlineShoppingBag },
    { title: "Profile", href: "/account/profile", icon: HiOutlineUser },
    {
      title: "Favorites",
      href: "/account/favorites",
      icon: HiOutlineHeart,
    },
    { title: "Support", href: "/account/tickets", icon: HiOutlineChatAlt2 },
  ],
};

interface Props {
  role: UserRole;
  onLogout?: () => void;
}

const SideNavigation: React.FC<Props> = ({ role = "user", onLogout }) => {
  const items = sideBarItems[role];
  const pathname = usePathname();

  const [isPending, startTransition] = useTransition();

  const handleLogout = () => {
    startTransition(async () => {
      const result = await logout();
      if (result.success) {
        toast.success(result.message);
        redirect("/auth/login");
      } else {
        toast.error(result.message);
      }
    });
  };

  // Check if current path matches the item href
  const isActive = (href: string) => {
    if (href === "/admin" || href === "/account") {
      return pathname === href;
    }
    return pathname?.startsWith(href);
  };

  return (
    <Sidebar className="flex flex-col h-screen">
      {/* Header */}
      <SidebarHeader className="border-b px-6 py-5">
        <HeaderLogo role="sideNav" />
      </SidebarHeader>

      {/* Main Content - Scrollable */}
      <SidebarContent className="flex-1 overflow-y-auto">
        <SidebarGroup>
          <SidebarGroupLabel className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Menu
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="flex flex-col gap-1 px-3">
              {items.map((item) => {
                const active = isActive(item.href);
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={active}>
                      <Link
                        href={item.href}
                        className={cn(
                          "flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200",
                          active
                            ? "bg-primary text-primary-foreground font-medium shadow-sm"
                            : "hover:bg-accent hover:text-accent-foreground"
                        )}
                        aria-label={item.title}
                        aria-current={active ? "page" : undefined}
                      >
                        <item.icon
                          className="w-5 h-5 flex-shrink-0"
                          aria-hidden="true"
                        />
                        <span className="text-sm">{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer - Always at bottom */}
      <SidebarFooter className="border-t mt-auto">
        <div className="p-3">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-2.5 rounded-lg text-destructive hover:bg-destructive/10 transition-all duration-200 font-medium"
            aria-label="Logout from account"
          >
            <HiOutlineLogout
              className="w-5 h-5 flex-shrink-0"
              aria-hidden="true"
            />
            <span className="text-sm">Logout</span>
          </button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default SideNavigation;
