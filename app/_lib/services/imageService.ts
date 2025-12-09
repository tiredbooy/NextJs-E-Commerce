const API_URL = process.env.API_URL || "http://localhost:8080/api";

export async function uploadProfileImageReq(formData: FormData) {
  try {
    const res = await fetch(`${API_URL}/uploads/profile`, {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      throw new Error(
        `Upload Failed With Status ${res.status}: error: ${res.text}`
      );
    }

    return await res.json()
  } catch (e: any) {
    throw new Error(e.message)
  }
}


export async function uploadMultipileImageReq(formData: FormData) {
    try {
        const res = await fetch(`${API_URL}/uploads`, {
        method: "POST",
        body: formData,
      });

       if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Upload failed (${res.status}): ${errorText}`);
      }

      return await res.json()
    }
    catch(e: any) {
        throw new Error(e.message)
    }
}