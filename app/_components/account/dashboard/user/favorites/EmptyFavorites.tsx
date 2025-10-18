import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { FiHeart, FiTrendingUp } from "react-icons/fi";


export default function EmptyFavorites() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center py-20 px-4"
    >
      <div className="w-32 h-32 bg-muted rounded-full flex items-center justify-center mb-6">
        <FiHeart className="w-16 h-16 text-muted-foreground" />
      </div>
      <h2 className="text-2xl font-bold text-foreground mb-2">
        No Favorites Yet
      </h2>
      <p className="text-muted-foreground text-center max-w-md mb-6">
        Start adding products to your favorites and they will appear here.
      </p>
      <Button className="gap-2 bg-primary hover:bg-primary-hover text-primary-foreground">
        <FiTrendingUp className="w-4 h-4" />
        Browse Products
      </Button>
    </motion.div>
  );
}
