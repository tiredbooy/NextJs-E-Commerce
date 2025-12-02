import { serverApi } from "../server_api";
import { SettingsData, UpdateSetting } from "../types";
import { authenticatedRequest } from "./authService";


export async function getSetting() {
    try {
        const response = await serverApi.get("/api/settings")
        return response.data
    }
    catch(e: any) {
        throw new Error(e.message || "Failed to get settings")
    }
}

export async function updateSettingField(req: UpdateSetting) {
    try {
        const response = await authenticatedRequest({
            method : "PATCH",
            url : "/api/admin/settings",
            data : req
        })

        return response
    }catch(e: any) {
        throw new Error(e.message || "Failed to update setting")
    }
}