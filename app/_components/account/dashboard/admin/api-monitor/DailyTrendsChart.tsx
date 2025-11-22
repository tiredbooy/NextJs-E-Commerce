"use client";
import { DailyTrend } from "@/app/_lib/types/analytics_types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useTheme } from "next-themes";
import {
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface Props {
  trends: DailyTrend[];
}

export function DailyTrendsChart({ trends: data }: Props) {
  const { theme } = useTheme();

  const tooltipBg =
    theme === "dark" ? "oklch(0.12 0.01 265)" : "oklch(0.99 0 0)";
  // Format data for chart
  const chartData = data.map((item) => ({
    date: new Date(item.date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    }),
    requests: item.total_request,
    responseTime: parseFloat(item.avg_response_time.toFixed(2)) / 1000,
  }));

  // Calculate statistics
  const totalRequests = data.reduce((acc, curr) => acc + curr.total_request, 0);
  const avgResponseTime =
    data.reduce((acc, curr) => acc + curr.avg_response_time, 0) / data.length;

  return (
    <Card className="col-span-full lg:col-span-1">
      <CardHeader>
        <CardTitle>Daily Trends</CardTitle>
        <CardDescription>
          Request volume and performance over time
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-y-5">
        {/* Summary Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-info/10 rounded-lg p-3">
            <p className="text-xs text-info/80 font-medium">Total Requests</p>
            <p className="text-2xl font-bold text-info">
              {totalRequests.toLocaleString()}
            </p>
          </div>
          <div className="bg-primary/10 rounded-lg p-3">
            <p className="text-xs text-primary/80 font-medium">Avg Response</p>
            <p className="text-2xl font-bold text-primary">
              {avgResponseTime < 1000
                ? `${avgResponseTime.toFixed(0)}ms`
                : `${(avgResponseTime / 1000).toFixed(2)}s`}
            </p>
          </div>
        </div>

        {/* Chart */}
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <XAxis dataKey="date" tick={{ fontSize: 12 }} stroke="#6b7280" />
            <YAxis yAxisId="left" tick={{ fontSize: 12 }} stroke="#6b7280" />
            <YAxis
              yAxisId="right"
              orientation="right"
              tick={{ fontSize: 12 }}
              stroke="#6b7280"
            />
            <Tooltip
              contentStyle={{
                backgroundColor: tooltipBg,
                border: `1px solid ${tooltipBg}`,
                borderRadius: "8px",
                padding: "12px",
              }}
              formatter={(value: number, name: string) => {
                if (name === "requests")
                  return [value.toLocaleString(), "Requests"];
                if (name === "responseTime")
                  return [`${value.toFixed(1)}s`, "Response Time"];
                return [value, name];
              }}
            />
            <Legend />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="requests"
              stroke="#3b82f6"
              strokeWidth={2}
              name="Requests"
              dot={{ fill: "#3b82f6", r: 4 }}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="responseTime"
              stroke="#8b5cf6"
              strokeWidth={2}
              name="Response Time"
              dot={{ fill: "#8b5cf6", r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
