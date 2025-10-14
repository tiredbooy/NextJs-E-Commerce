"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  siblingCount?: number;
  showFirstLast?: boolean;
  className?: string;
  preserveSearchParams?: boolean; // Keep other URL params
}

export default function Pagination({
  currentPage,
  totalPages,
  siblingCount = 1,
  showFirstLast = true,
  className = "",
  preserveSearchParams = true,
}: PaginationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createPageURL = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    return `${pathname}?${params.toString()}`;
  };

  const generatePageNumbers = () => {
    const pages: (number | string)[] = [];
    const leftSibling = Math.max(currentPage - siblingCount, 1);
    const rightSibling = Math.min(currentPage + siblingCount, totalPages);

    const showLeftDots = leftSibling > 2;
    const showRightDots = rightSibling < totalPages - 1;

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (!showLeftDots && showRightDots) {
        const leftRange = 3 + 2 * siblingCount;
        for (let i = 1; i <= leftRange; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      } else if (showLeftDots && !showRightDots) {
        pages.push(1);
        pages.push("...");
        const rightRange = 3 + 2 * siblingCount;
        for (let i = totalPages - rightRange + 1; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push("...");
        for (let i = leftSibling; i <= rightSibling; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const pages = generatePageNumbers();
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  if (totalPages <= 1) return null;

  return (
    <nav
      className={`flex items-center justify-center gap-1 ${className}`}
      role="navigation"
      aria-label="Pagination"
    >
      {showFirstLast && (
        <Link
          scroll={false}
          href={createPageURL(1)}
          className={`inline-flex items-center justify-center h-9 w-9 rounded-md border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] transition-colors ${
            isFirstPage
              ? "opacity-50 pointer-events-none cursor-not-allowed"
              : "hover:bg-[var(--accent)] hover:border-[var(--border-hover)]"
          }`}
          aria-label="Go to first page"
          aria-disabled={isFirstPage}
          tabIndex={isFirstPage ? -1 : undefined}
        >
          <ChevronsLeft className="h-4 w-4" />
        </Link>
      )}

      <Link
        scroll={false}
        href={createPageURL(currentPage - 1)}
        className={`inline-flex items-center justify-center h-9 w-9 rounded-md border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] transition-colors ${
          isFirstPage
            ? "opacity-50 pointer-events-none cursor-not-allowed"
            : "hover:bg-[var(--accent)] hover:border-[var(--border-hover)]"
        }`}
        aria-label="Go to previous page"
        aria-disabled={isFirstPage}
        tabIndex={isFirstPage ? -1 : undefined}
      >
        <ChevronLeft className="h-4 w-4" />
      </Link>

      {pages.map((page, index) => {
        if (page === "...") {
          return (
            <span
              key={`ellipsis-${index}`}
              className="inline-flex items-center justify-center h-9 w-9 text-[var(--muted-foreground)]"
            >
              ...
            </span>
          );
        }

        const pageNumber = page as number;
        const isActive = pageNumber === currentPage;

        if (isActive) {
          return (
            <span
              key={pageNumber}
              className="inline-flex items-center justify-center h-9 min-w-[2.25rem] px-3 rounded-md border bg-[var(--primary)] text-[var(--primary-foreground)] border-[var(--primary)] cursor-default font-medium text-sm"
              aria-label={`Page ${pageNumber}`}
              aria-current="page"
            >
              {pageNumber}
            </span>
          );
        }

        return (
          <Link
            scroll={false}
            key={pageNumber}
            href={createPageURL(pageNumber)}
            className="inline-flex items-center justify-center h-9 min-w-[2.25rem] px-3 rounded-md border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] hover:bg-[var(--accent)] hover:border-[var(--border-hover)] transition-colors font-medium text-sm"
            aria-label={`Go to page ${pageNumber}`}
          >
            {pageNumber}
          </Link>
        );
      })}

      <Link
        scroll={false}
        href={createPageURL(currentPage + 1)}
        className={`inline-flex items-center justify-center h-9 w-9 rounded-md border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] transition-colors ${
          isLastPage
            ? "opacity-50 pointer-events-none cursor-not-allowed"
            : "hover:bg-[var(--accent)] hover:border-[var(--border-hover)]"
        }`}
        aria-label="Go to next page"
        aria-disabled={isLastPage}
        tabIndex={isLastPage ? -1 : undefined}
      >
        <ChevronRight className="h-4 w-4" />
      </Link>

      {showFirstLast && (
        <Link
          scroll={false}
          href={createPageURL(totalPages)}
          className={`inline-flex items-center justify-center h-9 w-9 rounded-md border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] transition-colors ${
            isLastPage
              ? "opacity-50 pointer-events-none cursor-not-allowed"
              : "hover:bg-[var(--accent)] hover:border-[var(--border-hover)]"
          }`}
          aria-label="Go to last page"
          aria-disabled={isLastPage}
          tabIndex={isLastPage ? -1 : undefined}
        >
          <ChevronsRight className="h-4 w-4" />
        </Link>
      )}
    </nav>
  );
}
