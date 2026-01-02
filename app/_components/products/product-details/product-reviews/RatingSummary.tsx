import { Star } from "lucide-react";

interface Props {
  avgRating: number
  totalReviews: number
}

export default function RatingSummary({avgRating = 3.43, totalReviews = 10}: Props) {

  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-6 pb-6 border-b">
      <div className="text-center sm:text-left">
        <div className="flex items-center gap-2 justify-center sm:justify-start">
          <span className="text-4xl font-bold text-muted-foreground">
            {avgRating}
          </span>
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`w-5 h-5 ${
                  star <= Math.round(avgRating)
                    ? "fill-rating-star text-rating-star"
                    : "text-text-muted"
                }`}
              />
            ))}
          </div>
        </div>
        <p className="text-muted-foreground/80 text-sm mt-1">
          Based on {totalReviews} reviews
        </p>
      </div>

      <div className="flex-1">
        {[5, 4, 3, 2, 1].map((rating) => {
          const percentage =
            rating === 5
              ? 70
              : rating === 4
              ? 20
              : rating === 3
              ? 7
              : rating === 2
              ? 2
              : 1;
          return (
            <div key={rating} className="flex items-center gap-2 mb-2">
              <span className="text-sm text-muted-foreground/90 w-8">
                {rating} ★
              </span>
              <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-rating-star rounded-full"
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <span className="text-sm text-muted-foreground/90 w-12 text-right">
                {percentage}%
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
