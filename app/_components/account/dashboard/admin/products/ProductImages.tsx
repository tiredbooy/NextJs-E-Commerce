import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { MdAdd, MdDelete, MdImage } from "react-icons/md";
import { useState } from "react";
import Image from "next/image";

const API_URL = process.env.API_URL || "http://localhost:8080/api";

interface ProductImage {
  id: number;
  url: string;
  name: string;
}

interface ProductFormData {
  title: string;
  images: ProductImage[];
}

interface Props {
  data: ProductFormData;
}

export function ProductImages({ data, onChange }: Props) {
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState<string>("");

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);

    if (files.length === 0) return;

    setUploading(true);
    setError(null);
    setUploadProgress(
      `Uploading ${files.length} image${files.length > 1 ? "s" : ""}...`
    );

    try {
      const formData = new FormData();
      files.forEach((file) => {
        formData.append("images", file);
      });

      const startTime = Date.now();

      const res = await fetch(`${API_URL}/uploads`, {
        method: "POST",
        body: formData,
      });

      const uploadTime = ((Date.now() - startTime) / 1000).toFixed(1);
      console.log(`✅ Upload completed in ${uploadTime}s`);

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Upload failed (${res.status}): ${errorText}`);
      }

      const results = await res.json();

      console.log('results:', results);
      // Add uploaded images to the data
      const newImages: ProductImage[] = results.urls.map(
        (result: any, index: number) => ({
          url: result.url,
          name: result.original_name || "",
        })
      );

      onChange({ images: [...data.images, ...newImages] });
      setUploadProgress(
        `Successfully uploaded ${files.length} image${
          files.length > 1 ? "s" : ""
        } in ${uploadTime}s`
      );

      // Clear success message after 3 seconds
      setTimeout(() => setUploadProgress(""), 3000);
    } catch (err) {
      console.error("Upload error:", err);
      setError(err instanceof Error ? err.message : "Failed to upload images");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  const handleImageRemove = (id: number) => {
    const filtered = data.images.filter((img) => img.id !== id);
    onChange({ images: filtered });
  };

  const handleAltChange = (id: number, name: string) => {
    const updated = data.images.map((img) =>
      img.id === id ? { ...img, name } : img
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
        <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-colors">
          <MdImage
            className="mx-auto text-muted-foreground/70 mb-4"
            size={48}
          />
          <Label
            htmlFor="images"
            className="cursor-pointer flex flex-row items-center justify-center"
          >
            <span className="text-primary hover:underline">
              Click to upload
            </span>{" "}
            or drag and drop
          </Label>
          <p className="text-sm text-muted-foreground mt-2">
            WebP images up to 10MB each
          </p>
          <Input
            id="images"
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageUpload}
            className="hidden"
            disabled={uploading}
          />
          <Button
            type="button"
            className="mt-4"
            onClick={() => document.getElementById("images")?.click()}
            disabled={uploading}
          >
            <MdAdd className="mr-2" />
            {uploading ? "Processing..." : "Add Images"}
          </Button>

          {uploadProgress && (
            <p className="text-sm text-green-600 dark:text-green-400 mt-3 font-medium">
              {uploadProgress}
            </p>
          )}

          {error && <p className="text-sm text-destructive mt-3">{error}</p>}
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
                    draggedIndex === index ? "opacity-50" : ""
                  } ${index === 0 ? "border-primary" : "border-border"}`}
                >
                  {/* Primary Badge */}
                  {index === 0 && (
                    <div className="absolute top-2 left-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded z-10">
                      Primary
                    </div>
                  )}

                  {/* Image with Next.js Image component for optimization */}
                  <div className="relative h-40 w-full bg-muted">
                    <Image
                      src={image.url}
                      alt={image.name || `${data.title} ${index + 1}`}
                      fill
                      sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      className="object-cover"
                      loading={index < 4 ? "eager" : "lazy"}
                      quality={85}
                      unoptimized={image.url.startsWith("http://localhost")}
                    />
                  </div>

                  {/* Overlay Actions */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
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

                  {/* Image Name Input */}
                  <div className="p-2 bg-background">
                    <Input
                      type="text"
                      placeholder="Alt text"
                      value={image.name}
                      onChange={(e) =>
                        handleAltChange(image.id, e.target.value)
                      }
                      className="text-xs h-7"
                    />
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
