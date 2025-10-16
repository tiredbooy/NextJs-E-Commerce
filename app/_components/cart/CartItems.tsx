// components/cart/CartItems.tsx
import { FaShoppingBag, FaShoppingBasket } from "react-icons/fa";
import { CartItem } from "./CartItem";

// Mock data - replace with your actual data fetching
const mockCartItems = [
  {
    id: "1",
    name: "Premium Wireless Headphones",
    price: 299.99,
    originalPrice: 399.99,
    quantity: 1,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
    inStock: true,
    attributes: {
      color: "Black",
      size: "One Size",
    },
  },
  {
    id: "2",
    name: "Mechanical Gaming Keyboard",
    price: 149.99,
    quantity: 2,
    image:
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=400&fit=crop",
    inStock: true,
    attributes: {
      color: "RGB",
      switches: "Cherry MX Blue",
    },
  },
  {
    id: "3",
    name: "Ergonomic Office Chair",
    price: 599.99,
    quantity: 1,
    image:
      "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=400&h=400&fit=crop",
    inStock: false,
    attributes: {
      color: "Gray",
      material: "Mesh",
    },
  },
];

export type CartItemType = {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  quantity: number;
  image: string;
  inStock: boolean;
  attributes?: Record<string, string>;
};

// Server Component - fetches data on the server
export async function CartItems() {
  // In production, fetch from your API or database
  // const items = await fetchCartItems();
  const items = mockCartItems

  if (items.length === 0) {
    return (
      <div className="bg-card rounded-lg border border-border p-12 text-center">
        <div className="text-muted-foreground mb-4 flex items-center justify-center max-w-1/2 mx-auto">
          <FaShoppingBasket className=" w-16 h-16 md:w-40 md:h-40 text-center" />
        </div>
        <h3 className="text-xl font-semibold text-foreground mb-2">
          Your cart is empty
        </h3>
        <p className="text-muted-foreground mb-6">
          Add items to your cart to see them here
        </p>
        <a
          href="/"
          className="inline-block px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary-hover font-semibold transition-colors"
        >
          Continue Shopping
        </a>
      </div>
    );
  }

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
