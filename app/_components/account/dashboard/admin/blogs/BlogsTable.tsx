"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { HiDotsVertical, HiEye, HiPencil, HiTrash } from "react-icons/hi";

interface Blog {
  id: number;
  title: string;
  createdAt: Date;
  status: "draft" | "published" | "archived";
}

interface Props {
  onView?: (id: number) => void;
  onEdit?: (id: number) => void;
  onDelete?: (id: number) => void;
}

export default function BlogsTable({ onView, onEdit, onDelete }: Props) {
  // Mock data - replace with your API data later
  const blogs: Blog[] = [
    {
      id: 1,
      title: "Getting Started with React",
      createdAt: new Date("2024-10-15"),
      status: "published",
    },
    {
      id: 2,
      title: "Understanding TypeScript",
      createdAt: new Date("2024-10-18"),
      status: "draft",
    },
    {
      id: 3,
      title: "Building Modern UIs",
      createdAt: new Date("2024-10-10"),
      status: "published",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "published":
        return "bg-success";
      case "draft":
        return "bg-warning";
      case "archived":
        return "bg-muted";
      default:
        return "bg-info";
    }
  };

  return (
    <Card className="px-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {blogs.map((blog) => (
            <TableRow key={blog.id}>
              <TableCell className="font-medium">#{blog.id}</TableCell>
              <TableCell>{blog.title}</TableCell>
              <TableCell>{blog.createdAt.toLocaleDateString()}</TableCell>
              <TableCell>
                <Badge className={`${getStatusColor(blog.status)} text-background font-semibold`}>
                  {blog.status.charAt(0).toUpperCase() + blog.status.slice(1)}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex flex-row gap-1 items-center justify-center">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onView?.(blog.id)}
                    className="h-8 w-8"
                  >
                    <HiEye className="text-info" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onEdit?.(blog.id)}
                    className="h-8 w-8"
                  >
                    <HiPencil className="text-warning" />
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <HiDotsVertical />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => onDelete?.(blog.id)}>
                        <HiTrash className="mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}
