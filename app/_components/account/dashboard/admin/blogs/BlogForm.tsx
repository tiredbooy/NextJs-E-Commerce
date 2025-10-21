"use client";
import { Breadcrumb } from "@/app/_components/reusable/BreadCrump";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { MdSave } from "react-icons/md";

interface BlogFormData {
  title?: string;
  content?: string;
  excerpt?: string;
  status?: "draft" | "published" | "archived";
  image?: File | null;
  imagePreview?: string;
  // Blog Details
  author?: string;
  category?: string;
  tags?: string;
  publishDate?: string;
  readTime?: string;
  // SEO Fields
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string;
  slug?: string;
}

interface Props {
  mode?: "create" | "edit";
  initialData?: Partial<BlogFormData>;
  onSubmit: (data: BlogFormData) => void;
  isLoading?: boolean;
}

export default function BlogForm({
  mode = "create",
  initialData,
  onSubmit,
  isLoading = false,
}: Props) {
  const [formData, setFormData] = useState<BlogFormData>({
    title: initialData?.title || "",
    content: initialData?.content || "",
    excerpt: initialData?.excerpt || "",
    status: initialData?.status || "draft",
    image: null,
    imagePreview: initialData?.imagePreview || "",
    metaTitle: initialData?.metaTitle || "",
    metaDescription: initialData?.metaDescription || "",
    keywords: initialData?.keywords || "",
    slug: initialData?.slug || "",
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, image: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          imagePreview: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  const handleTitleChange = (title: string) => {
    setFormData({
      ...formData,
      title,
      slug: formData.slug || generateSlug(title),
      metaTitle: formData.metaTitle || title,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="space-y-6">
      <Breadcrumb />
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">
          {mode === "create" ? "Create New Blog" : "Edit Blog"}
        </h1>
        <div className="flex gap-2">
          <Button
            disabled={isLoading}
            variant="outline"
            onClick={(e) => {
              setFormData({ ...formData, status: "draft" });
              handleSubmit(e);
            }}
          >
            Save as Draft
          </Button>
          <Button
            disabled={isLoading}
            onClick={(e) => {
              setFormData({ ...formData, status: "published" });
              handleSubmit(e);
            }}
            className="gap-2"
          >
            <MdSave />
            {isLoading ? "Saving..." : "Publish"}
          </Button>
        </div>
      </div>

      {/* Basic Information */}
      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="Enter blog title"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="slug">URL Slug *</Label>
            <Input
              id="slug"
              value={formData.slug}
              onChange={(e) =>
                setFormData({ ...formData, slug: e.target.value })
              }
              placeholder="blog-url-slug"
              required
            />
            <p className="text-xs text-gray-500">
              URL: /blog/{formData.slug || "your-slug"}
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="excerpt">Excerpt</Label>
            <Textarea
              id="excerpt"
              value={formData.excerpt}
              onChange={(e) =>
                setFormData({ ...formData, excerpt: e.target.value })
              }
              placeholder="Brief description of the blog post"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Content *</Label>
            <Textarea
              id="content"
              value={formData.content}
              onChange={(e) =>
                setFormData({ ...formData, content: e.target.value })
              }
              placeholder="Write your blog content here..."
              rows={12}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select
              value={formData.status}
              onValueChange={(value: any) =>
                setFormData({ ...formData, status: value })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="published">Published</SelectItem>
                <SelectItem value="archived">Archived</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Featured Image */}
      <Card>
        <CardHeader>
          <CardTitle>Featured Image</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="image">Upload Image</Label>
            <Input
              id="image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>

          {formData.imagePreview && (
            <div className="border rounded-lg p-4">
              <p className="text-sm font-medium mb-2">Preview:</p>
              <img
                src={formData.imagePreview}
                alt="Preview"
                className="max-w-full h-auto max-h-64 rounded-lg object-cover"
              />
            </div>
          )}
        </CardContent>
      </Card>

      {/* SEO Settings */}
      <Card>
        <CardHeader>
          <CardTitle>SEO Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="metaTitle">Meta Title</Label>
            <Input
              id="metaTitle"
              value={formData.metaTitle}
              onChange={(e) =>
                setFormData({ ...formData, metaTitle: e.target.value })
              }
              placeholder="SEO title (defaults to blog title)"
              maxLength={60}
            />
            <p className="text-xs text-gray-500">
              {formData.metaTitle.length}/60 characters
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="metaDescription">Meta Description</Label>
            <Textarea
              id="metaDescription"
              value={formData.metaDescription}
              onChange={(e) =>
                setFormData({ ...formData, metaDescription: e.target.value })
              }
              placeholder="Brief description for search engines"
              rows={3}
              maxLength={160}
            />
            <p className="text-xs text-gray-500">
              {formData.metaDescription.length}/160 characters
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="keywords">Keywords</Label>
            <Input
              id="keywords"
              value={formData.keywords}
              onChange={(e) =>
                setFormData({ ...formData, keywords: e.target.value })
              }
              placeholder="keyword1, keyword2, keyword3"
            />
            <p className="text-xs text-gray-500">
              Separate keywords with commas
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
