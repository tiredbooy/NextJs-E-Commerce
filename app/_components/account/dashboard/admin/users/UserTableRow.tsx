"use client";
import { User } from "@/app/_lib/types";
import { Badge } from "@/components/ui/badge";
import { TableCell, TableRow } from "@/components/ui/table";
import Image from "next/image";
import {
  ContextMenu,
  ContextMenuTheme,
  useContextMenu,
} from "react-smart-contextmenu";

import {
  HiBan,
  HiDotsVertical,
  HiEye,
  HiPencil,
  HiTrash,
  HiUser,
} from "react-icons/hi";
import { useTheme } from "next-themes";

interface Props {
  // props here
  user: User;
}

export default function UserTableRow({ user }: Props) {
  const {
    id,
    first_name,
    last_name,
    image,
    email,
    phone,
    total_orders,
    total_spent,
    status,
    created_at,
  } = user;

  const { theme } = useTheme();
  const {
    isOpen,
    position,
    handleContextMenu,
    closeMenu,
    focusedIndex,
    setFocusedIndex,
  } = useContextMenu();

  const userImg = image
    ? image
    : "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAJQApwMBIgACEQEDEQH/xAAaAAEAAwEBAQAAAAAAAAAAAAAAAwQFAQIH/8QAKhABAAIBAwIEBgMBAAAAAAAAAAECAwQRIRJRMTJBYQUTIiNxgVJykTT/xAAVAQEBAAAAAAAAAAAAAAAAAAAAAf/EABYRAQEBAAAAAAAAAAAAAAAAAAABEf/aAAwDAQACEQMRAD8A+qAKgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOuAAAAAAAAAAAAAAAAAEzFY3mdoGZqdROado4x+kdwWM2trXjHHVPf0VMmoy5J+q87e3CMMHeq38p/wBe65stfLktH7RhguYdbMTtm8veIXa2i1YmJ3jvDGT6PNOPJ0z5bTtINMAAAAAAAAAAAB1wBFq8nRp7THjPEMpf+Iz9uke6gsAAAAA3257chtvBRs0nqpWe8OvGCerDSfZ7QAAAAAAAAAAAAVPiMfbpPaVBc+IZJ6ox7RttvuprAAAAAAKNXSf89PwlVtFkm+KYmIjpnaFlAAAAAAAAAAAABQ+Ix9dJ9tlRo63FfJjjojeazyzvDx8VgAAAAA7StrztWN59IKL+gjbBv3stI8FJphpWfGI5SIAAAAAAAAAAAADJ1FPl5rx77tZV12Hqp8yPNWOY7wDPAUAAFr4fWZyWt2jb9qrV0uP5WGI9Z5n8lEoCAAAAAAAAAAAAAj1M/Yyf1esmSMdJvbfaGfn1Vs0TWIitJ/2QVwFAABs1n6Y/DGWsOtmkRW8RNY9fWCjQHK2i1YmPCXUAAAAAAAAAQ5dVixTta289o5Vr6+0+SkR+ZBfQZdVjx8b9U9oUMmfJk815mO3gjME2fU3zbxPFe0IQUAAAAAAWMGrviiKz9Vey7i1GPLt022ntLKEwbQyseoy4+K3nbtPKemv/AJ0/cSYLwixajHl8lue08SlAAAVdbktTHEVnbq8ZdAZroEABQAAAAAAAAAAAAjieOGnpclsmGLWnmJ2BBOAD/9k=";

  const fullname = `${first_name} ${last_name}`;

  const menuOptions = [
    { type: "header" as const, label: fullname, icon : <HiUser /> },
    {
      label: "View Details",
      onClick: () => console.log("Clicked"),
      icon: <HiEye />,
    },
    {
      label: "Edit",
      onClick: () => console.log("Clicked"),
      icon: <HiPencil />,
    },
    { type: "separator" as const },
    {
      label: "Suspend",
      onClick: () => console.log("Clicked"),
      danger: true,
      icon: <HiBan />,
    },
    {
      label: "Delete Product",
      onClick: () => console.log("Clicked"),
      danger: true,
      icon: <HiTrash />,
    },
  ];

  return (
    <>
      <TableRow onContextMenu={handleContextMenu}>
        <TableCell className="text-primary">#{id}</TableCell>
        <TableCell>
          <div className="bg-primary h-10 w-10 rounded-full relative shadow">
            <Image
              src={userImg}
              alt={fullname}
              fill
              className="object-cover rounded-full"
            />
          </div>
        </TableCell>
        <TableCell>
          <div className="flex flex-col gap-1">
            <span className="font-semibold">{fullname}</span>
            <span className="text-muted-foreground text-xs">{email}</span>
          </div>
        </TableCell>
        <TableCell>{phone}</TableCell>
        <TableCell>{total_orders}</TableCell>
        <TableCell>${total_spent}</TableCell>
        <TableCell>
          <Badge className="text-background uppercase font-semibold">
            {status}
          </Badge>
        </TableCell>
        <TableCell>{new Date(created_at).toLocaleDateString()}</TableCell>
        <TableCell className="cursor-pointer" onClick={handleContextMenu}>
          <HiDotsVertical />
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
