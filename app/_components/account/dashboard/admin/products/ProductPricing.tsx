import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { MdAttachMoney, MdLocalOffer } from "react-icons/md";
import { ProductFormData } from "./ProductForm";

interface Props {
  data: ProductFormData;
  onChange: (updates: Partial<ProductFormData>) => void;
}

export function ProductPricing({ data, onChange }: Props) {
  const calculateDiscount = () => {
    const price = parseFloat(data.price) || 0;
    const compareAt = parseFloat(data.compareAtPrice) || 0;

    if (compareAt > price && price > 0) {
      const discount = ((compareAt - price) / compareAt) * 100;
      return discount.toFixed(0);
    }
    return "0";
  };

  const profit = () => {
    const price = parseFloat(data.price) || 0;
    const cost = parseFloat(data.costPerItem) || 0;
    return (price - cost).toFixed(2);
  };

  const margin = () => {
    const price = parseFloat(data.price) || 0;
    const cost = parseFloat(data.costPerItem) || 0;

    if (price > 0) {
      return (((price - cost) / price) * 100).toFixed(2);
    }
    return "0";
  };

  return (
    <div className="space-y-6">
      {/* Pricing */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MdAttachMoney />
            Pricing
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Selling Price *</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  $
                </span>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  min="0"
                  value={data.price}
                  onChange={(e) => onChange({ price: e.target.value })}
                  placeholder="0.00"
                  className="pl-7"
                  required
                />
              </div>
              <p className="text-xs text-muted-foreground">
                The price customers will pay
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="compareAtPrice">Compare-at Price</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  $
                </span>
                <Input
                  id="compareAtPrice"
                  type="number"
                  step="0.01"
                  min="0"
                  value={data.compareAtPrice}
                  onChange={(e) => onChange({ compareAtPrice: e.target.value })}
                  placeholder="0.00"
                  className="pl-7"
                />
              </div>
              <p className="text-xs text-muted-foreground">
                Original price to show savings
              </p>
            </div>
          </div>

          {data.compareAtPrice &&
            parseFloat(data.compareAtPrice) > parseFloat(data.price) && (
              <div className="p-4 bg-accent/40 rounded-lg border border-accent flex items-center gap-2">
                <MdLocalOffer className="text-warning/70" size={24} />
                <div>
                  <p className="font-semibold text-warning">
                    {calculateDiscount()}% OFF
                  </p>
                  <p className="text-sm text-warning/70">
                    Customers save $
                    {(
                      parseFloat(data.compareAtPrice) - parseFloat(data.price)
                    ).toFixed(2)}
                  </p>
                </div>
              </div>
            )}

          <div className="space-y-2">
            <Label htmlFor="costPerItem">Cost per Item</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                $
              </span>
              <Input
                id="costPerItem"
                type="number"
                step="0.01"
                min="0"
                value={data.costPerItem}
                onChange={(e) => onChange({ costPerItem: e.target.value })}
                placeholder="0.00"
                className="pl-7"
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Your cost to acquire this product (for profit calculations)
            </p>
          </div>

          {data.price && data.costPerItem && (
            <div className="grid grid-cols-2 gap-4 p-4 bg-card rounded-lg border border-border">
              <div>
                <p className="text-sm text-muted-foreground">Profit per sale</p>
                <p
                  className={`text-xl font-bold ${
                    Number(profit()) > 0 ? "text-success" : "text-destructive"
                  }`}
                >
                  ${profit()}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Profit margin</p>
                <p
                  className={`text-xl font-bold ${
                    Number(margin()) > 0 ? "text-success" : "text-destructive"
                  } `}
                >
                  {margin()}%
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Tax Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Tax Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <Label htmlFor="taxable" className="cursor-pointer">
                Charge tax on this product
              </Label>
              <p className="text-sm text-muted-foreground">
                Enable if this product is subject to sales tax
              </p>
            </div>
            <Switch
              id="taxable"
              checked={data.taxable}
              onCheckedChange={(checked) => onChange({ taxable: checked })}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
