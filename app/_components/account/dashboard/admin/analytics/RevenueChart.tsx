"use client";
import { RevenueData } from "@/app/_lib/types";
import { useTheme } from "next-themes";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface Props {
  // future props here if needed
  data: RevenueData[];
}

const RevenueChart: React.FC<Props> = ({ data }) => {
  const { theme } = useTheme();
  const chartColor =
    theme === "dark" ? "oklch(0.7 0.2 285)" : "oklch(58.417% 0.17002 265.103)";
  const salesChartColor =
    theme === "dark" ? "oklch(0.65 0.22 330)" : "oklch(0.6 0.18 305)";

  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart
        data={data}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis dataKey="revenue" />
        <Tooltip
          content={({ active, payload, label }) => {
            if (active && payload && payload.length) {
              const sales = payload.find((p) => p.dataKey === "sales")?.value;
              const revenue = payload.find(
                (p) => p.dataKey === "revenue"
              )?.value;
              return (
                <div className="bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-lg p-3 shadow">
                  <p className="font-semibold mb-1">{label}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Sales: <span className="font-medium">{sales}</span>
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Revenue:{" "}
                    <span className="font-medium">
                      ${Number(revenue).toLocaleString()}
                    </span>
                  </p>
                </div>
              );
            }
            return null;
          }}
        />
        <Area
          type="monotone"
          dataKey="sales"
          fill={salesChartColor}
          name="Sales"
        />
        <Area
          type="monotone"
          dataKey="revenue"
          fill={chartColor}
          name="Revenue"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default RevenueChart;
