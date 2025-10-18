"use client";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { FaBan, FaBoxes, FaCheckCircle } from "react-icons/fa";

interface Props {
  totalProducts?: number;
  outOfStock?: number;
  inStock?: number;
}

export default function ProductsInformation({
  totalProducts = 20,
  outOfStock = 20,
  inStock = 20,
}: Props) {
  const information = [
    {
      title: "Total Products",
      icon: FaBoxes,
      value: totalProducts,
      colorClass: "text-primary dark:text-primary",
      bgClass: "bg-bprimary/10 dark:bg-primary/20",
    },
    {
      title: "Out of Stock",
      icon: FaBan,
      value: outOfStock,
      colorClass: "text-destructive dark:text-destructive",
      bgClass: "bg-destructive/10 dark:bg-destructive/20",
    },
    {
      title: "Total In-Stock",
      icon: FaCheckCircle,
      value: inStock,
      colorClass: "text-success dark:text-success",
      bgClass: "bg-success/10 dark:bg-success/20",
    },
  ];

  return (
    <div className="flex flex-wrap md:flex-row gap-3 items-center ">
      {information.map((d, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.08, duration: 0.4 }}
          whileHover={{ y: -3, scale: 1.01 }}
        >
          <Card
            className={`
              relative overflow-hidden w-fit px-4 py-3 rounded-lg bg-card border-border shadow-md hover:shadow-md transition-all duration-300
            `}
          >
            <div className="relative z-10 flex flex-col gap-2">
              <div className="flex flex-row gap-2 items-center">
                <div
                  className={`
                    ${d.colorClass} text-base
                    p-1.5 rounded-md
                    ${d.bgClass}
                    border border-current/20
                  `}
                >
                  <d.icon />
                </div>
                <h4 className="text-xs font-medium text-foreground/60">
                  {d.title}
                </h4>
              </div>
              <span className="text-2xl font-bold text-foreground pl-1">
                {d.value}
              </span>
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
