import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Color, Size } from "@/app/_lib/types/product_types";
import { AttributeSelector } from "./AttributeSelector";
import { SelectedBadges } from "./SelectedBadges";

interface AttributeCardProps {
  type: "size" | "color";
  icon: React.ReactNode;
  title: string;
  description: string;
  items: Size[] | Color[];
  selectedIds: number[];
  isPending: boolean,
  selectedItems: Size[] | Color[];
  onSelectionChange: (ids: number[]) => void;
  onCreate: (name: string, hex?: string) => void;
}

export function AttributeCard({
  type,
  icon,
  title,
  description,
  items,
  isPending,
  selectedIds,
  selectedItems,
  onSelectionChange,
  onCreate,
}: AttributeCardProps) {
  const handleToggle = (id: number) => {
    const newIds = selectedIds.includes(id)
      ? selectedIds?.filter((selectedId) => selectedId !== id)
      : [...selectedIds, id];
    onSelectionChange(newIds);
  };

  const handleRemove = (id: number) => {
    onSelectionChange(selectedIds?.filter((selectedId) => selectedId !== id));
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {icon}
            <div>
              <CardTitle>{title}</CardTitle>
              <CardDescription>{description}</CardDescription>
            </div>
          </div>
          {selectedItems?.length > 0 && (
            <Badge variant="secondary" className="text-sm">
              {selectedItems?.length} selected
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {selectedItems?.length > 0 && (
          <SelectedBadges
            type={type}
            items={selectedItems}
            onRemove={handleRemove}
          />
        )}

        <AttributeSelector
          type={type}
          isPending={isPending}
          items={items}
          selectedIds={selectedIds}
          onToggle={handleToggle}
          onCreate={onCreate}
        />
      </CardContent>
    </Card>
  );
}
