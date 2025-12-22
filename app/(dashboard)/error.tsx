"use client";

import { useEffect } from "react";
import { AlertCircle, RefreshCw, Home, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to console or error reporting service
    console.error("Error:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card to-background flex items-center justify-center p-4">
      <Card className=" w-full max-w-1/2 bg-gradient-to-br from-background via-card to-background shadow-xl border-border">
        <CardHeader className="text-center space-y-4 pb-4">
          <div className="mx-auto w-20 h-20 bg-destructive/10 rounded-full flex items-center justify-center animate-pulse">
            <AlertCircle className="w-10 h-10 text-destructive" />
          </div>
          <div>
            <CardTitle className="text-3xl font-bold text-muted-foreground mb-2">
              Oops! Something went wrong
            </CardTitle>
            <CardDescription className="text-base text-muted-foreground/60">
              We encountered an unexpected error while loading this page
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <Alert
            variant="destructive"
            className="bg-destructive/10 border-destructive/15"
          >
            <AlertCircle className="h-4 w-4" />
            <AlertTitle className="font-semibold">Error Details</AlertTitle>
            <AlertDescription className="mt-2 text-sm">
              {error.message || "An unexpected error occurred"}
            </AlertDescription>
          </Alert>

          {error.digest && (
            <div className="bg-card border border-border rounded-lg p-3">
              <p className="text-xs text-muted-foreground/50 font-mono">
                Error ID: {error.digest}
              </p>
            </div>
          )}

          <div className="bg-card border border-border rounded-lg p-4">
            <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
              <ChevronRight className="w-4 h-4" />
              What you can try:
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <span className="text-muted-foreground/60 mt-0.5">•</span>
                <span>Refresh the page to try again</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-muted-foreground/60 mt-0.5">•</span>
                <span>Go back to the homepage</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-muted-foreground/60 mt-0.5">•</span>
                <span>Clear your browser cache and cookies</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-muted-foreground/60 mt-0.5">•</span>
                <span>Contact support if the problem persists</span>
              </li>
            </ul>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col sm:flex-row gap-3 pt-2">
          <Button
            onClick={reset}
            className="w-full sm:w-auto bg-destructive/60 hover:bg-destructive/70 text-white"
            size="lg"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Try Again
          </Button>
          <Link href="/">
            <Button variant="outline" className="w-full sm:w-auto text-foreground" size="lg">
              <Home className="w-4 h-4 mr-2" />
              Go to Homepage
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
