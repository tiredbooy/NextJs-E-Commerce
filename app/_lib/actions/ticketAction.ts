"use server";
import { revalidatePath } from "next/cache";
import { addMessageReq } from "../services/ticketsService";
import { CreateTicketMessage } from "../types";

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
