import { getIncomeReport } from "@/app/_lib/services/analyticsService";
import RevenueChart from "./RevenueChart";
import ToggleGroupComponent from "@/app/_components/reusable/ToggleGroup";

interface Props {
  // props here
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
    <div className="rounded-lg border bg-card px-4">
      <div className="flex flex-row justify-between items-center p-6 pb-4">
        <div className="flex flex-col space-y-1.5">
          <h3 className="text-xl font-semibold leading-none tracking-tight">
            Revenue Overview
          </h3>
          <p className="text-sm text-muted-foreground">
            Your sales performance over {!isNaN(duration) ? duration : 12} months
          </p>
        </div>
        <ToggleGroupComponent values={filterData} />
      </div>
      <div className="p-6 pt-0">
        <RevenueChart data={incomeReport} />
      </div>
    </div>
  );
}
