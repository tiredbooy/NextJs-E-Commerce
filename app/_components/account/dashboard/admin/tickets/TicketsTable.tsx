import {
  getAllTickets,
  getUserTickets,
} from "@/app/_lib/services/ticketsService";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import TicketTableRow from "./TicketTableRow";
import { UserRole, Ticket } from "@/app/_lib/types";
import { IoWarning } from "react-icons/io5";

interface Props {
  status: string;
  role: UserRole;
}

export default async function TicketsTable({ status, role }: Props) {
  const fixedStatus = status === "all" ? "" : status;

  let ticketsData;

  if (role === "admin") {
    ticketsData = await getAllTickets({ status: fixedStatus });
  } else {
    ticketsData = await getUserTickets({ status: fixedStatus });
  }
  const tickets = ticketsData?.tickets;
  return (
    <>
      {tickets && tickets.length > 1 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tickets?.map((ticket: Ticket) => (
              <TicketTableRow ticket={ticket} key={ticket.id} />
            ))}
          </TableBody>
        </Table>
      ) : (
        <div className="bg-destructive text-background px-4 py-2 rounded-md font-semibold flex flex-row gap-2 items-center justify-center">
          <IoWarning />
          <span>There is No Tickets At this time.</span>
        </div>
      )}
    </>
  );
}
