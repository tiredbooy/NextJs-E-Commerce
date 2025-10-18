"use client";
import { motion } from "framer-motion";

export default function SettingSection({ title, children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h3 className="text-lg font-semibold text-foreground mb-4">{title}</h3>
      <div className="space-y-1">{children}</div>
    </motion.div>
  );
}