import { Card, CardContent } from "@/components/ui/card";
import { Package, Shield, Truck } from "lucide-react";

const DescriptionTab: React.FC<{ description?: string }> = ({
  description,
}) => {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="prose prose-gray max-w-none">
          <p className="text-muted-foreground leading-relaxed">
            {description || "No description available for this product."}
          </p>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-start gap-3 p-4 bg-muted rounded-lg">
              <Shield className="w-5 h-5 text-muted-foreground mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-foreground text-sm">
                  Quality Guaranteed
                </h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Premium materials and craftsmanship
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-muted rounded-lg">
              <Package className="w-5 h-5 text-muted-foreground mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-foreground text-sm">
                  Secure Packaging
                </h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Carefully packed for safe delivery
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-muted rounded-lg">
              <Truck className="w-5 h-5 text-muted-foreground mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-foreground text-sm">
                  Fast Shipping
                </h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Quick and reliable delivery
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DescriptionTab;
