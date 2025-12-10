import { getIncomeReport } from "@/app/_lib/services/analyticsService";
import RevenueChart from "./RevenueChart";
import ToggleGroupComponent from "@/app/_components/reusable/ToggleGroup";

interface Props {
  duration: number
}

export default async function RevenueChartContainer({duration}: Props) {
  const incomeReport = await getIncomeReport(duration);

  const filterData = [
    {id: 1, title: "3 Month", value: 3},
    {id: 2, title: "6 Month", value: 6},
    {id: 3, title: "9 Month", value: 9},
    {id: 4, title: "12 Month", value: 12},
  ]

  return (
    <div className="rounded-lg border bg-card px-2 sm:px-4">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 p-4 sm:p-6 pb-3 sm:pb-4">
        <div className="flex flex-col space-y-1.5">
          <h3 className="text-lg sm:text-xl font-semibold leading-none tracking-tight">
            Revenue Overview
          </h3>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Your sales performance over {!isNaN(duration) ? duration : 12} months
          </p>
        </div>
        <div className="w-full sm:w-auto">
          <ToggleGroupComponent paramName="duration" options={filterData} defaultValue={12} />
        </div>
      </div>
      <div className="p-2 sm:p-6 pt-0">
        <RevenueChart data={incomeReport} />
      </div>
    </div>
  );
}