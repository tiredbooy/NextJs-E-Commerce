import { Review } from "@/app/_lib/types/product_types";
import { Star } from "lucide-react";

interface Props {
  // props here
  review: Review;
}

export default function ReviewCard({ review }: Props) {
  return (
    <div key={review.id} className="border-b pb-6 last:border-b-0">
      <div className="flex items-start justify-between mb-2">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-semibold text-foreground/80">
              {review.author}
            </span>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-4 h-4 ${
                    star <= review.rating
                      ? "fill-rating-star text-rating-star"
                      : "fill-rating-star-empty text-rating-star-empty"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground/60">
              {review.date}
            </span>
          </div>
        </div>
      </div>
      <p className="text-muted-foreground/95 mt-2">{review.comment}</p>
    </div>
  );
}
