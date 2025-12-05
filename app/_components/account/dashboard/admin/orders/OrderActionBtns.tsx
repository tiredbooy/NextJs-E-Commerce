"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { FiEdit } from "react-icons/fi";
import {
  IoDownload,
  IoEllipsisVertical,
  IoEye,
  IoTrash,
} from "react-icons/io5";

interface Props {
  orderId: number;
}

export default function OrderActionBtns({ orderId: id }: Props) {
  const router = useRouter();

  function onView(orderId: number) {
    router.push(`/admin/orders/${orderId}`)
  }

  function onDelete(orderId) {
    console.log("value");
  }

  function onEdit(orderId) {
    console.log("value");
  }

  function onDownloadInvoice(orderId) {
    console.log("value");
  }

  return (
    <div className="flex items-center gap-2">
      {/* Quick Actions */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onView?.(id)}
        className="h-8 w-8 text-primary hover:text-primary-hover hover:bg-primary/10"
      >
        <IoEye className="w-4 h-4" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        onClick={() => onDelete?.(id)}
        className="h-8 w-8 text-destructive hover:text-destructive-hover hover:bg-destructive/10"
      >
        <IoTrash className="w-4 h-4" />
      </Button>

      {/* More Actions Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 hover:bg-muted"
          >
            <IoEllipsisVertical className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => onView?.(id)}>
            <IoEye className="w-4 h-4 mr-2" />
            View Details
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onEdit?.(id)}>
            <FiEdit className="w-4 h-4 mr-2" />
            Edit Order
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onDownloadInvoice?.(id)}>
            <IoDownload className="w-4 h-4 mr-2" />
            Download Invoice
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => onDelete?.(id)}
            className="text-destructive focus:text-destructive focus:bg-destructive/10"
          >
            <IoTrash className="w-4 h-4 mr-2" />
            Delete Order
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
