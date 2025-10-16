// app/cart/page.tsx
import { CartItems } from "@/app/_components/cart/CartItems";
import { CartSummary } from "@/app/_components/cart/CartSummary";

// This is a Server Component by default in App Router
export default async function CartPage() {
  // Fetch cart data on the server
  // const cartData = await fetchCartData(); // Replace with your data fetching logic

  return (
    <div className="min-h-screen bg-[var(--background)] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-[var(--foreground)] mb-8">
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
