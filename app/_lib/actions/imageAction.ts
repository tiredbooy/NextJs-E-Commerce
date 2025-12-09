import { uploadMultipileImageReq, uploadProfileImageReq } from "../services/imageService";

export async function uploadProfileImage(formData: FormData) {
  try {
    const result = await uploadProfileImageReq(formData);

    return {
      success: true,
      message: "Image Uploaded Successfully!",
      imageUrl: result.url,
    };
  } catch (e: any) {
    return { success: false, message: e.message || "Failed to upload Image" };
  }
}

export async function uploadMultipileImage(formData: FormData) {
  try {
    const results = await uploadMultipileImageReq(formData);

    return {
      success: true,
      message: "Images Uploaded Successfully!",
      results
    };
  } catch (e: any) {
    return { success: false, message: e.message || "Failed to upload Images" };
  }
}
