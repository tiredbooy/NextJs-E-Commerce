import { getAllTickets } from "@/app/_lib/services/ticketsService";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import TicketTableRow from "./TicketTableRow";

export default async function TicketsTable({}) {
  const tickets = await getAllTickets()

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
        {tickets?.map((ticket) => (
          <TicketTableRow ticket={ticket} key={ticket.id} />
        ))}
      </TableBody>
    </Table>
  );
}
