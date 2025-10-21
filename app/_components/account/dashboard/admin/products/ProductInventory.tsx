import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ProductFormData } from "./ProductForm";
import { MdInventory, MdLocalShipping, MdWarning } from "react-icons/md";

interface Props {
  data: ProductFormData;
  onChange: (updates: Partial<ProductFormData>) => void;
}

export function ProductInventory({ data, onChange }: Props) {
  const isLowStock = () => {
    const stock = parseInt(data.stock) || 0;
    const threshold = parseInt(data.lowStockThreshold) || 5;
    return data.trackInventory && stock > 0 && stock <= threshold;
  };

  const isOutOfStock = () => {
    const stock = parseInt(data.stock) || 0;
    return data.trackInventory && stock === 0;
  };

  return (
    <div className="space-y-6">
      {/* Inventory Tracking */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MdInventory />
            Inventory Management
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg bg-card">
            <div>
              <Label htmlFor="trackInventory" className="cursor-pointer">
                Track inventory for this product
              </Label>
              <p className="text-sm text-muted-foreground">
                Monitor stock levels and get low stock alerts
              </p>
            </div>
            <Switch
              id="trackInventory"
              checked={data.trackInventory}
              onCheckedChange={(checked) =>
                onChange({ trackInventory: checked })
              }
            />
          </div>

          {data.trackInventory && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="stock">Stock Quantity *</Label>
                  <Input
                    id="stock"
                    type="number"
                    min="0"
                    value={data.stock}
                    onChange={(e) => onChange({ stock: e.target.value })}
                    placeholder="0"
                    required
                  />
                  {isLowStock() && (
                    <div className="flex items-center gap-1 text-warning text-sm">
                      <MdWarning size={16} />
                      Low stock warning
                    </div>
                  )}
                  {isOutOfStock() && (
                    <div className="flex items-center gap-1 text-destructive text-sm">
                      <MdWarning size={16} />
                      Out of stock
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lowStockThreshold">
                    Low Stock Alert Threshold
                  </Label>
                  <Input
                    id="lowStockThreshold"
                    type="number"
                    min="0"
                    value={data.lowStockThreshold}
                    onChange={(e) =>
                      onChange({ lowStockThreshold: e.target.value })
                    }
                    placeholder="5"
                  />
                  <p className="text-xs text-muted-foreground">
                    Get notified when stock drops below this amount
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <Label htmlFor="allowBackorder" className="cursor-pointer">
                    Allow backorders
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Let customers order when out of stock
                  </p>
                </div>
                <Switch
                  id="allowBackorder"
                  checked={data.allowBackorder}
                  onCheckedChange={(checked) =>
                    onChange({ allowBackorder: checked })
                  }
                />
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Shipping Details */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MdLocalShipping />
            Shipping Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="weight">Weight (kg)</Label>
            <Input
              id="weight"
              type="number"
              step="0.01"
              min="0"
              value={data.weight}
              onChange={(e) => onChange({ weight: e.target.value })}
              placeholder="0.00"
            />
            <p className="text-xs text-muted-foreground">
              Used to calculate shipping costs
            </p>
          </div>

          <div>
            <Label className="mb-2 block">Dimensions (cm)</Label>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="length" className="text-xs text-muted-foreground">
                  Length
                </Label>
                <Input
                  id="length"
                  type="number"
                  step="0.01"
                  min="0"
                  value={data.dimensions.length}
                  onChange={(e) =>
                    onChange({
                      dimensions: {
                        ...data.dimensions,
                        length: e.target.value,
                      },
                    })
                  }
                  placeholder="0"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="width" className="text-xs text-muted-foreground">
                  Width
                </Label>
                <Input
                  id="width"
                  type="number"
                  step="0.01"
                  min="0"
                  value={data.dimensions.width}
                  onChange={(e) =>
                    onChange({
                      dimensions: { ...data.dimensions, width: e.target.value },
                    })
                  }
                  placeholder="0"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="height" className="text-xs text-muted-foreground">
                  Height
                </Label>
                <Input
                  id="height"
                  type="number"
                  step="0.01"
                  min="0"
                  value={data.dimensions.height}
                  onChange={(e) =>
                    onChange({
                      dimensions: {
                        ...data.dimensions,
                        height: e.target.value,
                      },
                    })
                  }
                  placeholder="0"
                />
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Package dimensions for shipping quotes
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
