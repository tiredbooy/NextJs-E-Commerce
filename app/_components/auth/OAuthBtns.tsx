"use client";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

interface Props {
  mode?: "singup" | "signin";
}

export default function OAuthBtns({ mode = "singup" }: Props) {

  return (
    <div className="grid grid-cols-2 gap-3">
      <Button
        variant="outline"
        className="w-full"
        type="button"
        onClick={() =>
          signIn("google", { callbackUrl: "/api/auth/callback?intent=" + (mode === "singup" ? "signup" : "login")})
        }
      >
        <FcGoogle className="w-5 h-5 mr-2" />
        Google
      </Button>
      <Button
        variant="outline"
        className="w-full"
        type="button"
        onClick={() =>
          signIn("github", { callbackUrl: "/api/auth/callback?intent=" + (mode === "singup" ? "signup" : "login")})
        }
      >
        <FaGithub className="w-5 h-5 mr-2" />
        GitHub
      </Button>
    </div>
  );
}
