import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ShoppingBasket } from "lucide-react";
import Link from "next/link";
// import { useRouter } from "next/navigation";

export default function EmptyBasket() {

  return (
    <Card className="flex flex-col items-center justify-center  px-4 bg-card/40 border-card">
      <div className="flex flex-col items-center text-center space-y-6">
        {/* Basket Icon */}
        <div className="relative">
          <div className="w-24 h-24 rounded-full bg-muted/60 flex items-center justify-center">
            <ShoppingBasket className="w-12 h-12 text-primary" />
          </div>
        </div>

        {/* Text Content */}
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold text-muted-foreground">
            Your basket is empty
          </h2>
          <p className="text-muted-foreground/60">
            Looks like you haven't added anything to your basket yet. Start
            shopping to fill it up!
          </p>
        </div>

        {/* Call to Action Button */}
        <Link href={"/products"}>
          <Button className="px-8 py-3 bg-info/80 text-background font-semibold rounded-lg hover:bg-info transition-colors duration-200 shadow-sm hover:shadow-md">
            Start Shopping
          </Button>
        </Link>
      </div>
    </Card>
  );
}
