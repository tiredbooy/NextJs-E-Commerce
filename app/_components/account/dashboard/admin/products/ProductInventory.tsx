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
    const stock = data.stock || 0;
    return  stock > 0 && stock < 5
  };

  const isOutOfStock = () => {
    const stock = data.stock || 0;
    return stock === 0;
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
          <div className="space-y-2">
            <Label htmlFor="stock">Stock Quantity *</Label>
            <Input
              id="stock"
              type="number"
              min="0"
              value={data.stock}
              onChange={(e) => onChange({ stock: Number(e.target.value) })}
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
        </CardContent>
      </Card>
    </div>
  );
}
