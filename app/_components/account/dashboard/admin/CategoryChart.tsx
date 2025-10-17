"use client";

import { PopularCategory } from "@/app/_lib/types";
import {
    Card,
    CardContent
} from "@/components/ui/card";
import {
    Cell,
    Legend,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
} from "recharts";

interface Props {
  data?: PopularCategory[];
  title?: string;
  description?: string;
}

const defaultData: PopularCategory[] = [
  { name: "T-Shirts", value: 200, color: "oklch(0.7 0.2 285)" },
  { name: "Shoes", value: 620, color: "oklch(0.75 0.18 175)" },
  { name: "Perfume", value: 150, color: "oklch(0.7 0.18 65)" },
  { name: "Suits", value: 133, color: "oklch(0.65 0.22 330)" },
];

const CategoryChart: React.FC<Props> = ({
  data = defaultData,
  title = "Popular Categories",
  description = "Sales distribution by product category",
}) => {
  // Calculate total for percentage display
  const total = data.reduce((sum, item) => sum + item.value, 0);

  // Custom tooltip
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

  // Custom legend
  const CustomLegend = ({ payload }: any) => {
    return (
      <div className="flex flex-wrap gap-3 justify-center mt-4">
        {payload.map((entry: any, index: number) => {
          const percentage = ((entry.payload.value / total) * 100).toFixed(1);
          return (
            <div key={`legend-${index}`} className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-sm text-muted-foreground">
                {entry.value}
                <span className="text-xs ml-1">({percentage}%)</span>
              </span>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <Card className="flex flex-col">

      <CardContent className="flex-1 pb-6">
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                dataKey="value"
                outerRadius={100}
                paddingAngle={2}
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.color}
                    className="stroke-background hover:opacity-80 transition-opacity cursor-pointer"
                    strokeWidth={2}
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend content={<CustomLegend />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default CategoryChart;
