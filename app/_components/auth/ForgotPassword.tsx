"use client";

import { forgotPassword } from "@/app/_lib/actions/authAction";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle2, Mail } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

interface Props {
  emailProp: string;
}

export default function ForgotPassword({ emailProp }: Props) {
  const [email, setEmail] = useState(emailProp);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      setError("Email is required");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await forgotPassword(email);
      console.log("response:", response);

      if (response.success) {
        setSubmitted(true);
      } else {
        setError(response.message || "Failed to send reset email");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="w-full min-h-screen flex justify-center items-center bg-gradient-to-bl from-background via-card to-background p-4">
        <Card className="bg-card text-center px-4 py-2 rounded-md border border-border">
          <CardHeader className="text-center space-y-6 pt-8 pb-4">
            <div className="flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse" />
                <div className="relative bg-gradient-to-br from-primary-dark via-primary/80 to-primary-dark p-4 rounded-2xl shadow-lg">
                  <Mail className="h-12 w-12 text-background" />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <CardTitle className="text-2xl md:text-3xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                Check Your Email
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                We've sent a password reset link to <strong>{email}</strong>
              </p>
            </div>
          </CardHeader>

          <CardContent className="space-y-6 pb-8 px-6">
            <div className="flex items-start space-x-3 p-4 bg-primary/5 rounded-xl border border-primary/10">
              <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="text-sm font-medium text-foreground">
                  If that email exists in our system
                </p>
                <p className="text-sm text-muted-foreground">
                  You'll receive a password reset link shortly. The link will
                  expire in 30 minutes for security.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <p className="text-sm font-medium text-foreground">
                  Didn't receive the email?
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground text-left pl-5 list-disc">
                  <li>Check your spam or junk folder</li>
                  <li>Make sure you entered the correct email address</li>
                  <li>Wait a few minutes and try again</li>
                </ul>
              </div>

              <div className="pt-4 border-t border-border/50 flex flex-col gap-3">
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setEmail("");
                  }}
                  className="text-primary hover:text-primary/80 underline underline-offset-2 transition-colors text-sm"
                >
                  Try another email address
                </button>
                <p className="text-xs text-center text-muted-foreground">
                  Need help?{" "}
                  <a
                    href="mailto:support@example.com"
                    className="text-primary hover:text-primary/80 underline underline-offset-2 transition-colors"
                  >
                    Contact our support team
                  </a>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-gradient-to-bl from-background via-card to-background p-4">
      <Card className="bg-card text-center px-4 py-2 rounded-md border border-border ">
        <CardHeader className="text-center space-y-6 pt-8 pb-4">
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl" />
              <div className="relative bg-gradient-to-br from-primary-dark via-primary/80 to-primary-dark p-4 rounded-2xl shadow-lg">
                <Mail className="h-12 w-12 text-background" />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <CardTitle className="text-2xl md:text-3xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
              Reset Your Password
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Enter your email to receive a password reset link
            </p>
          </div>
        </CardHeader>

        <CardContent className="space-y-6 pb-8 px-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="text-sm font-medium text-foreground block text-left"
              >
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                required
                autoFocus
              />
              {error && <p className="text-sm text-red-500">{error}</p>}
            </div>

            <Button
              type="submit"
              disabled={loading || !email.trim()}
              className="w-full py-2 px-4 text-background rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </Button>
          </form>

          <div className="pt-4 border-t border-border/50">
            <p className="text-sm text-center text-muted-foreground">
              Remember your password ?{" "}
              <Link
                href="/auth/login"
                className="text-primary hover:text-primary/80 underline underline-offset-2 transition-colors"
              >
                Sign in
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
