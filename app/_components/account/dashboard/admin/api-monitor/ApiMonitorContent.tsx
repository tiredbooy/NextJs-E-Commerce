import { Suspense } from "react";
import { ApiMonitorStats } from "./ApiMonitorStats";
import { SkeletonGrid } from "@/app/_components/reusable/SkeletonCard";

interface Props {
  // props here
}

export default function ApiMonitorContent({}: Props) {
  return (
    <div className="w-full">
      <Suspense
        fallback={<SkeletonGrid count={2} variant="stats" columns={2} />}
      >
        <ApiMonitorStats />
      </Suspense>
    </div>
  );
}
