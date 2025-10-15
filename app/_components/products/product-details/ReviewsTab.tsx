import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

const ReviewsTab: React.FC<{ productId: number }> = ({ productId }) => {
  // This would typically fetch reviews from your API
  const sampleReviews = [
    {
      id: 1,
      author: "John D.",
      rating: 5,
      date: "2 weeks ago",
      comment:
        "Excellent quality! The fit is perfect and the material feels premium. Highly recommended.",
      verified: true,
    },
    {
      id: 2,
      author: "Sarah M.",
      rating: 4,
      date: "1 month ago",
      comment:
        "Great product overall. Shipping was fast and the item matches the description perfectly.",
      verified: true,
    },
    {
      id: 3,
      author: "Michael R.",
      rating: 5,
      date: "1 month ago",
      comment:
        "Love it! This is my third purchase and the quality is consistently excellent.",
      verified: true,
    },
  ];

  const averageRating = 4.7;
  const totalReviews = 247;

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-6">
          {/* Rating Summary */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-6 pb-6 border-b">
            <div className="text-center sm:text-left">
              <div className="flex items-center gap-2 justify-center sm:justify-start">
                <span className="text-4xl font-bold text-gray-900">
                  {averageRating}
                </span>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-5 h-5 ${
                        star <= Math.round(averageRating)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </div>
              <p className="text-gray-600 text-sm mt-1">
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
                    <span className="text-sm text-gray-600 w-8">
                      {rating} ★
                    </span>
                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-yellow-400 rounded-full"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className="text-sm text-gray-600 w-12 text-right">
                      {percentage}%
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Reviews List */}
          <div className="space-y-6">
            {sampleReviews.map((review) => (
              <div key={review.id} className="border-b pb-6 last:border-b-0">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-gray-900">
                        {review.author}
                      </span>
                      {review.verified && (
                        <Badge variant="outline" className="text-xs">
                          Verified Purchase
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`w-4 h-4 ${
                              star <= review.rating
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-500">
                        {review.date}
                      </span>
                    </div>
                  </div>
                </div>
                <p className="text-gray-700 mt-2">{review.comment}</p>
              </div>
            ))}
          </div>

          {/* Load More Button */}
          <div className="text-center pt-4">
            <button className="text-gray-900 font-semibold hover:underline">
              Load more reviews
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReviewsTab