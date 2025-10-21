import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ProductFormData } from "./ProductForm";
import { MdAdd, MdDelete, MdStar, MdStarBorder, MdImage } from "react-icons/md";
import { useState } from "react";
import Image from "next/image";

interface Props {
  data: ProductFormData;
  onChange: (updates: Partial<ProductFormData>) => void;
}

export function ProductImages({ data, onChange }: Props) {
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  const handleImageAdd = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);

    const newImages = files.map((file, index) => ({
      id: `${Date.now()}-${index}`,
      file,
      preview: URL.createObjectURL(file),
      alt: "",
      isPrimary: data.images.length === 0 && index === 0,
    }));

    onChange({ images: [...data.images, ...newImages] });
    e.target.value = "";
  };

  const handleImageRemove = (id: string) => {
    const filtered = data.images.filter((img) => img.id !== id);

    // If we removed the primary image, make the first one primary
    if (filtered.length > 0 && !filtered.some((img) => img.isPrimary)) {
      filtered[0].isPrimary = true;
    }

    onChange({ images: filtered });
  };

  const handleSetPrimary = (id: string) => {
    const updated = data.images.map((img) => ({
      ...img,
      isPrimary: img.id === id,
    }));
    onChange({ images: updated });
  };

  const handleAltChange = (id: string, alt: string) => {
    const updated = data.images.map((img) =>
      img.id === id ? { ...img, alt } : img
    );
    onChange({ images: updated });
  };

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();

    if (draggedIndex === null || draggedIndex === index) return;

    const newImages = [...data.images];
    const draggedImage = newImages[draggedIndex];

    newImages.splice(draggedIndex, 1);
    newImages.splice(index, 0, draggedImage);

    onChange({ images: newImages });
    setDraggedIndex(index);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MdImage />
          Product Images
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Upload Area */}
        <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-info transition-colors">
          <MdImage className="mx-auto text-muted-foreground/70 mb-4" size={48} />
          <Label htmlFor="images" className="cursor-pointer flex flex-row items-center justify-center">
            <span className="text-primary hover:underline">
              Click to upload
            </span>{" "}
            or drag and drop
          </Label>
          <p className="text-sm text-muted-foreground mt-2">
            PNG, JPG, GIF up to 10MB each
          </p>
          <Input
            id="images"
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageAdd}
            className="hidden"
          />
          <Button
            type="button"
            className="mt-4"
            onClick={() => document.getElementById("images")?.click()}
          >
            <MdAdd className="mr-2" />
            Add Images
          </Button>
        </div>

        {/* Images Grid */}
        {data.images.length > 0 && (
          <div>
            <p className="text-sm text-muted-foreground mb-3">
              Drag images to reorder. First image is the primary product image.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {data.images.map((image, index) => (
                <div
                  key={image.id}
                  draggable
                  onDragStart={() => handleDragStart(index)}
                  onDragOver={(e) => handleDragOver(e, index)}
                  onDragEnd={handleDragEnd}
                  className={`relative border-2 rounded-lg overflow-hidden group cursor-move transition-all ${
                    image.isPrimary ? "border-primary" : "border-muted-foreground"
                  } ${draggedIndex === index ? "opacity-50" : ""}`}
                >
                  {/* Primary Badge */}
                  {image.isPrimary && (
                    <div className="absolute top-2 left-2 bg-info text-background px-2 py-1 rounded text-xs font-semibold z-10">
                      Primary
                    </div>
                  )}

                  {/* Image */}
                  <div className="h-40 w-40relative">
                    <Image
                      fill
                      src={image.preview}
                      alt={image.alt || `Product image ${index + 1}`}
                      className="w-full h-40 object-cover"
                    />
                  </div>
                  {/* Overlay Actions */}
                  <div className="absolute inset-0 bg-black/70 bg-opacity-0 group-hover:bg-opacity-50 transition-all flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                    <Button
                      type="button"
                      size="sm"
                      variant="secondary"
                      onClick={() => handleSetPrimary(image.id)}
                      title="Set as primary"
                    >
                      {image.isPrimary ? <MdStar /> : <MdStarBorder />}
                    </Button>
                    <Button
                      type="button"
                      size="sm"
                      variant="destructive"
                      onClick={() => handleImageRemove(image.id)}
                      title="Remove image"
                    >
                      <MdDelete />
                    </Button>
                  </div>
        
                </div>
              ))}
            </div>
          </div>
        )}

        {data.images.length === 0 && (
          <p className="text-center text-muted-foreground py-8">
            No images uploaded yet. Add at least one product image.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
