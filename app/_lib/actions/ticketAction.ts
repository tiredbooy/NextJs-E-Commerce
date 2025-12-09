"use server";
import { revalidatePath } from "next/cache";
import { addMessageReq, createTicketReq, updateTicketStatusReq } from "../services/ticketsService";
import { CreateTicketMessage, CreateTicketReq, TicketStatus } from "../types";

export async function addTicketMessage(id: number, data: CreateTicketMessage) {
  try {
    await addMessageReq(id, data);
    revalidatePath(`/admin/tickets/${id}`);
    revalidatePath(`/account/tickets/${id}`);
    return { success: true, message: "Message Sent" };
  } catch (e: any) {
    return { success: false, message: e.message || "Could not send Message" };
  }
}

export async function updateTicketStatus(id: number, status: TicketStatus) {
  try {
    await updateTicketStatusReq(id, status);
    revalidatePath(`/admin/tickets/${id}`);
    revalidatePath(`/admin/tickets/`);
    revalidatePath(`/account/tickets/${id}`);
    revalidatePath(`/account/tickets/`);
    return { success: true, message: "Message Sent" };
  } catch (e: any) {
    return { success: false, message: e.message || "Could not send Message" };
  }
}


export async function createticket(data: CreateTicketReq) {
  try {
    const result = await createTicketReq(data);
    revalidatePath(`/admin/tickets/`);
    revalidatePath(`/account/tickets/`);
    return { success: true, message: "Ticket Created!", ticketId: result?.ticket?.id };
  } catch (e: any) {
    return { success: false, message: e.message || "Could not create ticket" };
  }
}