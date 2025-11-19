import { Skeleton } from "@/components/ui/skeleton";

interface Props {
  // props here
  length?: number;
}

export default function StatsSkeletonCards({ length = 4 }: Props) {
  return (
    <>
      {Array.from({ length }).map((_, i) => (
        <div className="p-6  rounded-lg border">
          <div className="flex items-center justify-between">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-6 w-6 rounded-full" />
          </div>
          <div className="mt-4">
            <Skeleton className="h-8 w-32" />
            <Skeleton className="h-4 w-20 mt-2" />
          </div>
        </div>
      ))}
    </>
  );
}
