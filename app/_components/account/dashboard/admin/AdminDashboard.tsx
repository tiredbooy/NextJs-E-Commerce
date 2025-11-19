import StatsSkeletonCards from "@/app/_components/reusable/SkeletonCard";
import { Suspense } from "react";
import PopularChartsSection from "./PopularCharts";
import RecentOrders from "./RecentOrders";
import RevenueChart from "./RevenueChart";
import Stats from "./Stats";

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
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Suspense fallback={<StatsSkeletonCards length={4} />}>
          <Stats />
        </Suspense>
      </div>

      {/* Recent Orders Table Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Suspense fallback={<StatsSkeletonCards length={2} />}>
          <PopularChartsSection />
        </Suspense>
      </div>

      <div className="rounded-lg border bg-card">
        <div className="flex flex-col space-y-1.5 p-6 pb-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold leading-none tracking-tight">
                Recent Orders
              </h3>
              <p className="text-sm text-muted-foreground mt-1.5">
                Latest orders from your customers
              </p>
            </div>
            <button className="text-xs font-medium text-primary hover:underline">
              View All
            </button>
          </div>
        </div>
        <div className="p-6 pt-0">
          {/* Table Component Will Go Here */}
          <RecentOrders />
        </div>
      </div>
      {/* Chart Section - Full Width */}
      <div className="grid gap-4">
        <div className="rounded-lg border bg-card">
          <div className="flex flex-col space-y-1.5 p-6 pb-4">
            <h3 className="text-xl font-semibold leading-none tracking-tight">
              Revenue Overview
            </h3>
            <p className="text-sm text-muted-foreground">
              Your sales performance over time
            </p>
          </div>
          <div className="p-6 pt-0">
            <RevenueChart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
