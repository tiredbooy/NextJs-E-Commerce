"use client";
import { login } from "@/app/_lib/actions/authAction";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { motion } from "framer-motion";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useActionState, useEffect, useState } from "react";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { toast } from "sonner";

export default function Login() {
  const searchParams = useSearchParams();
  const [state, formAction, isPending] = useActionState(login, undefined);
  const [showPassword, setShowPassword] = useState(false);

  const signupSuccess = searchParams.get("signup") === "success";
  const email = searchParams.get("email");

  useEffect(() => {
    if (state?.message && state.message !== "NEXT_REDIRECT") {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-gradient-to-bl from-background via-card to-background p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className=""
      >
        <Card>
          <CardHeader className="space-y-2 text-center">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
              className="mx-auto w-14 h-14 bg-primary rounded-full flex items-center justify-center mb-2"
            >
              <Lock className="w-7 h-7 text-primary-foreground" />
            </motion.div>
            <CardTitle className="text-2xl">Sign in</CardTitle>
            <CardDescription>
              {!signupSuccess ? (
                "Welcome back! Please sign in to continue"
              ) : (
                <div className="bg-success px-4 py-2 rounded-md text-background font-medium">
                  Account created Succesfully, Please log in.
                </div>
              )}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <form className="space-y-4" action={formAction}>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    defaultValue={email ? email : ""}
                    className="pl-10"
                    disabled={isPending}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <button className="text-xs text-primary hover:underline">
                    Forgot?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="••••••••"
                    className="pl-10 pr-10"
                    disabled={isPending}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="remember"
                  disabled={isPending}
                  className="w-4 h-4 rounded border-input"
                />
                <Label
                  htmlFor="remember"
                  className="text-sm font-normal cursor-pointer"
                >
                  Remember me
                </Label>
              </div>

              <Button className="w-full" disabled={isPending}>
                {isPending ? <Spinner /> : "Sign in"}
              </Button>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="w-full" disabled={isPending}>
                <FcGoogle className="w-5 h-5 mr-2" />
                Google
              </Button>
              <Button variant="outline" className="w-full" disabled={isPending}>
                <FaGithub className="w-5 h-5 mr-2" />
                GitHub
              </Button>
            </div>

            <div className="text-center text-sm text-muted-foreground">
              Don't have an account?{" "}
              <button className="text-primary hover:underline font-medium">
                Sign up
              </button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
