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






// const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     const files = Array.from(e.target.files || []);

//     if (files.length === 0) return;

//     setUploading(true);
//     setError(null);
//     setUploadProgress(
//       `Uploading ${files.length} image${files.length > 1 ? "s" : ""}...`
//     );

//     try {
//       const formData = new FormData();
//       files.forEach((file) => {
//         formData.append("images", file);
//       });

//       const startTime = Date.now();

//       const res = await fetch(`${API_URL}/uploads`, {
//         method: "POST",
//         body: formData,
//       });

//       const uploadTime = ((Date.now() - startTime) / 1000).toFixed(1);

//       if (!res.ok) {
//         const errorText = await res.text();
//         throw new Error(`Upload failed (${res.status}): ${errorText}`);
//       }

//       const results = await res.json();

//       const newImages: ProductImage[] = results.urls.map(
//         (result: any, index: number) => ({
//           url: result.url,
//           name: result.original_name || "",
//         })
//       );

//       onChange({ images: [...data.images, ...newImages] });
//       setUploadProgress(
//         `Successfully uploaded ${files.length} image${
//           files.length > 1 ? "s" : ""
//         } in ${uploadTime}s`
//       );

//       // Clear success message after 3 seconds
//       setTimeout(() => setUploadProgress(""), 3000);
//     } catch (err) {
//       console.error("Upload error:", err);
//       setError(err instanceof Error ? err.message : "Failed to upload images");
//     } finally {
//       setUploading(false);
//       e.target.value = "";
//     }
//   };
