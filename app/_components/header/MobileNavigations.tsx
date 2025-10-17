"use client";

import { useState, useEffect } from "react"; // Add useEffect
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Home, Search, ShoppingCart, User, Menu, X } from "lucide-react";
import Link from "next/link";

// Navigation items configuration
const navItems = [
  {
    id: "home",
    label: "Home",
    icon: Home,
    href: "/",
  },
  {
    id: "search",
    label: "Search",
    icon: Search,
    // href: "/search",
  },
  {
    id: "cart",
    label: "Cart",
    icon: ShoppingCart,
    href: "/cart",
    badge: 3,
  },
  {
    id: "account",
    label: "Account",
    icon: User,
    href: "/account",
  },
];

// Menu items for hamburger menu
const menuItems = [
  { label: "Shop All", href: "/shop" },
  { label: "New Arrivals", href: "/new" },
  { label: "Collections", href: "/collections" },
  { label: "Sale", href: "/sale" },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
];

function MobileNavigations() {
  const [activeItem, setActiveItem] = useState("home");
  const [showMenu, setShowMenu] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Set mounted to true only on client-side
  useEffect(() => {
    setMounted(true);
  }, []);

  const dockContent = (
    <>
      {/* Backdrop Overlay when menu is open */}
      <AnimatePresence>
        {showMenu && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowMenu(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-md backdrop-saturate-150 z-40 md:hidden"
          />
        )}
      </AnimatePresence>

      {/* Slide-out Menu Panel */}
      <AnimatePresence>
        {showMenu && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 left-0 bottom-0 w-[80vw]  bg-card border-r border-border z-50 md:hidden overflow-y-auto"
          >
            {/* Menu Header */}
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h2 className="text-2xl font-bold text-foreground">Menu</h2>
              <button
                onClick={() => setShowMenu(false)}
                className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-muted-hover transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Menu Items */}
            <nav className="p-6 space-y-2">
              {menuItems.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setShowMenu(false)}
                    className="block px-4 py-3 rounded-lg text-lg font-medium text-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Menu Footer */}
            <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-border bg-card">
              <p className="text-sm text-muted-foreground text-center">
                © 2025 Your Store
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Bottom Dock - Only visible on mobile/tablet */}
      <motion.nav
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="fixed bottom-0 left-0 z-50 md:hidden w-[100vw]"
        style={{ right: 0 }}
      >
        {/* Dock Container with Glass Effect */}
        <div className="relative mx-4 mb-2 ">
          {/* Glass Background */}
          <div className="glass rounded-2xl shadow-2xl border border-divider overflow-hidden">
            {/* Active Item Indicator */}
            <motion.div
              className="absolute top-0 h-1 bg-primary rounded-full"
              initial={false}
              animate={{
                x: `${
                  activeItem === "menu"
                    ? 0
                    : (navItems.findIndex((item) => item.id === activeItem) +
                        1) *
                      (100 / (navItems.length + 1))
                }%`,
                width: `${100 / (navItems.length + 1)}%`,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />

            {/* Navigation Items */}
            <div className="flex items-center justify-around p-2 ">
              {/* Menu Button */}
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="relative flex flex-col items-center justify-center flex-1 group"
              >
                <motion.div
                  className="relative"
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  {/* Active Background */}
                  <AnimatePresence>
                    {activeItem === "menu" && (
                      <motion.div
                        layoutId="activeBg"
                        className="absolute inset-0 bg-primary/20 rounded-xl -m-2"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.2 }}
                      />
                    )}
                  </AnimatePresence>

                  {/* Icon */}
                  <motion.div
                    className={`relative z-10 p-2 transition-colors duration-200 ${
                      showMenu ? "text-primary" : "text-foreground/60"
                    }`}
                    animate={{
                      y: showMenu ? -2 : 0,
                      rotate: showMenu ? 180 : 0,
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu size={22} strokeWidth={showMenu ? 2.5 : 2} />
                  </motion.div>
                </motion.div>

                {/* Label */}
                <motion.span
                  className={`text-[10px] font-medium mt-1 transition-all duration-200 ${
                    showMenu
                      ? "text-primary opacity-100"
                      : "text-foreground/60 opacity-0 group-hover:opacity-100"
                  }`}
                  animate={{ y: showMenu ? 0 : 4 }}
                ></motion.span>
              </button>

              {/* Other Nav Items */}
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeItem === item.id;

                return (
                  <Link
                    key={item.id}
                    href={item?.href || "#"} // Fallback to "#" if href is undefined
                    onClick={() => {
                      setActiveItem(item.id);
                      setShowMenu(false);
                    }}
                    className="relative flex flex-col items-center justify-center flex-1 group"
                  >
                    {/* Icon Container */}
                    <motion.div
                      className="relative"
                      whileTap={{ scale: 0.9 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 17,
                      }}
                    >
                      {/* Active Background */}
                      <AnimatePresence>
                        {isActive && (
                          <motion.div
                            layoutId="activeBg"
                            className="absolute inset-0 bg-primary/20 rounded-xl -m-2"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.2 }}
                          />
                        )}
                      </AnimatePresence>

                      {/* Icon */}
                      <motion.div
                        className={`relative z-10 p-2 transition-colors duration-200 ${
                          isActive ? "text-primary" : "text-foreground/60"
                        }`}
                        animate={{ y: isActive ? -2 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />

                        {/* Badge for notifications/cart count */}
                        {item.badge && (
                          <motion.span
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-lg"
                          >
                            {item.badge}
                          </motion.span>
                        )}
                      </motion.div>
                    </motion.div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Safe Area Spacer - Prevents content from being hidden behind dock */}
      <div className="h-24 md:hidden" />
    </>
  );

  // Use portal to render at document body level
  if (!mounted || typeof window === "undefined") {
    return null;
  }

  return dockContent;
}

export default MobileNavigations;
