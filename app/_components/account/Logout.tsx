"use client";
import { logout } from "@/app/_lib/actions/authAction";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { redirect } from "next/navigation";
import { useTransition } from "react";
import { HiOutlineLogout } from "react-icons/hi";
import { toast } from "sonner";

interface Props {
  // props here
}

export default function Logout({}: Props) {
  const [isPending, startTransition] = useTransition();

  const handleLogout = () => {
    startTransition(async() => {
        const result = await logout();
        if(result.success) {
            toast.success(result.message)
            redirect("/auth/login")
        }else {
            toast.error(result.message)
        }
    })
  }

  return (
    <Button
      disabled={isPending}
      onClick={handleLogout}
      variant="ghost"
      size="icon"
      className="h-9 w-9 text-destructive hover:text-destructive hover:bg-destructive/10 cursor-pointer"
      aria-label="Logout"
    >
      {isPending ? <Spinner /> : <HiOutlineLogout className="h-5 w-5" />}
    </Button>
  );
}
