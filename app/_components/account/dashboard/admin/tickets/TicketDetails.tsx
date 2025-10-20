"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MdMessage } from "react-icons/md";
import { useState } from "react";
import { TicketInfo } from "./TicketInfo";
import { TicketMessages } from "./TicketMessages";
import { TicketReplyForm } from "./TicketReplyForm";
import { Message } from "@/app/_lib/types";

interface TicketData {
  id: number;
  subject: string;
  status: "open" | "closed" | "pending";
  priority: "low" | "medium" | "high";
  createdAt: Date;
  userName: string;
  userEmail: string;
  messages: Message[];
}

interface Props {
  ticketId: number;
}

export default function TicketDetails({ ticketId }: Props) {
  // Mock data - replace with actual API call
  const [ticket, setTicket] = useState<TicketData>({
    id: ticketId,
    subject: "Cannot access my account",
    status: "open",
    priority: "high",
    createdAt: new Date("2024-10-15T10:30:00"),
    userName: "John Doe",
    userEmail: "john.doe@example.com",
    messages: [
      {
        id: 1,
        content:
          "I've been trying to log into my account for the past hour but keep getting an error message. Can you help?",
        sender: "user",
        senderName: "John Doe",
        timestamp: new Date("2024-10-15T10:30:00"),
      },
      {
        id: 2,
        content:
          "Hello John, I'd be happy to help you with this issue. Can you please tell me what error message you're seeing?",
        sender: "admin",
        senderName: "Support Team",
        timestamp: new Date("2024-10-15T11:15:00"),
      },
      {
        id: 3,
        content:
          "It says 'Invalid credentials' but I'm sure my password is correct. I even tried resetting it.",
        sender: "user",
        senderName: "John Doe",
        timestamp: new Date("2024-10-15T11:45:00"),
      },
    ],
  });

  const handleSendMessage = (content: string) => {
    const newMessage: Message = {
      id: ticket.messages.length + 1,
      content,
      sender: "admin",
      senderName: "Support Team",
      timestamp: new Date(),
    };

    setTicket((prev) => ({
      ...prev,
      messages: [...prev.messages, newMessage],
    }));
  };

  const handleStatusChange = (newStatus: "open" | "closed" | "pending") => {
    setTicket((prev) => ({ ...prev, status: newStatus }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-row gap-1 items-center text-xl md:text-3xl">
          <MdMessage />
          <h1>Ticket #{ticketId}</h1>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <TicketInfo ticket={ticket} onStatusChange={handleStatusChange} />
        <TicketMessages messages={ticket.messages} />
        <TicketReplyForm
          onSendMessage={handleSendMessage}
          disabled={ticket.status === "closed"}
        />
      </CardContent>
    </Card>
  );
}
