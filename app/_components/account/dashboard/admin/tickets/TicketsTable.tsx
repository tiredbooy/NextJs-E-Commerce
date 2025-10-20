import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import TicketTableRow from "./TicketTableRow";
import { Ticket } from "@/app/_lib/types";

const tickets: Ticket[] = [
  {
    id: 1,
    client: 1,
    subject: "There was a isue",
    order_id: 123,
    messages: [
      {
        id: 1,
        sender: "user",
        senderName: "Mahdi",
        timestamp: new Date().toISOString(),
        content: "Hello World",
      },
    ],
    priority: "low",
    created_at: new Date().toISOString(),
    status: "open",
  },
  {
    id: 2,
    client: 1,
    subject: "There was a isue",
    order_id: 123,
    messages: [
      {
        id: 1,
        sender: "user",
        senderName: "Mahdi",
        timestamp: new Date().toISOString(),
        content: "Hello World",
      },
    ],
    priority: "medium",
    created_at: new Date().toISOString(),
    status: "pending",
  },
  {
    id: 3,
    client: 1,
    subject: "There was a isue",
    order_id: 123,
    messages: [
      {
        id: 1,
        sender: "user",
        senderName: "Mahdi",
        timestamp: new Date().toISOString(),
        content: "Hello World",
      },
    ],
    priority: "high",
    created_at: new Date().toISOString(),
    status: "close",
  },
  {
    id: 4,
    client: 1,
    subject: "There was a isue",
    order_id: 123,
    messages: [
      {
        id: 1,
        sender: "user",
        senderName: "Mahdi",
        timestamp: new Date().toISOString(),
        content: "Hello World",
      },
    ],
    priority: "low",
    created_at: new Date().toISOString(),
    status: "open",
  },
];

export default function TicketsTable({}: Props) {
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
        {tickets.map((ticket) => (
          <TicketTableRow ticket={ticket} key={ticket.id} />
        ))}
      </TableBody>
    </Table>
  );
}
