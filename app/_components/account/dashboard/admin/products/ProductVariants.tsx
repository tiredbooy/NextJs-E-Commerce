import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { ProductFormData } from "./ProductForm";
import { MdAdd, MdDelete, MdClose } from "react-icons/md";
import { Badge } from "@/components/ui/badge";

interface Props {
  data: ProductFormData;
  onChange: (updates: Partial<ProductFormData>) => void;
}

export function ProductVariants({ data, onChange }: Props) {
  const handleAddVariant = () => {
    const newVariant = {
      id: Date.now().toString(),
      name: "",
      options: [],
    };
    onChange({ variants: [...data.variants, newVariant] });
  };

  const handleRemoveVariant = (id: string) => {
    onChange({ variants: data.variants.filter((v) => v.id !== id) });
  };

  const handleVariantNameChange = (id: string, name: string) => {
    onChange({
      variants: data.variants.map((v) => (v.id === id ? { ...v, name } : v)),
    });
  };

  const handleAddOption = (variantId: string, option: string) => {
    if (!option.trim()) return;

    onChange({
      variants: data.variants.map((v) =>
        v.id === variantId
          ? { ...v, options: [...v.options, option.trim()] }
          : v
      ),
    });
  };

  const handleRemoveOption = (variantId: string, optionIndex: number) => {
    onChange({
      variants: data.variants.map((v) =>
        v.id === variantId
          ? { ...v, options: v.options.filter((_, i) => i !== optionIndex) }
          : v
      ),
    });
  };

  const getCombinationsCount = () => {
    if (data.variants.length === 0) return 0;
    return data.variants.reduce(
      (acc, variant) => acc * (variant.options.length || 1),
      1
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Product Variants</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between p-4 border rounded-lg bg-card">
          <div>
            <Label htmlFor="hasVariants" className="cursor-pointer">
              This product has variants
            </Label>
            <p className="text-sm text-muted-foreground">
              Create variations like size, color, material, etc.
            </p>
          </div>
          <Switch
            id="hasVariants"
            checked={data.hasVariants}
            onCheckedChange={(checked) => {
              onChange({ hasVariants: checked });
              if (!checked) {
                onChange({ variants: [] });
              }
            }}
          />
        </div>

        {data.hasVariants && (
          <>
            <div className="space-y-4">
              {data.variants.map((variant, index) => (
                <VariantEditor
                  key={variant.id}
                  variant={variant}
                  index={index}
                  onNameChange={(name) =>
                    handleVariantNameChange(variant.id, name)
                  }
                  onAddOption={(option) => handleAddOption(variant.id, option)}
                  onRemoveOption={(optionIndex) =>
                    handleRemoveOption(variant.id, optionIndex)
                  }
                  onRemove={() => handleRemoveVariant(variant.id)}
                />
              ))}
            </div>

            <Button
              type="button"
              variant="outline"
              onClick={handleAddVariant}
              className="w-full"
            >
              <MdAdd className="mr-2" />
              Add Variant Option
            </Button>

            {data.variants.length > 0 && (
              <div className="p-4 bg-card rounded-lg border border-border">
                <p className="text-sm text-foreground">
                  <span className="font-semibold">
                    {getCombinationsCount()}
                  </span>{" "}
                  variant combination(s) will be created
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Example: 3 sizes × 2 colors = 6 variants
                </p>
              </div>
            )}
          </>
        )}

        {!data.hasVariants && (
          <div className="text-center py-8 text-gray-500">
            <p>Enable variants to add options like size, color, or material</p>
            <p className="text-sm mt-2">
              Common examples: Small/Medium/Large, Red/Blue/Green
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

interface VariantEditorProps {
  variant: { id: string; name: string; options: string[] };
  index: number;
  onNameChange: (name: string) => void;
  onAddOption: (option: string) => void;
  onRemoveOption: (index: number) => void;
  onRemove: () => void;
}

function VariantEditor({
  variant,
  index,
  onNameChange,
  onAddOption,
  onRemoveOption,
  onRemove,
}: VariantEditorProps) {
  const [optionInput, setOptionInput] = React.useState("");

  const handleAddOption = () => {
    if (optionInput.trim()) {
      onAddOption(optionInput);
      setOptionInput("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddOption();
    }
  };

  return (
    <div className="border rounded-lg p-4 space-y-3">
      <div className="flex items-center justify-between">
        <Label>Variant {index + 1}</Label>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={onRemove}
          className="text-destructive hover:text-destructive-hover"
        >
          <MdDelete className="mr-1" />
          Remove
        </Button>
      </div>

      <div className="space-y-2">
        <Input
          placeholder="Option name (e.g., Size, Color)"
          value={variant.name}
          onChange={(e) => onNameChange(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label className="text-sm">Option Values</Label>
        <div className="flex gap-2">
          <Input
            placeholder="Add value (e.g., Small, Red)"
            value={optionInput}
            onChange={(e) => setOptionInput(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <Button type="button" onClick={handleAddOption}>
            <MdAdd />
          </Button>
        </div>
      </div>

      {variant.options.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {variant.options.map((option, optionIndex) => (
            <Badge key={optionIndex} variant="secondary" className="gap-1 pr-1">
              {option}
              <button
                type="button"
                onClick={() => onRemoveOption(optionIndex)}
                className="ml-1 hover:bg-card rounded-full p-0.5"
              >
                <MdClose size={14} />
              </button>
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}