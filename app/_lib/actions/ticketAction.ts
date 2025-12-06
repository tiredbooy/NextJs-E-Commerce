import { revalidatePath } from "next/cache";
import { addMessageReq } from "../services/ticketsService";
import { CreateTicketMessage } from "../types";

export async function addTicketMessage(id: number, data: CreateTicketMessage) {
  try {
    const result = await addMessageReq(id, data);
    console.log('result:', result);
    revalidatePath(`/admin/tickets/${id}`);
    revalidatePath(`/account/tickets/${id}`);
    return { success: true, message: "Message Sent" };
  } catch (e: any) {
    return { success: false, message: e.message || "Could not send Message" };
  }
}
