import { CartItems } from "@/app/_components/cart/CartItems";
import { CartSummary } from "@/app/_components/cart/CartSummary";
import { Breadcrumb } from "../../_components/reusable/BreadCrump";

export default async function CartPage() {
  return (
    <div className="min-h-screen bg-background py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-3">
        <Breadcrumb />
        <h1 className="text-3xl font-bold text-foreground mb-8">
          Shopping Cart
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items - Takes 2 columns on large screens */}
          <div className="lg:col-span-2">
            <CartItems />
          </div>

          {/* Cart Summary - Takes 1 column on large screens */}
          <div className="lg:col-span-1">
            <CartSummary />
          </div>
        </div>
      </div>
    </div>
  );
}
