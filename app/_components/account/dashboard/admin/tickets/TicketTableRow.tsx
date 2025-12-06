"use client";
import { updateTicketStatus } from "@/app/_lib/actions/ticketAction";
import { Ticket, TicketStatus } from "@/app/_lib/types";
import { Badge } from "@/components/ui/badge";
import { Spinner } from "@/components/ui/spinner";
import { TableCell, TableRow } from "@/components/ui/table";
import { useTheme } from "next-themes";
import { usePathname, useRouter } from "next/navigation";
import { useTransition } from "react";
import { HiDotsVertical, HiEye, HiPencil, HiTrash } from "react-icons/hi";

import { ContextMenu, useContextMenu } from "react-smart-contextmenu";
import { toast } from "sonner";

interface Props {
  ticket: Ticket;
}

export default function TicketTableRow({ ticket }: Props) {
  const {
    id,
    client_first_name: first_name,
    client_last_name: last_name,
    subject,
    status,
    priority,
    created_at,
  } = ticket;
  const [isPending, startTransition] = useTransition();
  const { theme } = useTheme();
  const pathname = usePathname();
  const route = useRouter();
  const {
    isOpen,
    position,
    handleContextMenu,
    closeMenu,
    focusedIndex,
    setFocusedIndex,
  } = useContextMenu();

  const client = `${first_name} - ${last_name}`;

  let statusColor: string;
  let priorityColor: string;

  function navigateToTicketDetail(): void {
    route.push(`${pathname}/${id}`);
  }

  const updateStatus = (ticketId: number, status: TicketStatus) => {
    startTransition(async () => {
      try {
        const result = await updateTicketStatus(ticketId, status);
        if (result.success) {
          toast.success(result.message);
        } else {
          toast.error(result.message);
        }
      } catch (e: any) {
        toast.error(e.message || "An error Occurred");
      }
    });
  };

  function onUpdateStatus() {
    if (status === "closed") {
      toast.error("You Can't Change Close Status");
      return;
    } else if (status === "open") {
      updateStatus(id, "pending");
    } else if (status === "pending") {
      updateStatus(id, "closed");
    } else {
      toast.error("Could not update status");
    }
  }

  const menuOptions = [
    { type: "header" as const, label: subject },
    {
      label: "View Ticket",
      onClick: () => navigateToTicketDetail(),
      icon: <HiEye />,
    },
    {
      label: "Change Status",
      onClick: () => onUpdateStatus(),
      icon: isPending ? <Spinner /> : <HiPencil />,
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
    case "closed":
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
      <TableRow
        onClick={navigateToTicketDetail}
        onContextMenu={handleContextMenu}
        className="cursor-pointer"
      >
        <TableCell>#{id}</TableCell>
        <TableCell>{client}</TableCell>
        <TableCell>{subject}</TableCell>
        <TableCell>
          <Badge
            className={`${statusColor} font-semibold text-background first-letter:uppercase block`}
          >
            {status}
          </Badge>
        </TableCell>
        <TableCell>
          <Badge
            className={`${priorityColor} text-background font-semibold first-letter:uppercase block`}
          >
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
