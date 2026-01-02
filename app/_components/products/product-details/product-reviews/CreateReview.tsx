"use client";

import { createReview } from "@/app/_lib/actions/reviewsAction";
import { Review } from "@/app/_lib/types/product_types";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { AnimatePresence, motion } from "framer-motion";
import { useState, useTransition } from "react";
import { FaStar } from "react-icons/fa";
import { toast } from "sonner";
import { NotLoggedIn } from "./NotLogIn";

interface CreateReviewProps {
  productId: number;
  userId: number;
}

export default function CreateReview({ productId, userId }: CreateReviewProps) {
  const [isCreating, startCreateReview] = useTransition();
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");
  const [errors, setErrors] = useState<{ rating?: string; comment?: string }>(
    {}
  );

  if (!userId || !productId) {
    return <NotLoggedIn />;
  }

  const validateForm = () => {
    const newErrors: { rating?: string; comment?: string } = {};

    if (rating === 0) {
      newErrors.rating = "Please select a rating";
    }

    if (comment.trim().length < 10) {
      newErrors.comment = "Review must be at least 10 characters";
    }

    if (comment.trim().length > 500) {
      newErrors.comment = "Review must be less than 500 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    const formData: Review = {
      rating,
      comment,
      product_id: productId,
      user_id: userId,
      created_at: new Date().toISOString(),
    };

    startCreateReview(async() => {
      const result = await createReview(formData)
      if(!result.success) {
        toast.error(result.message)
      }

      toast.success(result.message)
      console.log('data:', result.data);
      // revalidatePath(`/products/${productId}`)
    })

    // try {
    //   // Reset form
    //   setRating(0);
    //   setComment("");
    //   setErrors({});
    // } catch (error) {
    //   console.error("Failed to submit review:", error);
    // }
  }

    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Write a Review</CardTitle>
          <CardDescription>
            Share your thoughts about this product
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Rating Section */}
            <div className="space-y-2">
              <Label htmlFor="rating" className="text-base">
                Your Rating
              </Label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <motion.button
                    key={star}
                    type="button"
                    onClick={() => {
                      setRating(star);
                      setErrors((prev) => ({ ...prev, rating: undefined }));
                    }}
                    onMouseEnter={() => setHover(star)}
                    onMouseLeave={() => setHover(0)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded"
                  >
                    <FaStar
                      className={`w-8 h-8 transition-colors ${
                        star <= (hover || rating)
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  </motion.button>
                ))}
                <AnimatePresence mode="wait">
                  {rating > 0 && (
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="ml-2 text-sm text-muted-foreground"
                    >
                      {rating === 1 && "Poor"}
                      {rating === 2 && "Fair"}
                      {rating === 3 && "Good"}
                      {rating === 4 && "Very Good"}
                      {rating === 5 && "Excellent"}
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
              {errors.rating && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm text-destructive"
                >
                  {errors.rating}
                </motion.p>
              )}
            </div>

            {/* Comment Section */}
            <div className="space-y-2">
              <Label htmlFor="comment" className="text-base">
                Your Review
              </Label>
              <Textarea
                id="comment"
                placeholder="Tell us about your experience with this product..."
                value={comment}
                onChange={(e) => {
                  setComment(e.target.value);
                  setErrors((prev) => ({ ...prev, comment: undefined }));
                }}
                className="min-h-[120px] resize-none"
                maxLength={500}
              />
              <div className="flex items-center justify-between">
                <AnimatePresence mode="wait">
                  {errors.comment ? (
                    <motion.p
                      key="error"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-sm text-destructive"
                    >
                      {errors.comment}
                    </motion.p>
                  ) : (
                    <div key="spacer" />
                  )}
                </AnimatePresence>
                <span className="text-sm text-muted-foreground">
                  {comment.length}/500
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 justify-end">
              <Button onClick={handleSubmit} disabled={isCreating}>
                {isCreating ? (
                  <span className="flex items-center gap-2">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="w-4 h-4 border-2 border-current border-t-transparent rounded-full"
                    />
                    Submitting...
                  </span>
                ) : (
                  "Submit Review"
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );

}
