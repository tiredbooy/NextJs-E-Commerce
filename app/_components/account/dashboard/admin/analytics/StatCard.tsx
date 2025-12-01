import { Stat } from "@/app/_lib/types";
import { HiArrowUp, HiArrowDown } from "react-icons/hi";
import { cn } from "@/lib/utils";

interface Props {
  stat: Stat;
}

const StatCard: React.FC<Props> = ({ stat }) => {
  const {
    title,
    icon: Icon,
    value,
    change,
    changeType,
    color,
    prefix = "",
    suffix = "",
  } = stat;

  // Format large numbers with commas
  const formatValue = (val: number) => {
    return val.toLocaleString();
  };

  // Color classes for icons based on chart colors
  const iconColorClasses = {
    "chart-1": "bg-chart-1/10 text-chart-1",
    "chart-2": "bg-chart-2/10 text-chart-2",
    "chart-3": "bg-chart-3/10 text-chart-3",
    "chart-4": "bg-chart-4/10 text-chart-4",
    "chart-5": "bg-chart-5/10 text-chart-5",
  };

  const isIncrease = changeType === "increase";

  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="p-6">
        {/* Header - Title & Icon */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <div
            className={cn(
              "p-2.5 rounded-lg",
              iconColorClasses[color as keyof typeof iconColorClasses] ||
                "bg-primary/10 text-primary"
            )}
          >
            <Icon className="h-5 w-5" aria-hidden="true" />
          </div>
        </div>

        {/* Value */}
        <div className="space-y-1">
          <p className="text-3xl font-bold tracking-tight">
            {prefix}
            {formatValue(value)}
            {suffix}
          </p>

          {/* Change Indicator */}
          {change !== undefined && (
            <div className="flex items-center gap-1">
              <span
                className={cn(
                  "inline-flex items-center gap-0.5 text-xs font-medium",
                  isIncrease
                    ? "text-green-600 dark:text-green-500"
                    : "text-red-600 dark:text-red-500"
                )}
              >
                {isIncrease ? (
                  <HiArrowUp className="h-3 w-3" />
                ) : (
                  <HiArrowDown className="h-3 w-3" />
                )}
                {Math.abs(change)}%
              </span>
              <span className="text-xs text-muted-foreground">
                vs last month
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StatCard;
