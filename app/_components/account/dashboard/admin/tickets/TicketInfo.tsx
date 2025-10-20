import { Badge } from "@/components/ui/badge";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { MdCalendarToday, MdEmail, MdPerson } from "react-icons/md";

interface TicketInfoProps {
  ticket: {
    id: number;
    subject: string;
    status: "open" | "closed" | "pending";
    priority: "low" | "medium" | "high";
    createdAt: Date;
    userName: string;
    userEmail: string;
  };
  onStatusChange: (status: "open" | "closed" | "pending") => void;
}

export function TicketInfo({ ticket, onStatusChange }: TicketInfoProps) {
  const statusColors = {
    open: "bg-green-500",
    closed: "bg-gray-500",
    pending: "bg-yellow-500",
  };

  const priorityColors = {
    low: "bg-blue-500",
    medium: "bg-orange-500",
    high: "bg-red-500",
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
        <div className="flex items-center gap-2">
          <MdPerson className="text-gray-500" />
          <span className="text-gray-600">User:</span>
          <span className="font-medium">{ticket.userName}</span>
        </div>
        <div className="flex items-center gap-2">
          <MdEmail className="text-gray-500" />
          <span className="text-gray-600">Email:</span>
          <span className="font-medium">{ticket.userEmail}</span>
        </div>
        <div className="flex items-center gap-2">
          <MdCalendarToday className="text-gray-500" />
          <span className="text-gray-600">Created:</span>
          <span className="font-medium">
            {ticket.createdAt.toLocaleDateString()}{" "}
            {ticket.createdAt.toLocaleTimeString()}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">Change Status:</span>
        <Select value={ticket.status} onValueChange={onStatusChange}>
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
