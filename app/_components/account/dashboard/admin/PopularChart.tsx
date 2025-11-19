"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { useMemo } from "react";
import { PopularChartItem } from "@/app/_lib/types";

const PRESET_COLORS = [
  "oklch(0.75 0.25 285)", // purple
  "oklch(0.78 0.24 200)", // blue
  "oklch(0.80 0.28 175)", // cyan
  "oklch(0.82 0.30 140)", // teal
  "oklch(0.85 0.32 100)", // green
  "oklch(0.88 0.30 70)", // yellow
  "oklch(0.82 0.28 40)", // orange
  "oklch(0.78 0.26 15)", // red
  "oklch(0.74 0.22 330)", // pink
  "oklch(0.70 0.20 260)", // indigo
];

function stringToColor(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
    hash = hash & hash;
  }
  const hue = Math.abs(hash % 360);
  return `oklch(0.76 0.24 ${hue})`;
}

interface Props {
  data?: PopularChartItem[];
  title?: string;
  description?: string;
}

const PopularChart: React.FC<Props> = ({
  data = [],
  title = "Popular Items",
  description = "Sales distribution",
}) => {
  // Auto-assign colors if missing
  const dataWithColors = useMemo(() => {
    return data.map((item, index) => ({
      ...item,
      color:
        item.color ??
        PRESET_COLORS[index % PRESET_COLORS.length] ??
        stringToColor(item.name),
    }));
  }, [data]);

  const total = useMemo(
    () => dataWithColors.reduce((sum, item) => sum + item.value, 0),
    [dataWithColors]
  );

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const percentage = ((payload[0].value / total) * 100).toFixed(1);
      return (
        <div className="rounded-lg border bg-background p-3 shadow-md">
          <p className="text-sm font-semibold">{payload[0].name}</p>
          <p className="text-sm text-muted-foreground">
            Sales: {payload[0].value.toLocaleString()}
          </p>
          <p className="text-sm text-muted-foreground">
            {percentage}% of total
          </p>
        </div>
      );
    }
    return null;
  };

  const CustomLegend = ({ payload }: any) => {
    return (
      <div className="flex flex-wrap gap-4 justify-center mt-6">
        {payload?.map((entry: any, index: number) => {
          const percentage = ((entry.payload.value / total) * 100).toFixed(1);
          return (
            <div key={`legend-${index}`} className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-sm text-muted-foreground">
                {entry.value}
                <span className="text-xs ml-1 opacity-80">({percentage}%)</span>
              </span>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <Card className="flex flex-col">
      <CardContent className="flex-1 pb-6 pt-6">
        <div className="text-center mb-4">
          <h3 className="text-lg font-semibold">{title}</h3>
          {description && (
            <p className="text-sm text-muted-foreground mt-1">{description}</p>
          )}
        </div>

        <div className="h-[320px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={dataWithColors}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={110}
                dataKey="value"
                paddingAngle={2}
              >
                {dataWithColors.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.color}
                    className="stroke-background stroke-2 hover:opacity-80 transition-opacity cursor-pointer"
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend content={<CustomLegend />} verticalAlign="bottom" />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default PopularChart;
