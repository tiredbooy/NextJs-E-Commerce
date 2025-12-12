"use client";
import { signup } from "@/app/_lib/actions/authAction";
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
import { motion } from "framer-motion";
import { Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";

interface Props {
  children: React.ReactNode;
  defaultValues: {
    email: string;
    name: string;
    image: string;
    oauth_provider: string;
    oauth_id: string;
  };
}

export default function Signup({ defaultValues, children }: Props) {
  const { email, name, image, oauth_provider, oauth_id } = defaultValues;
  const [first_name, last_name] = name?.split(" ") || []
  const [state, formAction, isPending] = useActionState(signup, null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    if (state?.message) {
      toast(state.message);
    }
  }, [state]);

  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-gradient-to-bl from-background via-card to-background p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Card>
          <CardHeader className="space-y-2 text-center">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
              className="mx-auto w-14 h-14 bg-primary rounded-full flex items-center justify-center mb-2"
            >
              <User className="w-7 h-7 text-primary-foreground" />
            </motion.div>
            <CardTitle className="text-2xl">Create account</CardTitle>
            <CardDescription>
              Sign up to get started with your account
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <form className="space-y-4" action={formAction}>
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="firstName"
                    name="first_name"
                    defaultValue={first_name || ""}
                    type="text"
                    placeholder="John"
                    className="pl-10"
                    disabled={isPending}
                  />
                </div>
              </div>

              <input type="hidden" name="provider" value={oauth_provider} />
              <input
                type="hidden"
                name="provider_id"
                value={oauth_id}
              />
              <input type="hidden" name="iamge" value={image} />

              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="lastName"
                    name="last_name"
                    defaultValue={last_name || ""}
                    type="text"
                    placeholder="Doe"
                    className="pl-10"
                    disabled={isPending}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    defaultValue={email || ""}
                    placeholder="you@example.com"
                    className="pl-10"
                    disabled={isPending}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
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

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="pl-10 pr-10"
                    disabled={isPending}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-start space-x-2 text-xs md:text-sm">
                <input
                  type="checkbox"
                  id="terms"
                  name="terms"
                  value="accepted"
                  disabled={isPending}
                  className="w-4 h-4 rounded border-input mt-0.5"
                />
                <Label
                  htmlFor="terms"
                  className="text-xs font-normal cursor-pointer leading-tight"
                >
                  I agree to the{" "}
                  <button
                    type="button"
                    className="text-primary hover:underline"
                  >
                    Terms of Service
                  </button>{" "}
                  and{" "}
                  <button
                    type="button"
                    className="text-primary hover:underline"
                  >
                    Privacy Policy
                  </button>
                </Label>
              </div>

              <Button disabled={isPending} type="submit" className="w-full">
                {isPending ? "Signing in..." : "Create account"}
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

            {children}

            <div className="text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <button
                type="button"
                className="text-primary hover:underline font-medium"
              >
                Sign in
              </button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
