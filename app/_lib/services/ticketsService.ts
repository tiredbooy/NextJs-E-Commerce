import {
  CreateTicketMessage,
  CreateTicketReq,
  QueryParams,
  Ticket,
  TicketStatus,
} from "../types";
import { buildQuery } from "../utils/utils";
import { authenticatedRequest } from "./authService";

type TicketQueryParam = Pick<
  QueryParams,
  "limit" | "page" | "status" | "from" | "to"
>;

export async function getAllTickets(params: TicketQueryParam = {}) {
  try {
    const query = buildQuery(params)
    const response = await authenticatedRequest({
      method: "GET",
      url: `/api/admin/tickets${query}`,
    });

    return response;
  } catch (e: any) {
    throw new Error(e.message || "Could not fetch Tickets");
  }
}

export async function getUserTickets(params: TicketQueryParam = {}) {
  try {
    const query = buildQuery(params)
    const response = await authenticatedRequest({
      method: "GET",
      url: `/api/tickets${query}`,
    });

    return response;
  } catch (e: any) {
    throw new Error(e.message || "Could not fetch Tickets");
  }
}

export async function getTicketDetail(id: number): Promise<Ticket> {
  const response = await authenticatedRequest({
    method: "GET",
    url: `/api/tickets/${id}`,
  });

  return response;
}

export async function createTicketReq(data: CreateTicketReq) {
  const response = await authenticatedRequest({
    method: "POST",
    url: "/api/tickets/",
    data
  })
  return response
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
    data: { status: status },
  });
  return response;
}
