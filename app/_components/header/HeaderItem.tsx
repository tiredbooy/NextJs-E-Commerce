"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useEffect } from "react";
import HeaderLogo from "./HeaderLogo";
import HeaderNav from "./HeaderNav";
import HeaderSearch from "./HeaderSearch";
import HeaderUserMenu from "./HeaderUserMenu";
import AnnouncementBar from "./AnnouncementBar";
import { Announcment } from "@/app/_lib/types";

interface Props {
  announcment: Announcment;
}

const HeaderItem: React.FC<Props> = ({ announcment }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();

  // Smooth scroll-based transformations
  const logoScale = useTransform(scrollY, [0, 100], [1, 0.92]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      className="sticky top-0 z-50 w-full border-b shadow-md"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Announcement Bar - Slide out on scroll */}
      {announcment && (
        <motion.div
          initial={{ height: "auto", opacity: 1 }}
          animate={{
            height: isScrolled ? 0 : "auto",
            opacity: isScrolled ? 0 : 1,
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="overflow-hidden block"
        >
          <AnnouncementBar announcmentObj={announcment} />
        </motion.div>
      )}

      {/* Main Header - Single Row with 4 Items */}
      <motion.div
        className={`
           flex-row justify-between items-center
          bg-background/80 backdrop-blur-xl
          border-b transition-all duration-300 px-6 hidden md:flex
          ${
            isScrolled
              ? "border-border/50 shadow-lg shadow-black/5 py-3"
              : "border-border/20 py-4"
          }
        `}
      >
        {/* Logo */}
        <motion.div
          style={{ scale: logoScale }}
          className="flex-shrink-0"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          <HeaderLogo />
        </motion.div>

        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <HeaderNav />
        </motion.div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <HeaderSearch />
        </motion.div>

        {/* User Menu */}
        <motion.div
          className="flex-shrink-0"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <HeaderUserMenu />
        </motion.div>
      </motion.div>

      {/* Scroll Progress Indicator */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-primary/60 to-primary origin-left"
        style={{
          scaleX: useTransform(scrollY, [0, 1000], [0, 1]),
        }}
      />
    </motion.header>
  );
};

export default HeaderItem;
