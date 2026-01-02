import { Review, ReviewResponse } from "../types/product_types"
import { authenticatedRequest } from "./authService"

const API_URL = process.env.NEXT_PUBLIC_API_BASE

export async function getProductReviews(productId: number): Promise<ReviewResponse> {
    console.log(`${API_URL}/api/reviews/${productId}`)
    const response = await fetch(`${API_URL}/api/reviews/${productId}`)
    if (!response.ok) {
        throw new Error("Something wen't wrong, Try again later.")
    }
    const data = await response.json()

    return data
}

export async function createReviewReq(data: Review) {
    const response = await authenticatedRequest({
        url: "/api/reviews",
        method: "POST",
        data
    })

    return response
}