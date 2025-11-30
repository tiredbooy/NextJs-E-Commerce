import { CartItems } from "@/app/_components/cart/CartItems";
import { CartSummary } from "@/app/_components/cart/CartSummary";
import { Breadcrumb } from "@/app/_components/reusable/BreadCrump";
import { getUserCart } from "../_lib/services/userService";
import EmptyBasket from "../_components/cart/EmptyBasket";
import { CartItem } from "../_lib/types";

export default async function CartPage() {
  const cart = await getUserCart();

  console.log('cart:', cart);
  const cartItems: CartItem[] = cart?.items || [];

  return (
    <div className="min-h-screen bg-background py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-3">
        <Breadcrumb />
        <h1 className="text-3xl font-bold text-foreground mb-8">
          Shopping Cart
        </h1>

        {cartItems?.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <CartItems items={cartItems} />
            </div>

            <div className="lg:col-span-1">
              <CartSummary items={cartItems} />
            </div>
          </div>
        ) : (
          <EmptyBasket />
        )}
      </div>
    </div>
  );
}
