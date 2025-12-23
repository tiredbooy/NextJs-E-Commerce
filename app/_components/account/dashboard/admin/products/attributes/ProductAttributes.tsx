import { Color, Size } from "@/app/_lib/types/product_types";
import { AttributeCard } from "./AttributeCard";
import { MdColorLens, MdStraighten } from "react-icons/md";
import { useTransition } from "react";
import { createColor, createSize } from "@/app/_lib/actions/productsAction";
import { toast } from "sonner";

interface ProductFormData {
  size_ids: number[];
  color_ids: number[];
}

interface Props {
  data: ProductFormData;
  onChange: (updates: Partial<ProductFormData>) => void;
  sizes: Size[];
  colors: Color[];
}

export default function ProductAttributes({
  data,
  onChange,
  sizes,
  colors,
}: Props) {
  const [isPending, startTransition] = useTransition();
  const selectedSizes = sizes?.filter((size) => data.size_ids.includes(size.id));
  const selectedColors = colors?.filter((color) =>
    data.color_ids.includes(color.id)
  );

  const handleSizeChange = (sizeIds: number[]) => {
    onChange({ size_ids: sizeIds });
  };

  const handleColorChange = (colorIds: number[]) => {
    onChange({ color_ids: colorIds });
  };

  const handleCreateSize = (name: string) => {
    startTransition(async () => {
      const result = await createSize(name.trim());
      if (!result) toast.error("Something went wrong!");
    });
  };

  const handleCreateColor = (name: string, hex: string) => {
    if (hex.startsWith("#")) {
      hex = hex.substring(1);
    }
    startTransition(async () => {
      const result = await createColor(name.trim(), hex.trim());
      if (!result) toast.error("Something went wrong!");
    });
  };

  return (
    <div className="space-y-6">
      <AttributeCard
        type="size"
        icon={<MdStraighten className="w-5 h-5 text-muted-foreground" />}
        title="Product Sizes"
        description="Select all available sizes for this product"
        items={sizes}
        isPending={isPending}
        selectedIds={data.size_ids}
        selectedItems={selectedSizes}
        onSelectionChange={handleSizeChange}
        onCreate={handleCreateSize}
      />

      <AttributeCard
        type="color"
        icon={<MdColorLens className="w-5 h-5 text-muted-foreground" />}
        title="Product Colors"
        description="Select all available colors for this product"
        items={colors}
        selectedIds={data.color_ids}
        selectedItems={selectedColors}
        onSelectionChange={handleColorChange}
        onCreate={handleCreateColor}
      />
    </div>
  );
}
