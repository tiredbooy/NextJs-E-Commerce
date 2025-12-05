import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import Link from "next/link";

export default function ThankYouPage() {
  return (
    <Card className="min-h-screen flex items-center justify-center bg-gradient-to-bl from-background via-card to-background">
      <CardContent className="flex flex-col items-center justify-center gap-y-2">
        <div className="flex justify-center">
          <div className="rounded-full bg-success/10 p-4">
            <CheckCircle className="h-16 w-16 text-success" />
          </div>
        </div>
        <h1 className="text-4xl font-bold text-foreground mb-3">
          Thank You for Your Purchase!
        </h1>
        <p className="text-lg text-muted-foreground mx-auto">
          Your order has been confirmed and is being processed. We&apos;ll send
          you a confirmation email shortly.
        </p>
        <p className="text-lg text-muted-foreground mx-auto">
          Check your Email for more information
        </p>
        <div className="flex flex-row gap-5 items-center justify-center mt-3">
          <Link href="/">
            <Button className="text-info bg-info/10 hover:bg-info/5">
              Back to Home
            </Button>
          </Link>
          <Link href="/account">
            <Button className="bg-primary/10 text-primary hover:bg-primary/5">
              Go to Dashboard
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
