"use client";
import { resetPassword } from "@/app/_lib/actions/authAction";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { Lock } from "lucide-react";
import { redirect } from "next/navigation";
import { useTransition } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { IoMdAlert } from "react-icons/io";
import { toast } from "sonner";

interface Props {
  // props here
  token: string;
}

export interface ResetPasswordInputs {
  new_password: string;
  confirm_password: string;
  token: string;
}

export default function ResetPasswordForm({ token }: Props) {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<ResetPasswordInputs>();
  const [isPending, startTransition] = useTransition();

  const onSubmit: SubmitHandler<ResetPasswordInputs> = (data) => {
    startTransition(async () => {
      const result = await resetPassword(data);
      if (result.success) {
        toast.success("Password Reset Successfully.")
        reset();

        redirect("/auth/login")
      }
      toast.error(result.message)
    });
  };

  const password = watch("new_password");

  return (
    <Card className="px-6">
      <CardHeader>
        <div className="flex flex-row items-center gap-1">
          <IoMdAlert size={18} />
          <h1 className="font-semibold ">Reset Password</h1>
        </div>
        <span className="text-muted-foreground text-sm">
          Please enter your new password
        </span>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-y-4"
        >
          <input type="hidden" value={token} {...register("token")} />
          {/* Password Field */}
          <div className="flex flex-col gap-2">
            <Label className="flex flex-row items-center gap-1">
              <Lock size={16} /> <span>Password</span>
            </Label>
            <Input
              disabled={isPending}
              placeholder="••••••"
              {...register("new_password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
                maxLength: {
                  value: 20,
                  message: "Password must not exceed 20 characters",
                },
              })}
              type="password"
            />
            {errors.new_password && (
              <span className="text-xs font-semibold text-destructive">
                {errors.new_password.message}
              </span>
            )}
          </div>

          {/* Confirm Password Field */}
          <div className="flex flex-col gap-2">
            <Label className="flex flex-row items-center gap-1">
              <Lock size={16} /> <span>Confirm Password</span>
            </Label>
            <Input
              disabled={isPending}
              placeholder="••••••"
              type="password"
              {...register("confirm_password", {
                required: "Please confirm your password",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
                maxLength: {
                  value: 20,
                  message: "Password must not exceed 20 characters",
                },
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
            />
            {errors.confirm_password && (
              <span className="text-xs font-semibold text-destructive">
                {errors.confirm_password.message}
              </span>
            )}
          </div>

          <Button
            disabled={isPending}
            className="text-background bg-primary-dark"
            type="submit"
          >
            {isPending ? <Spinner /> : "Submit"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
