import { forgotPassword, getCurrentSession } from "@/app/_lib/services/authService";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Mail } from "lucide-react";

interface Props {
  // props here
}

export default async function page({}: Props) {
    const session = await getCurrentSession()
  const response = await forgotPassword(session?.user?.email);
  console.log('response:', response);
  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-gradient-to-bl from-background via-card to-background p-4">
      <Card className="bg-card text-cetner px-4 py-2 rouned-md border border-border ">
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
              We've sent you a password reset link
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
                expire in 30 Minutes for security.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <p className="text-sm font-medium text-foreground">
                Didn't receive the email?
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground pl-5 list-disc">
                <li>Check your spam or junk folder</li>
                <li>Make sure you entered the correct email address</li>
                <li>Wait a few minutes and try again</li>
              </ul>
            </div>

            <div className="pt-4 border-t border-border/50">
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
