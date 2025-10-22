"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { motion } from "framer-motion";
import { Mail } from "lucide-react";

interface Props {
  // props here
}

export default function Auth({}: Props) {
  return (
    <div className="w-full min-h-[100svh] flex justify-center items-center bg-gradient-to-bl from-background via-card to-background p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-1/4"
      >
        <Card>
          <CardHeader className="space-y-2 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1, type: "spring" }}
              className="mx-auto w-12 h-12 bg-primary rounded-full flex items-center justify-center mb-2"
            >
              <Mail className="w-6 h-6 text-primary-foreground" />
            </motion.div>
            <CardTitle className="text-xl">Welcome back</CardTitle>
            <CardDescription>Enter your email to continue</CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="you@example.com" />
            </div>

            <Button className="w-full text-background font-semibold">
              Continue
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline">
                <FcGoogle className="w-5 h-5 mr-2" />
                Google
              </Button>
              <Button variant="outline">
                <FaGithub className="w-5 h-5 mr-2" />
                GitHub
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
