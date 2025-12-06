import { getTicketDetail } from "@/app/_lib/services/ticketsService";
import { Message, Ticket } from "@/app/_lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MdMessage } from "react-icons/md";
import { TicketInfo } from "./TicketInfo";
import { TicketMessages } from "./TicketMessages";
import { TicketReplyForm } from "./TicketReplyForm";


interface Props {
  ticketId: number;
}

export default async function TicketDetails({ ticketId }: Props) {
  const ticket: Ticket = await getTicketDetail(ticketId)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-row gap-1 items-center text-xl md:text-3xl">
          <MdMessage />
          <h1>Ticket #{ticketId}</h1>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <TicketInfo ticket={ticket} />
        <TicketMessages messages={ticket.messages} />
        <TicketReplyForm
          disabled={ticket.status === "closed"}
        />
      </CardContent>
    </Card>
  );
}
