"use client";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export function TokenRefreshHandler() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Check token and refresh every 5 minutes
    const interval = setInterval(async () => {
      try {
        const response = await fetch("/api/auth/refresh-token", {
          method: "POST",
        });

        if (!response.ok) {
          // Token refresh failed, redirect to login
          router.push(`/login?callbackUrl=${pathname}`);
        } else {
          // Token refreshed successfully, revalidate the page
          router.refresh();
        }
      } catch (error) {
        console.error("Token refresh error:", error);
      }
    }, 120 * 60 * 1000);

    return () => clearInterval(interval);
  }, [pathname, router]);

  return null; // This component doesn't render anything
}
