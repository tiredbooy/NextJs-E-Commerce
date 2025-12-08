import { getInitials } from "@/app/_lib/utils/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Logout from "./Logout";
import ThemeSwitcher from "./ThemeSwitcher";
import ToggleSidebar from "./ToggleSidebar";

interface Props {
  userName?: string;
  userAvatar?: string;
  onLogout?: () => void;
}

const HeaderNavigation: React.FC<Props> = ({ userName = "", userAvatar }) => {
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
          <Logout />
        </div>
      </div>
    </header>
  );
};

export default HeaderNavigation;
