import { Review } from "@/app/_lib/types/product_types";
import ReviewCard from "./ReviewCard";

interface Props {
  // props here
  reviews: Review[];
}

export default function ReviewCards({ reviews }: Props) {
  return (
    <div className="space-y-6">
      {reviews.map((review) => (
        <ReviewCard review={review} />
      ))}
    </div>
  );
}
