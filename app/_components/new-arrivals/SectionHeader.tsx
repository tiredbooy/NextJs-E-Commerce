"use client";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

type Props = {
  badgeIcon?: React.ElementType;
  badge?: string;
  header?: string;
  description?: string;
};

function SectionHeader({
  badgeIcon: Icon = Sparkles,
  badge = "Just Dropped",
  header = "New Arrival",
  description = "Discover our latest collection of premium products, carefully curated just for you",
}: Props) {
  return (
    <motion.div
      className="flex flex-col items-center justify-center mb-12 md:mb-16 text-center relative"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Decorative Badge */}
      <motion.div
        className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 mb-4 ${
          header.includes("New") ? "bg-new-badge/10" : "bg-featured-badge/10"
        }`}
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <Icon
          className={`w-4 h-4 ${
            header.includes("New")
              ? "text-new-badge"
              : "text-featured-badge"
          }`}
        />
        <span
          className={`text-sm font-medium ${
            header.includes("New")
              ? "text-new-badge"
              : "text-featured-badge"
          }`}
        >
          {badge}
        </span>
      </motion.div>

      {/* Main Heading */}
      <motion.h1
        className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 bg-gradient-to-r from-foreground via-foreground/90 to-foreground/70 bg-clip-text text-transparent"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        {header}
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        className="text-muted-foreground text-base md:text-lg"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        {description}
      </motion.p>

      {/* Decorative Line */}
      <motion.div
        className={`w-48 h-1 bg-gradient-to-r from-transparent ${
          header.includes("New") ? "via-primary" : "via-warning"
        } to-transparent mt-6`}
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, duration: 0.8 }}
      />

      {/* Background Glow Effect */}
      <div className="absolute inset-0 -z-10 blur-3xl opacity-20">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/30 rounded-full" />
      </div>
    </motion.div>
  );
}

export default SectionHeader;
