import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";


export function NotLoggedIn({}) {
  return (
    <Card className="w-full">
      <CardContent className="py-12 text-center space-y-4">
        <div className="space-y-2">
          <h3 className="text-xl font-semibold">Login Required</h3>
          <p className="text-muted-foreground">
            You need to be logged in to write a review
          </p>
        </div>
        <Link href="/auth/login" className="mt-4 bg-info font-medium text-background hover:bg-info-hover px-3 py-2 rounded-md">Log In to Review</Link>
      </CardContent>
    </Card>
  );
}
