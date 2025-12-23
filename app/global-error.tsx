"use client";

import { AlertTriangle, RefreshCw, Home } from "lucide-react";
import "./globals.css";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <div className="min-h-screen bg-gradient-to-br from-background via-card to-background flex items-center justify-center p-4">
          <div className="lg:max-w-1/2 w-full bg-background rounded-xl shadow-2xl border border-border overflow-hidden">
            <div className="text-center space-y-4 p-8">
              <div className="mx-auto w-24 h-24 bg-destructive/10 rounded-full flex items-center justify-center animate-pulse">
                <AlertTriangle className="w-12 h-12 text-destructive" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-foreground mb-2">
                  Critical Error
                </h1>
                <p className="text-base text-muted-foreground/90">
                  A critical error occurred that prevented the application from
                  loading
                </p>
              </div>
            </div>

            <div className="px-8 pb-4 space-y-4">
              <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-destructive/60 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-destructive mb-1">
                      Error Message
                    </h3>
                    <p className="text-sm text-destructive/90">
                      {error.message || "An unexpected critical error occurred"}
                    </p>
                  </div>
                </div>
              </div>

              {error.digest && (
                <div className="bg-card border border-border rounded-lg p-3">
                  <p className="text-xs text-muted-foreground/80 font-mono text-center">
                    Error ID: {error.digest}
                  </p>
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 p-8 pt-4 bg-card">
              <button
                onClick={reset}
                className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-destructive/80 hover:bg-destructive/90 text-white font-medium rounded-lg transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                Reload Application
              </button>
              <Link href="/">
                <Button
                  variant="outline"
                  className="w-full sm:w-auto text-foreground"
                  size="lg"
                >
                  <Home className="w-4 h-4 mr-2" />
                  Go to Homepage
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
