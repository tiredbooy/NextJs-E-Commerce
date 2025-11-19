import { Stat } from "@/app/_lib/types";
import {
  HiOutlineCube,
  HiOutlineCurrencyDollar,
  HiOutlineShoppingBag,
  HiOutlineUsers,
} from "react-icons/hi";
import StatCard from "./StatCard";
import {
  getCustomerGrowthStats,
  getOrderStats,
  getRevenueStats,
  getSalesStats,
} from "@/app/_lib/services/analyticsService";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const Stats = async () => {
  const [revenue, orders, customers, sales] = await Promise.all([
    getRevenueStats(),
    getOrderStats(),
    getCustomerGrowthStats(),
    getSalesStats(),
  ]);

  const stats: Stat[] = [
    {
      title: "Total Revenue",
      icon: HiOutlineCurrencyDollar,
      value: revenue?.value ?? 0,
      change: revenue?.change ?? 0,
      changeType: (revenue?.change ?? 0) > 0 ? "increase" : "decrease",
      color: "chart-1",
      prefix: "$",
    },
    {
      title: "New Orders",
      icon: HiOutlineShoppingBag,
      value: orders?.value ?? 0,
      change: orders?.change ?? 0,
      changeType: (orders?.change ?? 0) > 0 ? "increase" : "decrease",
      color: "chart-1",
    },
    {
      title: "New Users",
      icon: HiOutlineUsers,
      value: customers?.value ?? 0,
      change: customers?.change ?? 0,
      changeType: (customers?.change ?? 0) > 0 ? "increase" : "decrease",
      color: "chart-1",
    },
    {
      title: "New Sales",
      icon: HiOutlineCube,
      value: sales?.value ?? 0,
      change: sales?.change ?? 0,
      changeType: (sales?.change ?? 0) > 0 ? "increase" : "decrease",
      color: "chart-1",
    },
  ];

  return (
    <>
      {stats.map((stat, index) => (
        <StatCard key={stat.title + index} stat={stat} />
      ))}
    </>
  );
};

export default Stats;
