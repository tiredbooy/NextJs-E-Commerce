"use client";

// components/cart/CartSummary.tsx
import { useState, useTransition } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Tag,
  ShieldCheck,
  Package,
  RotateCcw,
  Lock,
  ArrowRight,
  Check,
  X,
} from "lucide-react";
import { CartItem } from "@/app/_lib/types";
import { createOrder } from "@/app/_lib/actions/orderAction";
import {
  CreateOrderItemReq,
  CreateOrderReq,
} from "@/app/_lib/types/order_types";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";

interface Params {
  items: CartItem[];
}

export function CartSummary({ items }: Params) {
  const [isOrderPending, startOrderTransition] = useTransition();
  const [promoCode, setPromoCode] = useState("");
  const [isApplyingPromo, setIsApplyingPromo] = useState(false);
  const [promoError, setPromoError] = useState("");
  const [appliedPromo, setAppliedPromo] = useState<{
    code: string;
    discount: number;
  } | null>(null);

  // const products = items.map(item => item.product)

  const subtotal = items.reduce((acc, item) => {
    const price = item?.product?.price;
    return acc + price * item.quantity;
  }, 0);

  const discount = appliedPromo?.discount || 0;
  const shipping = subtotal > 1000 ? 0 : 15.0;
  const tax = items.reduce((acc, item) => {
    if (item.product.include_tax) {
      const price = item.product.discount_price || item.product.price;
      return acc + price * item.quantity * 0.1;
    }
    return acc;
  }, 0);
  const total = subtotal - discount + shipping + tax;

  const handleApplyPromo = async () => {
    if (!promoCode.trim()) return;

    setIsApplyingPromo(true);
    setPromoError("");

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Mock validation - replace with actual API call
    if (promoCode.toUpperCase() === "SAVE10") {
      setAppliedPromo({
        code: promoCode.toUpperCase(),
        discount: subtotal * 0.1,
      });
      setPromoCode("");
    } else {
      setPromoError("Invalid promo code");
    }

    setIsApplyingPromo(false);
  };

  const handleRemovePromo = () => {
    setAppliedPromo(null);
    setPromoError("");
  };

  const handleCheckout = () => {
    startOrderTransition(async () => {
      const orderItems: CreateOrderItemReq[] = items.map((item) => {
        return {
          product_id: item.product_id,
          quantity: item.quantity,
          size_id: item.size_id,
          color_id: item.color_id,
        };
      });

      const order: CreateOrderReq = {
        shipping_address_id: 1,
        items: orderItems,
      };
      const result = await createOrder(order);
      if (result.success) {
        toast.message(
          `Order Created Successfully!, ORDER ID #${result.orderID}`
        );
      } else {
        toast.error(result.message);
      }
    });
  };

  return (
    <div className="sticky top-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-card rounded-xl border border-border shadow-sm overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-br from-primary/5 to-primary/10 p-6 border-b border-border">
          <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
            <Package className="w-5 h-5" />
            Order Summary
          </h2>
        </div>

        <div className="p-6">
          {/* Promo Code Section */}
          <div className="mb-6">
            <label
              htmlFor="promo-code"
              className="block text-sm font-medium text-foreground mb-3 flex items-center gap-2"
            >
              <Tag className="w-4 h-4 text-muted-foreground" />
              Have a promo code?
            </label>

            <AnimatePresence mode="wait">
              {appliedPromo ? (
                <motion.div
                  key="applied"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center justify-between p-4 bg-success/10 border border-success/30 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-success/20 flex items-center justify-center">
                      <Check className="w-5 h-5 text-success" />
                    </div>
                    <div>
                      <p className="font-semibold text-success text-sm">
                        {appliedPromo.code}
                      </p>
                      <p className="text-xs text-success/80">
                        -${appliedPromo.discount.toFixed(2)} discount applied
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={handleRemovePromo}
                    className="p-2 hover:bg-destructive/10 rounded-lg transition-colors group"
                    aria-label="Remove promo code"
                  >
                    <X className="w-4 h-4 text-muted-foreground group-hover:text-destructive transition-colors" />
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key="input"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <input
                        id="promo-code"
                        type="text"
                        value={promoCode}
                        onChange={(e) => {
                          setPromoCode(e.target.value.toUpperCase());
                          setPromoError("");
                        }}
                        onKeyDown={(e) =>
                          e.key === "Enter" && handleApplyPromo()
                        }
                        placeholder="ENTER CODE"
                        className="w-full px-4 py-3 bg-input border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-border-focus transition-all font-medium"
                      />
                    </div>
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={handleApplyPromo}
                      disabled={isApplyingPromo || !promoCode.trim()}
                      className="px-5 py-3 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary-hover font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap flex items-center gap-2"
                    >
                      {isApplyingPromo ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                        >
                          <RotateCcw className="w-4 h-4" />
                        </motion.div>
                      ) : (
                        <>
                          Apply
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </motion.button>
                  </div>
                  <AnimatePresence>
                    {promoError && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="mt-2 text-sm text-destructive flex items-center gap-2"
                      >
                        <X className="w-4 h-4" />
                        {promoError}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Price Breakdown */}
          <div className="space-y-4 mb-6 pb-6 border-b border-divider">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="flex justify-between text-foreground"
            >
              <span className="text-muted-foreground">Subtotal</span>
              <span className="font-semibold">${subtotal.toFixed(2)}</span>
            </motion.div>

            <AnimatePresence>
              {discount > 0 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ delay: 0.2 }}
                  className="flex justify-between text-success"
                >
                  <span className="flex items-center gap-2">
                    <Tag className="w-4 h-4" />
                    Discount
                  </span>
                  <span className="font-semibold">-${discount.toFixed(2)}</span>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex justify-between text-foreground"
            >
              <span className="text-muted-foreground flex items-center gap-2">
                <Package className="w-4 h-4" />
                Shipping
              </span>
              {shipping === 0 ? (
                <span className="text-success font-semibold flex items-center gap-1">
                  <Check className="w-4 h-4" />
                  Free
                </span>
              ) : (
                <span className="font-semibold">${shipping.toFixed(2)}</span>
              )}
            </motion.div>

            <AnimatePresence>
              {shipping === 0 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex items-center gap-2 p-3 bg-success/10 rounded-lg border border-success/20"
                >
                  <ShieldCheck className="w-5 h-5 text-success flex-shrink-0" />
                  <p className="text-sm text-success font-medium">
                    You qualify for free shipping!
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex justify-between text-foreground"
            >
              <span className="text-muted-foreground">Tax</span>
              <span className="font-semibold">${tax.toFixed(2)}</span>
            </motion.div>
          </div>

          {/* Total */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="mb-6"
          >
            <div className="flex justify-between items-baseline mb-1">
              <span className="text-lg font-bold text-foreground">Total</span>
              <span className="text-3xl font-bold text-foreground">
                ${total.toFixed(2)}
              </span>
            </div>
            <p className="text-xs text-muted-foreground text-right">
              Including ${tax.toFixed(2)} in taxes
            </p>
          </motion.div>

          {/* Checkout Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleCheckout}
            className="w-full py-4 bg-primary text-background cursor-pointer rounded-lg hover:bg-primary-hover active:bg-primary-active font-semibold transition-colors shadow-md hover:shadow-lg flex items-center justify-center"
          >
            {isOrderPending ? <Spinner /> : "Submit Order"}
          </motion.button>
        </div>

        {/* Trust Badges */}
        <div className="bg-muted/30 px-6 py-5 space-y-3 border-t border-border">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="flex items-start gap-3 text-sm"
          >
            <div className="w-8 h-8 rounded-full bg-success/10 flex items-center justify-center flex-shrink-0">
              <RotateCcw className="w-4 h-4 text-success" />
            </div>
            <div>
              <p className="font-medium text-foreground">Free Returns</p>
              <p className="text-xs text-muted-foreground">
                30-day return policy
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
            className="flex items-start gap-3 text-sm"
          >
            <div className="w-8 h-8 rounded-full bg-info/10 flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="w-4 h-4 text-info" />
            </div>
            <div>
              <p className="font-medium text-foreground">Warranty Included</p>
              <p className="text-xs text-muted-foreground">
                1-year coverage on all products
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 }}
            className="flex items-start gap-3 text-sm"
          >
            <div className="w-8 h-8 rounded-full bg-warning/10 flex items-center justify-center flex-shrink-0">
              <Package className="w-4 h-4 text-warning" />
            </div>
            <div>
              <p className="font-medium text-foreground">Fast Shipping</p>
              <p className="text-xs text-muted-foreground">
                2-3 business days delivery
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Continue Shopping Link */}
      <motion.a
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
        href="/"
        className="mt-6 flex items-center justify-center gap-2 text-link hover:text-link-hover font-medium transition-colors group"
      >
        <ArrowRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform" />
        Continue Shopping
      </motion.a>
    </div>
  );
}
