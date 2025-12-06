import { CreateTicketMessage, Ticket, TicketStatus } from "../types";
import { authenticatedRequest } from "./authService";

export async function getAllTickets(): Promise<Ticket[]> {
  const response = await authenticatedRequest({
    method: "GET",
    url: "/api/admin/tickets/",
  });

  return response;
}

export async function getTicketDetail(id: number): Promise<Ticket> {
  const response = await authenticatedRequest({
    method: "GET",
    url: `/api/tickets/${id}`,
  });

  return response;
}

export async function addMessageReq(id: number, data: CreateTicketMessage) {
  const response = await authenticatedRequest({
    method: "POST",
    url: `/api/tickets/${id}/messages`,
    data,
  });

  return response;
}

export async function updateTicketStatusReq(id: number, status: TicketStatus) {
  const response = await authenticatedRequest({
    method: "PATCH",
    url: `/api/tickets/${id}`,
    data: { status : status },
  });
  return response;
}
