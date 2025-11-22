"use client";
import { EndpointStat } from "@/app/_lib/types/analytics_types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Bar,
  Line,
  ComposedChart,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  Legend,
  Cell,
} from "recharts";

interface Props {
  endpoints: EndpointStat[];
}

export function EndpointPerformanceChart({ endpoints: data }: Props) {
  // Sort by usage and take top 8 for better readability
  const topEndpoints = data
    .sort((a, b) => b.usage_count - a.usage_count)
    .slice(0, 8);

  // Format data for combo chart
  const chartData = topEndpoints.map((item) => {
    const endpointName = item.endpoint.split("/").pop() || item.endpoint;
    return {
      name:
        endpointName.length > 20
          ? endpointName.slice(0, 17) + "..."
          : endpointName,
      fullEndpoint: item.endpoint,
      method: item.method,
      requests: item.usage_count,
      responseTime: parseFloat((item.avg_response_time / 1000).toFixed(2)),
      successRate: parseFloat(item.success_rate.toFixed(1)),
      errors: item.usage_count * (1 - item.success_rate / 100),
    };
  });

  // Color for response time bars based on performance
  const getResponseTimeColor = (responseTime: number) => {
    if (responseTime < 0.1) return "#10b981"; // green - < 100ms
    if (responseTime < 0.5) return "#3b82f6"; // blue - < 500ms
    if (responseTime < 1) return "#f59e0b"; // yellow - < 1s
    return "#ef4444"; // red - > 1s
  };

  // Color for success rate line
  const getSuccessRateColor = (rate: number) => {
    if (rate >= 95) return "#10b981";
    if (rate >= 90) return "#f59e0b";
    return "#ef4444";
  };

  // Calculate key metrics
  const totalRequests = topEndpoints.reduce(
    (acc, curr) => acc + curr.usage_count,
    0
  );
  const avgResponseTime =
    topEndpoints.reduce((acc, curr) => acc + curr.avg_response_time, 0) /
    topEndpoints.length;
  const avgSuccessRate =
    topEndpoints.reduce((acc, curr) => acc + curr.success_rate, 0) /
    topEndpoints.length;

  // Find best and worst performers
  const fastestEndpoint = topEndpoints.reduce((min, curr) =>
    curr.avg_response_time < min.avg_response_time ? curr : min
  );
  const mostReliableEndpoint = topEndpoints.reduce((max, curr) =>
    curr.success_rate > max.success_rate ? curr : max
  );

  // Custom tooltip
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = chartData.find((item) => item.name === label);
      if (!data) return null;

      return (
        <div className="bg-background border border-border rounded-lg p-4 shadow-lg">
          <p className="font-bold text-sm mb-2">{data.fullEndpoint}</p>
          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between gap-4">
              <span className="text-muted-foreground">Method:</span>
              <span className="font-semibold">{data.method}</span>
            </div>
            <div className="flex items-center justify-between gap-4">
              <span className="text-muted-foreground">Response Time:</span>
              <span
                className="font-semibold"
                style={{ color: getResponseTimeColor(data.responseTime) }}
              >
                {data.responseTime}s
              </span>
            </div>
            <div className="flex items-center justify-between gap-4">
              <span className="text-muted-foreground">Success Rate:</span>
              <span
                className="font-semibold"
                style={{ color: getSuccessRateColor(data.successRate) }}
              >
                {data.successRate}%
              </span>
            </div>
            <div className="flex items-center justify-between gap-4">
              <span className="text-muted-foreground">Requests:</span>
              <span className="font-semibold">
                {data.requests.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-between gap-4">
              <span className="text-muted-foreground">Estimated Errors:</span>
              <span className="font-semibold text-destructive">
                {Math.round(data.errors).toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="col-span-full">
      <CardHeader>
        <CardTitle>API Endpoints Performance Dashboard</CardTitle>
        <CardDescription>
          Request volume, response times, and success rates across top endpoints
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-y-5">
        {/* Key Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-blue-50 rounded-lg p-4 dark:bg-blue-950/20">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-blue-500"></div>
              <p className="text-xs font-medium text-blue-700 dark:text-blue-300">
                Total Traffic
              </p>
            </div>
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400 mt-1">
              {totalRequests.toLocaleString()}
            </p>
            <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
              Requests
            </p>
          </div>

          <div className="bg-green-50 rounded-lg p-4 dark:bg-green-950/20">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-green-500"></div>
              <p className="text-xs font-medium text-green-700 dark:text-green-300">
                Avg Response
              </p>
            </div>
            <p className="text-2xl font-bold text-green-600 dark:text-green-400 mt-1">
              {(avgResponseTime / 1000).toFixed(2)}s
            </p>
            <p className="text-xs text-green-600 dark:text-green-400 mt-1">
              Across all endpoints
            </p>
          </div>

          <div className="bg-purple-50 rounded-lg p-4 dark:bg-purple-950/20">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-purple-500"></div>
              <p className="text-xs font-medium text-purple-700 dark:text-purple-300">
                Success Rate
              </p>
            </div>
            <p className="text-2xl font-bold text-purple-600 dark:text-purple-400 mt-1">
              {avgSuccessRate.toFixed(1)}%
            </p>
            <p className="text-xs text-purple-600 dark:text-purple-400 mt-1">
              Average reliability
            </p>
          </div>

          <div className="bg-orange-50 rounded-lg p-4 dark:bg-orange-950/20">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-orange-500"></div>
              <p className="text-xs font-medium text-orange-700 dark:text-orange-300">
                Top Endpoint
              </p>
            </div>
            <p className="text-lg font-bold text-orange-600 dark:text-orange-400 mt-1 truncate">
              {topEndpoints[0]?.endpoint.split("/").pop()}
            </p>
            <p className="text-xs text-orange-600 dark:text-orange-400 mt-1">
              {topEndpoints[0]?.usage_count.toLocaleString()} reqs
            </p>
          </div>
        </div>

        {/* Performance Highlights */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-success/10 rounded-lg p-3 border border-success/20">
            <p className="text-xs text-success font-medium">
              🚀 Fastest Endpoint
            </p>
            <p className="text-sm font-bold text-success mt-1">
              {(fastestEndpoint.avg_response_time / 1000).toFixed(2)}s
            </p>
            <p className="text-xs text-success/70 mt-1 truncate">
              {fastestEndpoint.endpoint.split("/").pop()}
            </p>
          </div>
          <div className="bg-purple-50 rounded-lg p-3 border border-purple-200 dark:bg-purple-950/20 dark:border-purple-800">
            <p className="text-xs text-purple-700 font-medium dark:text-purple-300">
              ⭐ Most Reliable
            </p>
            <p className="text-sm font-bold text-purple-600 dark:text-purple-400 mt-1">
              {mostReliableEndpoint.success_rate.toFixed(1)}%
            </p>
            <p className="text-xs text-purple-600 dark:text-purple-400 mt-1 truncate">
              {mostReliableEndpoint.endpoint.split("/").pop()}
            </p>
          </div>
        </div>

        {/* Combo Chart */}
        <ResponsiveContainer width="100%" height={400}>
          <ComposedChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis
              dataKey="name"
              angle={-45}
              textAnchor="end"
              height={80}
              tick={{ fontSize: 11 }}
              stroke="#6b7280"
            />
            <YAxis
              yAxisId="left"
              orientation="left"
              tick={{ fontSize: 11 }}
              stroke="#6b7280"
              tickFormatter={(value) => {
                if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
                if (value >= 1000) return `${(value / 1000).toFixed(0)}k`;
                return value;
              }}
              label={{
                value: "Requests",
                angle: -90,
                position: "insideLeft",
                offset: -10,
                fontSize: 12,
                fill: "#6b7280",
              }}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              tick={{ fontSize: 11 }}
              stroke="#6b7280"
              domain={[0, 100]}
              tickFormatter={(value) => `${value}%`}
              label={{
                value: "Success Rate %",
                angle: -90,
                position: "insideRight",
                offset: -10,
                fontSize: 12,
                fill: "#6b7280",
              }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />

            {/* Request Bars */}
            <Bar
              yAxisId="left"
              dataKey="requests"
              name="Request Volume"
              fill="#3b82f6"
              opacity={0.8}
              radius={[2, 2, 0, 0]}
            />

            {/* Response Time Bars */}
            <Bar
              yAxisId="left"
              dataKey="responseTime"
              name="Response Time (s)"
              radius={[2, 2, 0, 0]}
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={getResponseTimeColor(entry.responseTime)}
                  opacity={0.7}
                />
              ))}
            </Bar>

            {/* Success Rate Line */}
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="successRate"
              name="Success Rate %"
              stroke="#8b5cf6"
              strokeWidth={3}
              dot={{ fill: "#8b5cf6", strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, fill: "#7c3aed" }}
            />
          </ComposedChart>
        </ResponsiveContainer>

        {/* Performance Guide */}
        <div className="bg-muted/50 rounded-lg p-4 mt-4">
          <h4 className="font-semibold text-sm mb-3">
            Performance Analysis Guide:
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <p className="font-medium mb-2">🎯 Ideal Endpoints:</p>
              <ul className="space-y-1 text-muted-foreground">
                <li>
                  • High blue bars + low colored bars + purple line at top
                </li>
                <li>• High traffic, fast response, high success rate</li>
              </ul>
            </div>
            <div>
              <p className="font-medium mb-2">⚠️ Investigate These:</p>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Red response bars (slow)</li>
                <li>• Dropping purple lines (low success rate)</li>
                <li>• High traffic + slow response (optimization needed)</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Color Legend */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-muted-foreground mt-2">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded bg-[#3b82f6]"></div>
            <span>Request Volume</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded bg-[#10b981]"></div>
            <span>Fast (&lt; 0.1s)</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded bg-[#3b82f6]"></div>
            <span>Good (&lt; 0.5s)</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded bg-[#f59e0b]"></div>
            <span>Slow (&lt; 1s)</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded bg-[#ef4444]"></div>
            <span>Very Slow (&gt; 1s)</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-[#8b5cf6]"></div>
            <span>Success Rate %</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
