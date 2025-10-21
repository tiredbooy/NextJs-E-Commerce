"use client";

// import { useTheme } from "next-themes";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSidebar } from "@/components/ui/sidebar";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  HiOutlineLogout,
  HiOutlineMenu,
  HiOutlineMoon,
  HiOutlineSun,
} from "react-icons/hi";

interface Props {
  userName?: string;
  userAvatar?: string;
  onLogout?: () => void;
}

const HeaderNavigation: React.FC<Props> = ({
  userName = "Mahdi Kazemi",
  userAvatar,
}) => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { toggleSidebar } = useSidebar();

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Get user initials for fallback
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        {/* Left Section - Mobile Menu + User Info */}
        <div className="flex items-center gap-3">
          {/* Mobile Sidebar Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={toggleSidebar}
            aria-label="Toggle sidebar"
          >
            <HiOutlineMenu className="h-5 w-5" />
          </Button>

          {/* User Profile */}
          <div className="flex items-center gap-3">
            <Avatar className="h-9 w-9">
              <AvatarImage src={userAvatar} alt={userName} />
              <AvatarFallback className="text-xs font-medium">
                {getInitials(userName)}
              </AvatarFallback>
            </Avatar>
            <div className="hidden sm:block">
              <p className="text-sm font-medium leading-none">{userName}</p>
              <p className="text-xs text-muted-foreground mt-1">Welcome back</p>
            </div>
          </div>
        </div>

        {/* Right Section - Theme Switcher + Logout */}
        <div className="flex items-center gap-2">
          {/* Theme Switcher Dropdown */}
          {mounted && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9"
                  aria-label="Toggle theme"
                >
                  {theme === "dark" ? (
                    <HiOutlineMoon className="h-5 w-5" />
                  ) : (
                    <HiOutlineSun className="h-5 w-5" />
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme("light")}>
                  <HiOutlineSun className="mr-2 h-4 w-4" />
                  Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                  <HiOutlineMoon className="mr-2 h-4 w-4" />
                  Dark
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>
                  <HiOutlineMenu className="mr-2 h-4 w-4" />
                  System
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          {/* Logout Button */}
          <Link href="/auth">
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 text-destructive hover:text-destructive hover:bg-destructive/10 cursor-pointer"
              aria-label="Logout"
            >
              <HiOutlineLogout className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default HeaderNavigation;
