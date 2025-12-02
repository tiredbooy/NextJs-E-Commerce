"use server";
import { revalidatePath } from "next/cache";
import { updateSettingField } from "../services/settingService";
import { UpdateSetting } from "../types";

export async function updateSetting(req: UpdateSetting) {
    console.log('req:', req);
  try {
    const result = await updateSettingField(req);
    revalidatePath("/admin/settings");
    return {success: true, message: result.message}
  } catch (e: any) {
    return {success: false, message: e.message || "Failed to update setting"}
  }
}
