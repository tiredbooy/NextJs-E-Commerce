"use client";
import { TableRowSkeleton } from "@/app/_components/reusable/SkeletonCard";
import { deleteProduct } from "@/app/_lib/actions/productsAction";
import { Product } from "@/app/_lib/types/product_types";
import { getInitials } from "@/app/_lib/utils/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Spinner } from "@/components/ui/spinner";
import { TableCell, TableRow } from "@/components/ui/table";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { HiDotsVertical, HiEye, HiPencil, HiTrash } from "react-icons/hi";
import { ContextMenu, useContextMenu } from "react-smart-contextmenu";
import { toast } from "sonner";

interface Props {
  // props here
  product: Product;
}

export default function ProductTableRow({ product }: Props) {
  const [isPending, startTransition] = useTransition();
  const { id, title, price, sales, stock, created_at, images } = product;
  const image = images?.[0]?.url || "";
  const { theme } = useTheme();
  const router = useRouter();

  const {
    isOpen,
    position,
    handleContextMenu,
    closeMenu,
    focusedIndex,
    setFocusedIndex,
  } = useContextMenu();

  function handleEditNavigation() {
    router.push(`/admin/products/edit/${id}`);
  }

  function handleDelete() {
    startTransition(async () => {
      const result = await deleteProduct(id);
      toast.success(result?.message);
    });
  }

  const menuOptions = [
    { type: "header" as const, label: product.title },
    {
      label: "View Product",
      onClick: () => router.replace(`/products/${id}`),
      shortcut: "Ctrl+V+X",
      icon: <HiEye />,
    },
    {
      label: "Edit Product",
      onClick: () => handleEditNavigation(),
      icon: <HiPencil />,
    },
    { type: "separator" as const },
    {
      label: "Delete Product",
      onClick: () => handleDelete(),
      danger: true,
      icon: <HiTrash />,
    },
  ];

  return (
    <>
      {isPending ? (
        <TableRowSkeleton />
      ) : (
        <>
          <TableRow
            onContextMenu={handleContextMenu}
            className="cursor-pointer"
          >
            <TableCell>#{id}</TableCell>
            <TableCell>
              {image !== "" ? (
                <Avatar className="w-8 h-8">
                  <AvatarImage
                    src={image}
                    alt={title}
                    className="object-cover"
                  />
                </Avatar>
              ) : (
                <Avatar>
                  <AvatarFallback className="text-xs font-medium">
                    {getInitials(title)}
                  </AvatarFallback>
                </Avatar>
              )}
            </TableCell>
            <TableCell>{title}</TableCell>
            <TableCell>${price ?? 0}</TableCell>
            <TableCell>{stock ?? 0}</TableCell>
            <TableCell>{sales ?? 0}</TableCell>
            <TableCell>{new Date(created_at).toLocaleDateString()}</TableCell>
            <TableCell>
              <div className="flex flex-row gap-1 items-center text-base">
                <HiTrash
                  onClick={handleDelete}
                  className="cursor-pointer text-destructive"
                />
                <HiPencil
                  onClick={handleEditNavigation}
                  className="cursor-pointer text-warning"
                />
                <HiDotsVertical
                  onClick={handleContextMenu}
                  className="cursor-pointer text-primary"
                />
              </div>
            </TableCell>
          </TableRow>
          <ContextMenu
            theme={theme}
            isOpen={isOpen}
            position={position}
            onClose={closeMenu}
            options={menuOptions}
            focusedIndex={focusedIndex}
            setFocusedIndex={setFocusedIndex}
          />
        </>
      )}
    </>
  );
}
