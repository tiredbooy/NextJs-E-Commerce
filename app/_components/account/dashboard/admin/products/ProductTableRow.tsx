"use client";
import { Product } from "@/app/_lib/types";
import { TableCell, TableRow } from "@/components/ui/table";
import { useTheme } from "next-themes";
import Image from "next/image";
import { FaEye } from "react-icons/fa";
import { HiDotsVertical, HiEye, HiPencil, HiTrash } from "react-icons/hi";
import {
  ContextMenu,
  ContextMenuTheme,
  useContextMenu,
} from "react-smart-contextmenu";

interface Props {
  // props here
  product: Product;
}

export default function ProductTableRow({ product }: Props) {
  const { id, title, price, sales, stock_quantity, created_at, images } =
    product;
  const image = images[0].url;
  const { theme } = useTheme();

  const {
    isOpen,
    position,
    handleContextMenu,
    closeMenu,
    focusedIndex,
    setFocusedIndex,
  } = useContextMenu();

  const menuOptions = [
    { type: "header" as const, label: product.title },
    {
      label: "View Product",
      onClick: () => console.log("Clicked"),
      shortcut: "Ctrl+V+X",
      icon: <HiEye />,
    },
    {
      label: "Edit Product",
      onClick: () => console.log("Clicked"),
      icon: <HiPencil />,
    },
    { type: "separator" as const },
    {
      label: "Delete Product",
      onClick: () => console.log("Clicked"),
      danger : true,
      icon: <HiTrash />,
    },
  ];

  return (
    <>
      <TableRow onContextMenu={handleContextMenu} className="cursor-pointer">
        <TableCell>#{id}</TableCell>
        <TableCell>
          <Image width={40} height={40} src={image} alt={title} />
        </TableCell>
        <TableCell>{title}</TableCell>
        <TableCell>${price}</TableCell>
        <TableCell>{stock_quantity}</TableCell>
        <TableCell>{sales}</TableCell>
        <TableCell>{new Date(created_at).toLocaleDateString()}</TableCell>
        <TableCell>
          <div className="flex flex-row gap-1 items-center text-base">
            <HiTrash className="cursor-pointer text-destructive" />
            <HiPencil className="cursor-pointer text-warning" />
            <HiDotsVertical onClick={handleContextMenu} className="cursor-pointer text-primary" />
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
  );
}
