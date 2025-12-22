import { getTicketDetail } from "@/app/_lib/services/ticketsService";
import { Message, Ticket } from "@/app/_lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MdMessage } from "react-icons/md";
import { TicketInfo } from "./TicketInfo";
import { TicketMessages } from "./TicketMessages";
import { TicketReplyForm } from "./TicketReplyForm";
import { Breadcrumb } from "@/app/_components/reusable/BreadCrump";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

interface Props {
  ticketId: number;
}

export default async function TicketDetails({ ticketId }: Props) {
  const ticket: Ticket = await getTicketDetail(ticketId);

  return (
    <div className="flex flex-col gap-5">
      <Breadcrumb />
      <Card>
        <CardHeader>
          <CardTitle className="flex flex-row gap-2 items-center">
            <Link href="/account/tickets">
              <ArrowLeft className="text-muted-foreground hover:text-foreground cursor-pointer duration-200" />
            </Link>
            <div className="flex flex-row gap-1 items-center text-xl md:text-3xl">
              <MdMessage />
              <h1>Ticket #{ticketId}</h1>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <TicketInfo ticket={ticket} />
          <TicketMessages messages={ticket.messages} />
          <TicketReplyForm
            ticketId={ticketId}
            disabled={ticket.status === "closed"}
          />
        </CardContent>
      </Card>
    </div>
  );
}
