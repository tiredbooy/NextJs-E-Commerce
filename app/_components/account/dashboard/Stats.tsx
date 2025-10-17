import { Stat } from "@/app/_lib/types";
import {
  HiOutlineShoppingBag,
  HiOutlineUsers,
  HiOutlineCurrencyDollar,
  HiOutlineCube,
} from "react-icons/hi";
import StatCard from "./StatCard";

const stats: Stat[] = [
  {
    title: "Total Revenue",
    icon: HiOutlineCurrencyDollar,
    value: 45231,
    change: 20.1,
    changeType: "increase",
    color: "chart-1",
    prefix: "$",
  },
  {
    title: "New Orders",
    icon: HiOutlineShoppingBag,
    value: 156,
    change: 12.5,
    changeType: "increase",
    color: "chart-2",
  },
  {
    title: "New Customers",
    icon: HiOutlineUsers,
    value: 89,
    change: -5.2,
    changeType: "decrease",
    color: "chart-3",
  },
  {
    title: "Products in Stock",
    icon: HiOutlineCube,
    value: 1247,
    change: 2.3,
    changeType: "increase",
    color: "chart-4",
  },
];

interface Props {
  data?: Stat[];
  isLoading?: boolean;
}

const Stats: React.FC<Props> = ({ data, isLoading = false }) => {
  const statsData = data || stats;

  if (isLoading) {
    return (
      <>
        {[...Array(4)].map((_, i) => (
          <div key={i} className="rounded-lg border bg-card p-6 animate-pulse">
            <div className="flex items-center justify-between mb-4">
              <div className="h-4 w-24 bg-muted rounded" />
              <div className="h-10 w-10 bg-muted rounded-lg" />
            </div>
            <div className="h-8 w-20 bg-muted rounded mb-2" />
            <div className="h-3 w-16 bg-muted rounded" />
          </div>
        ))}
      </>
    );
  }

  return (
    <>
      {statsData.map((stat, index) => (
        <StatCard key={stat.title + index} stat={stat} />
      ))}
    </>
  );
};

export default Stats;
