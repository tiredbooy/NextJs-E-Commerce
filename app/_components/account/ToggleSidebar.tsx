"use client"
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import {
    HiOutlineMenu
} from "react-icons/hi";

export default function ToggleSidebar() {
      const { toggleSidebar } = useSidebar();
  return (
    <Button
      variant="ghost"
      size="icon"
      className="lg:hidden"
      onClick={toggleSidebar}
      aria-label="Toggle sidebar"
    >
      <HiOutlineMenu className="h-5 w-5" />
    </Button>
  );
}
