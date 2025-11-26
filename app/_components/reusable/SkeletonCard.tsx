import { Skeleton } from "@/components/ui/skeleton";
import { TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Table } from "lucide-react";

// Base skeleton card wrapper
interface SkeletonCardProps {
  children: React.ReactNode;
  className?: string;
}

function SkeletonCard({ children, className = "" }: SkeletonCardProps) {
  return <div className={`p-6 rounded-lg border ${className}`}>{children}</div>;
}

// Stats card skeleton variant
export function StatsSkeletonCard() {
  return (
    <SkeletonCard>
      <div className="flex items-center justify-between">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-6 w-6 rounded-full" />
      </div>
      <div className="mt-4">
        <Skeleton className="h-8 w-32" />
        <Skeleton className="h-4 w-20 mt-2" />
      </div>
    </SkeletonCard>
  );
}

// Product card skeleton variant
export function ProductSkeletonCard() {
  return (
    <SkeletonCard>
      <Skeleton className="h-48 w-full rounded-md mb-4" />
      <Skeleton className="h-5 w-3/4 mb-2" />
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-5/6 mb-4" />
      <div className="flex items-center justify-between">
        <Skeleton className="h-6 w-20" />
        <Skeleton className="h-9 w-24 rounded-md" />
      </div>
    </SkeletonCard>
  );
}

// User/Profile card skeleton variant
export function ProfileSkeletonCard() {
  return (
    <SkeletonCard>
      <div className="flex items-center gap-4 mb-4">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="flex-1">
          <Skeleton className="h-4 w-32 mb-2" />
          <Skeleton className="h-3 w-24" />
        </div>
      </div>
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-5/6" />
    </SkeletonCard>
  );
}

// List item skeleton variant
export function ListItemSkeletonCard() {
  return (
    <SkeletonCard className="p-4">
      <div className="flex items-center gap-3">
        <Skeleton className="h-10 w-10 rounded-md flex-shrink-0" />
        <div className="flex-1">
          <Skeleton className="h-4 w-3/4 mb-2" />
          <Skeleton className="h-3 w-1/2" />
        </div>
        <Skeleton className="h-8 w-16 rounded-md" />
      </div>
    </SkeletonCard>
  );
}

// Generic skeleton grid wrapper
interface SkeletonGridProps {
  count?: number;
  variant: "stats" | "product" | "profile" | "list";
  columns?: number;
}

export function SkeletonGrid({
  count = 4,
  variant = "stats",
  columns = 4,
}: SkeletonGridProps) {
  const variantMap = {
    stats: StatsSkeletonCard,
    product: ProductSkeletonCard,
    profile: ProfileSkeletonCard,
    list: ListItemSkeletonCard,
  };

  const SkeletonComponent = variantMap[variant];

  const gridCols =
    {
      1: "grid-cols-1",
      2: "grid-cols-1 md:grid-cols-2",
      3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
      4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
    }[columns] || "grid-cols-1 md:grid-cols-2 lg:grid-cols-4";

  return (
    <div className={`grid ${gridCols} gap-4`}>
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonComponent key={i} />
      ))}
    </div>
  );
}

// Custom skeleton builder for unique layouts
interface CustomSkeletonCardProps {
  layout: Array<{
    type: "text" | "image" | "circle" | "button";
    width?: string;
    height?: string;
    className?: string;
  }>;
  className?: string;
}

export function CustomSkeletonCard({
  layout,
  className,
}: CustomSkeletonCardProps) {
  return (
    <SkeletonCard className={className}>
      {layout.map((item, i) => {
        const baseClass = item.className || "";
        const width = item.width || "w-full";
        const height = item.height || "h-4";

        if (item.type === "circle") {
          return (
            <Skeleton
              key={i}
              className={`rounded-full ${width} ${height} ${baseClass}`}
            />
          );
        }
        if (item.type === "image") {
          return (
            <Skeleton
              key={i}
              className={`rounded-md ${width} ${height} ${baseClass}`}
            />
          );
        }
        if (item.type === "button") {
          return (
            <Skeleton
              key={i}
              className={`rounded-md ${width} h-9 ${baseClass}`}
            />
          );
        }
        return (
          <Skeleton key={i} className={`${width} ${height} ${baseClass}`} />
        );
      })}
    </SkeletonCard>
  );
}

// Table row skeleton specifically for your products table
export function TableRowSkeleton() {
  return (
    <TableRow className="animate-pulse">
      <TableCell>
        <Skeleton className="h-4 w-12" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-8 w-8 rounded-full" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-4 w-32" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-4 w-16" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-4 w-12" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-4 w-12" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-4 w-20" />
      </TableCell>
      <TableCell>
        <div className="flex flex-row gap-1 items-center text-base">
          <Skeleton className="h-4 w-4 rounded-sm" />
          <Skeleton className="h-4 w-4 rounded-sm" />
          <Skeleton className="h-4 w-4 rounded-sm" />
        </div>
      </TableCell>
    </TableRow>
  );
}

// Full table skeleton with header
export function TableSkeleton({ rowCount = 10 }: { rowCount?: number }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Image</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Stock</TableHead>
          <TableHead>Sales</TableHead>
          <TableHead>Created At</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Array.from({ length: rowCount }).map((_, i) => (
          <TableRowSkeleton key={i} />
        ))}
      </TableBody>
    </Table>
  );
}
