"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface BreadcrumbProps {
  /** Optional custom label mapping. Example: { "dashboard": "Home" } */
  labelMap?: Record<string, string>;
  /** Optional override to provide custom crumbs */
  items?: { label: string; href?: string }[];
  /** Optional className for custom styling */
  className?: string;
}

/**
 * A reusable breadcrumb component using shadcn + Next.js router
 * Automatically parses the current path, or accepts manual crumbs.
 */
export function Breadcrumb({
  labelMap = {},
  items,
  className,
}: BreadcrumbProps) {
  const pathname = usePathname();

  // If manual items passed, use them
  if (items && items.length > 0) {
    return (
      <nav
        aria-label="Breadcrumb"
        className={cn("flex items-center text-sm", className)}
      >
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <React.Fragment key={item.href || item.label}>
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="font-medium text-foreground">
                  {item.label}
                </span>
              )}
              {!isLast && (
                <ChevronRight className="mx-2 h-4 w-4 text-muted-foreground" />
              )}
            </React.Fragment>
          );
        })}
      </nav>
    );
  }

  // Otherwise, generate automatically from pathname
  const segments = pathname.split("/").filter(Boolean);
  const crumbs = segments.map((segment, index) => {
    const href = "/" + segments.slice(0, index + 1).join("/");
    const label =
      labelMap[segment] || segment.charAt(0).toUpperCase() + segment.slice(1);
    return { label, href };
  });

  return (
    <nav
      aria-label="Breadcrumb"
      className={cn("flex items-center text-sm", className)}
    >
      <Link
        href="/"
        className="text-muted-foreground hover:text-foreground transition-colors"
      >
        Home
      </Link>
      {crumbs.map((crumb, index) => {
        const isLast = index === crumbs.length - 1;
        return (
          <React.Fragment key={crumb.href}>
            <ChevronRight className="mx-2 h-4 w-4 text-muted-foreground" />
            {isLast ? (
              <span className="font-medium text-foreground">{crumb.label}</span>
            ) : (
              <Link
                href={crumb.href}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {crumb.label}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}
