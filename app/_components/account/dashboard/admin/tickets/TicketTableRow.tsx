"use client";
import { Ticket } from "@/app/_lib/types";
import { Badge } from "@/components/ui/badge";
import { TableCell, TableRow } from "@/components/ui/table";
import { useTheme } from "next-themes";
import { HiDotsVertical, HiEye, HiPencil, HiTrash } from "react-icons/hi";

import {
  ContextMenu,
  useContextMenu
} from "react-smart-contextmenu";

interface Props {
  // props here
  ticket: Ticket;
}

export default function TicketTableRow({ ticket }: Props) {
  const { id, client, subject, status, priority, created_at } = ticket;
  const { theme } = useTheme();

  let statusColor: string;
  let priorityColor: string;

  const {
    isOpen,
    position,
    handleContextMenu,
    closeMenu,
    focusedIndex,
    setFocusedIndex,
  } = useContextMenu();

  const menuOptions = [
    { type: "header" as const, label: subject },
    {
      label: "View Ticket",
      onClick: () => console.log("Clicked"),
      icon: <HiEye />,
    },
    {
      label: "Change Status",
      onClick: () => console.log("Clicked"),
      icon: <HiPencil />,
    },
    { type: "separator" as const },
    {
      label: "Delete Ticket",
      onClick: () => console.log("Clicked"),
      danger: true,
      icon: <HiTrash />,
    },
  ];

  switch (status) {
    case "open":
      statusColor = "bg-badge-success";
      break;
    case "close":
      statusColor = "bg-badge-error";
      break;
    case "pending":
      statusColor = "bg-badge-warning";
      break;
  }

  switch (priority) {
    case "low":
      priorityColor = "bg-badge-success";
      break;
    case "medium":
      priorityColor = "bg-badge-warning";
      break;
    case "high":
      priorityColor = "bg-badge-error";
      break;
  }

  return (
    <>
      <TableRow onContextMenu={handleContextMenu} className="cursor-pointer">
        <TableCell>#{id}</TableCell>
        <TableCell>{client}</TableCell>
        <TableCell>{subject}</TableCell>
        <TableCell>
          <Badge className={`${statusColor} font-semibold text-background`}>
            {status}
          </Badge>
        </TableCell>
        <TableCell>
          <Badge className={`${priorityColor} text-background font-semibold`}>
            {priority}
          </Badge>
        </TableCell>
        <TableCell>{new Date(created_at).toLocaleString()}</TableCell>
        <TableCell onClick={handleContextMenu}>
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
