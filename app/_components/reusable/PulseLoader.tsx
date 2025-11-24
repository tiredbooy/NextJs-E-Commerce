// components/loading/PulseLoader.tsx
"use client";

import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function PulseLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md border-0 shadow-lg">
        <CardContent className="p-8">
          <div className="flex flex-col items-center space-y-6">
            {/* Animated Logo/Icon */}
            <motion.div
              className="relative"
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-primary-foreground" />
              </div>
            </motion.div>

            {/* Pulsing Text */}
            <div className="text-center space-y-2">
              <motion.h2
                className="text-2xl font-bold text-foreground"
                initial={{ opacity: 0.5 }}
                animate={{ opacity: 1 }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              >
                Loading...
              </motion.h2>
              <motion.p
                className="text-muted-foreground"
                initial={{ opacity: 0.7 }}
                animate={{ opacity: 0.4 }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              >
                Preparing your experience
              </motion.p>
            </div>

            {/* Animated Dots */}
            <div className="flex space-x-2">
              {[0, 1, 2].map((index) => (
                <motion.div
                  key={index}
                  className="w-2 h-2 bg-primary rounded-full"
                  animate={{
                    y: [0, -10, 0],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: index * 0.2,
                  }}
                />
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
