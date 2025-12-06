import { Ticket } from "@/app/_lib/types";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MdCalendarToday, MdPerson } from "react-icons/md";

interface TicketInfoProps {
  ticket: Ticket;
}

export function TicketInfo({ ticket }: TicketInfoProps) {
  const userName = `${ticket?.client_first_name || ""} ${
    ticket?.client_last_name || ""
  }`;
  const statusColors = {
    open: "bg-success/10 text-success",
    closed: "bg-muted/10 text-muted-foreground",
    pending: "bg-warning/10 text-warning",
  };

  const priorityColors = {
    low: "bg-info/10 text-info",
    medium: "bg-warning/10 text-warning",
    high: "bg-destructive/10 text-destructive",
  };

  return (
    <div className="border rounded-lg p-4 space-y-4">
      <div>
        <h2 className="text-lg font-semibold mb-2">{ticket.subject}</h2>
        <div className="flex flex-wrap gap-2">
          <Badge className={statusColors[ticket.status]}>
            {ticket.status.toUpperCase()}
          </Badge>
          <Badge className={priorityColors[ticket.priority]}>
            {ticket.priority.toUpperCase()} PRIORITY
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 text-sm">
        {userName !== "" && (
          <div className="flex items-center gap-2">
            <MdPerson className="text-muted-foreground/90" />
            <span className="text-muted-foreground/90">User:</span>
            <span className="font-medium text-foreground/80 first-letter:uppercase">
              {userName}
            </span>
          </div>
        )}
        <div className="flex items-center gap-2">
          <MdCalendarToday className="text-muted-foreground/90" />
          <span className="text-muted-foreground/90">Created:</span>
          <span className="font-medium text-foreground/80">
            {new Date(ticket.created_at).toLocaleDateString()}{" "}
            {new Date(ticket.created_at).toLocaleTimeString()}
          </span>
        </div>
        {ticket?.updated_at && (
          <div className="flex items-center gap-2">
            <MdCalendarToday className="text-muted-foreground/90" />
            <span className="text-muted-foreground/90">Updated At:</span>
            <span className="font-medium text-foreground/80">
              {new Date(ticket.updated_at).toLocaleDateString()}{" "}
              {new Date(ticket.updated_at).toLocaleTimeString()}
            </span>
          </div>
        )}
      </div>

      <div
        className={`flex items-center gap-2 ${
          ticket.status === "closed" || true ? "text-muted-foreground/40" : ""
        }`}
      >
        <span className="text-sm font-medium">Change Status:</span>
        <Select
          value={ticket.status}
          disabled={ticket.status === "closed" || true}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="open">Open</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="closed">Closed</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
