import {
  ListItemSkeletonCard,
  SkeletonGrid,
  StatsSkeletonCard,
} from "@/app/_components/reusable/SkeletonCard";
import { Suspense } from "react";
import PopularChartsSection from "./analytics/PopularCharts";
import RecentOrders from "./RecentOrders";
import RevenueChart from "./analytics/RevenueChart";
import Stats from "./analytics/Stats";
import RevenueChartContainer from "./analytics/RevenueChartContainer";
import { Skeleton } from "@/components/ui/skeleton";

interface Props {
  // Add props if needed later
}

const AdminDashboard: React.FC<Props> = ({}) => {
  return (
    <div className="flex flex-col gap-6 p-4 md:p-6">
      {/* Page Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here's what's happening with your store today.
        </p>
      </div>

      {/* Stats Grid - 4 cards in a row on desktop, responsive on mobile */}
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-2 xl:grid-cols-4">
        <Suspense
          fallback={Array.from({ length: 4 }).map((_, i) => (
            <StatsSkeletonCard key={i} />
          ))}
        >
          <Stats />
        </Suspense>
      </div>

      {/* Recent Orders Table Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Suspense
          fallback={Array.from({ length: 2 }).map((_, i) => (
            <StatsSkeletonCard key={i} />
          ))}
        >
          <PopularChartsSection />
        </Suspense>
      </div>

      <div className="rounded-lg border bg-card">
        <Suspense
          fallback={Array.from({ length: 3 }).map((_, i) => (
            <ListItemSkeletonCard key={i} />
          ))}
        >
          <RecentOrders />
        </Suspense>
      </div>
      {/* Chart Section - Full Width */}
      <div className="grid gap-4">
        <Suspense
          fallback={<SkeletonGrid columns={1} count={1} variant="stats" />}
        >
          <RevenueChartContainer />
        </Suspense>
      </div>
    </div>
  );
};

export default AdminDashboard;
