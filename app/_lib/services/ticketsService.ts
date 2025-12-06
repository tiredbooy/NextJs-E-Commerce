import { CreateTicketMessage, Ticket } from "../types";
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
