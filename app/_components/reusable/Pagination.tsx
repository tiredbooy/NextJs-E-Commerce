"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useCallback, useTransition } from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
  siblingCount?: number;
  showFirstLast?: boolean;
  className?: string;
  preserveSearchParams?: boolean;
  onPageChange?: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  siblingCount = 1,
  showFirstLast = true,
  className = "",
  hasNext,
  hasPrev,
  preserveSearchParams = true,
  onPageChange,
}: PaginationProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );

  const handlePageChange = useCallback(
    (page: number) => {
      if (page === currentPage || page < 1 || page > totalPages) return;

      startTransition(() => {
        const newUrl = `${pathname}?${createQueryString(
          "page",
          page.toString()
        )}`;
        router.push(newUrl, { scroll: false });
        router.refresh();
      });
    },
    [currentPage, totalPages, pathname, createQueryString, router, onPageChange]
  );

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

  return (
    <motion.nav
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex items-center justify-center gap-1 ${className} ${
        isPending ? "opacity-60 pointer-events-none" : ""
      }`}
      role="navigation"
      aria-label="Pagination"
    >
      <motion.div
        whileHover={hasPrev && !isPending ? { scale: 1.05 } : {}}
        whileTap={hasPrev && !isPending ? { scale: 0.95 } : {}}
      >
        <Link
          scroll={false}
          href={createPageURL(currentPage - 1)}
          onClick={(e) => {
            e.preventDefault();
            if (hasPrev && !isPending) {
              handlePageChange(currentPage - 1);
            }
          }}
          className={`inline-flex items-center justify-center h-9 w-9 rounded-md border border-border bg-background text-foreground transition-colors ${
            !hasPrev || isPending
              ? "opacity-50 pointer-events-none cursor-not-allowed"
              : "hover:bg-accent hover:border-border-hover"
          }`}
          aria-label="Go to previous page"
          aria-disabled={!hasPrev || isPending}
          tabIndex={!hasPrev || isPending ? -1 : undefined}
        >
          <ChevronLeft className="h-4 w-4" />
        </Link>
      </motion.div>

      <AnimatePresence mode="popLayout">
        {pages.map((page, index) => {
          if (page === "...") {
            return (
              <motion.span
                key={`ellipsis-${index}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}
                className="inline-flex items-center justify-center h-9 w-9 text-muted-foreground"
              >
                ...
              </motion.span>
            );
          }

          const pageNumber = page as number;
          const isActive = pageNumber === currentPage;

          if (isActive) {
            return (
              <motion.span
                key={pageNumber}
                layoutId="active-page"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{
                  type: "spring",
                  stiffness: 500,
                  damping: 30,
                }}
                className="inline-flex items-center justify-center h-9 min-w-[2.25rem] px-3 rounded-md border bg-primary text-background border-primary cursor-default font-medium text-sm"
                aria-label={`Page ${pageNumber}`}
                aria-current="page"
              >
                {pageNumber}
              </motion.span>
            );
          }

          return (
            <motion.div
              key={pageNumber}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              whileHover={!isPending ? { scale: 1.05, y: -2 } : {}}
              whileTap={!isPending ? { scale: 0.95 } : {}}
            >
              <Link
                scroll={false}
                href={createPageURL(pageNumber)}
                onClick={(e) => {
                  e.preventDefault();
                  if (!isPending) {
                    handlePageChange(pageNumber);
                  }
                }}
                className="inline-flex items-center justify-center h-9 min-w-[2.25rem] px-3 rounded-md border border-border bg-background text-foreground hover:bg-accent hover:border-border-hover transition-colors font-medium text-sm"
                aria-label={`Go to page ${pageNumber}`}
              >
                {pageNumber}
              </Link>
            </motion.div>
          );
        })}
      </AnimatePresence>

      <motion.div
        whileHover={hasNext && !isPending ? { scale: 1.05 } : {}}
        whileTap={hasNext && !isPending ? { scale: 0.95 } : {}}
      >
        <Link
          scroll={false}
          href={createPageURL(currentPage + 1)}
          onClick={(e) => {
            e.preventDefault();
            if (hasNext && !isPending) {
              handlePageChange(currentPage + 1);
            }
          }}
          className={`inline-flex items-center justify-center h-9 w-9 rounded-md border border-border bg-background text-foreground transition-colors ${
            !hasNext || isPending
              ? "opacity-50 pointer-events-none cursor-not-allowed"
              : "hover:bg-accent hover:border-border-hover"
          }`}
          aria-label="Go to next page"
          aria-disabled={!hasNext || isPending}
          tabIndex={!hasNext || isPending ? -1 : undefined}
        >
          <ChevronRight className="h-4 w-4" />
        </Link>
      </motion.div>
    </motion.nav>
  );
}
