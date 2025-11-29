// components/cart/CartItems.tsx
import { CartItem as CartItemType } from "@/app/_lib/types";
import { CartItem } from "./CartItem";

interface Props {
  items: CartItemType[];
}

// Server Component - fetches data on the server
export async function CartItems({ items }: Props) {

  return (
    <div className="space-y-4">
      <div className="bg-card rounded-lg border border-border divide-y divide-divider">
        {items.length > 0 &&
          items?.map((item) => <CartItem key={item.id} item={item} />)}
      </div>

      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>
          {items.length} item{items.length !== 1 ? "s" : ""} in cart
        </span>
      </div>
    </div>
  );
}
