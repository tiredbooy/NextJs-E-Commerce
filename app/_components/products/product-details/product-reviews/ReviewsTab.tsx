import { getCurrentUser } from "@/app/_lib/services/authService";
import { getProductReviews } from "@/app/_lib/services/reviewsService";
import { Card, CardContent } from "@/components/ui/card";
import CreateReview from "./CreateReview";
import RatingSummary from "./RatingSummary";
import ReviewCards from "./ReviewCards";

const ReviewsTab: React.FC<{ productId: number }> = async ({ productId }) => {
  const user = await getCurrentUser();
  const reviews = (await getProductReviews(productId)) || [];
  console.log('reviews:', reviews);

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
          {reviews.length >= 1 ? (
            <ReviewCards reviews={reviews} />
          ) : (
            <CreateReview userId={user.id} productId={productId} />
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
