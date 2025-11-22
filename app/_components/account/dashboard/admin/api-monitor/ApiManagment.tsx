import {
  SkeletonGrid,
  StatsSkeletonCard,
} from "@/app/_components/reusable/SkeletonCard";
import { Card } from "@/components/ui/card";
import { Router } from "lucide-react";
import { Suspense } from "react";
import ApiMonitorContent from "./ApiMonitorContent";

interface Props {
  // props here
}

export default function ApiManagment({}: Props) {
  return (
    <Card className="px-10 py-8 border-border bg-card">
      <div className="flex flex-row gap-1 items-center">
        <Router />
        <h1 className="font-semibold text-base md:text-3xl">
          Manage Api Usage
        </h1>
      </div>

      <Suspense
        fallback={
          <>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <StatsSkeletonCard key={i} />
              ))}
            </div>
              <SkeletonGrid variant="list" count={4} columns={1} />
          </>
        }
      >
        <ApiMonitorContent />
      </Suspense>
    </Card>
  );
}
