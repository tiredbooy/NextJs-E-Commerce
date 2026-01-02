import { Review } from "@/app/_lib/types/product_types";
import { getInitials } from "@/app/_lib/utils/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";

interface Props {
  // props here
  review: Review;
}

export default function ReviewCard({ review }: Props) {
    const {id, profile, first_name, last_name, rating, comment, created_at} = review
    const fullName = `${first_name} ${last_name}`
  return (
    <div key={id} className="border-b pb-6 last:border-b-0">
      <div className="flex items-start justify-between mb-2">
        <div>
          <div className="flex items-center flex-row gap-2">
            {profile !== "" ? (
              <Avatar className="w-8 h-8">
                <AvatarImage src={profile} alt={fullName} className="object-cover" />
              </Avatar>
            ) : (
              <Avatar>
                <AvatarFallback className="text-xs font-medium">
                  {getInitials(fullName)}
                </AvatarFallback>
              </Avatar>
            )}
            <span className="font-semibold text-foreground/80">
              {fullName}
            </span>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-4 h-4 ${
                    star <= rating
                      ? "fill-rating-star text-rating-star"
                      : "fill-rating-star-empty text-rating-star-empty"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground/60">
              {new Date(created_at).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>
      <p className="text-muted-foreground/95 mt-2">{comment}</p>
    </div>
  );
}
