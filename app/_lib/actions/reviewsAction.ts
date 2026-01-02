"use server"
import { createReviewReq } from "../services/reviewsService";
import { Review } from "../types/product_types";


export async function createReview(data: Review) {
    const result = await createReviewReq(data)

    if (!result) {
        return {success: false, message: "Failed to create Review"}
    }

    return {success: true, message:"Review Created Successfully", data}
}