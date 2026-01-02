import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import ReviewCards from "./ReviewCards";
import RatingSummary from "./RatingSummary";
import CreateReview from "./CreateReview";

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
          <RatingSummary
            avgRating={averageRating}
            totalReviews={totalReviews}
          />

          {/* Reviews List */}
          {sampleReviews.length < 1 ? (
            <ReviewCards reviews={sampleReviews} />
          ) : (
            <CreateReview />
          )}

          {/* Load More Button */}
          <div className="text-center pt-4">
            <button className="text-muted-foreground font-semibold hover:underline">
              Load more reviews
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReviewsTab;
