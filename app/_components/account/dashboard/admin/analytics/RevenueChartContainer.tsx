import { getIncomeReport } from "@/app/_lib/services/analyticsService";
import RevenueChart from "./RevenueChart";

interface Props {
  // props here
}

export default async function RevenueChartContainer({}: Props) {
  const incomeReport = await getIncomeReport();
  return (
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
        <RevenueChart data={incomeReport} />
      </div>
    </div>
  );
}
