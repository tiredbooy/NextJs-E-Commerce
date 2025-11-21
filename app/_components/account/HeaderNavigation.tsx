import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  HiOutlineLogout
} from "react-icons/hi";
import ThemeSwitcher from "./ThemeSwitcher";
import ToggleSidebar from "./ToggleSidebar";

interface Props {
  userName?: string;
  userAvatar?: string;
  onLogout?: () => void;
}

const HeaderNavigation: React.FC<Props> = ({ userName = "", userAvatar }) => {

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
          

          <ToggleSidebar />

          {/* User Profile */}
          <div className="flex items-center gap-3">
            <Avatar className="h-9 w-9">
              <AvatarImage src={userAvatar} alt={userName} />
              <AvatarFallback className="text-xs font-medium">
                {getInitials(userName)}
              </AvatarFallback>
            </Avatar>
            <div className="hidden sm:block">
              <p className="text-sm font-medium leading-none first-letter:uppercase">
                {userName}
              </p>
              <p className="text-xs text-muted-foreground mt-1">Welcome back</p>
            </div>
          </div>
        </div>

        {/* Right Section - Theme Switcher + Logout */}
        <div className="flex items-center gap-2">
          {/* Theme Switcher Dropdown */}
            <ThemeSwitcher />
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
