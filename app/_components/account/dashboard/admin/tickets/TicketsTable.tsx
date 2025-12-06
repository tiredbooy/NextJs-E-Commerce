import { getAllTickets } from "@/app/_lib/services/ticketsService";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import TicketTableRow from "./TicketTableRow";
import { Ticket } from "@/app/_lib/types";

interface Props {
  status: string;
}

export default async function TicketsTable({ status }: Props) {
  const fixedStatus = status === "all" ? "" : status;

  const ticketsData = await getAllTickets({ status: fixedStatus });
  const tickets = ticketsData?.tickets;
  return (
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
  );
}
