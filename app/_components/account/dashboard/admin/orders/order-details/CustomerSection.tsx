// components/CustomerSection.tsx
import { FiUser } from "react-icons/fi";
import { InfoCard, InfoRow } from "./InfoCard";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "@/app/_lib/types/user_types";
import { orderHelpers } from "@/app/_lib/utils/orderHelpers";

interface CustomerSectionProps {
  user: User;
  className?: string;
}

/**
 * Presenter Component: Displays customer information (Admin only)
 * Single Responsibility: Shows user details for order context
 */
export function CustomerSection({
  user,
  className = "",
}: CustomerSectionProps) {
  const fullName = orderHelpers.formatFullName(
    user.first_name,
    user.last_name || ""
  );
  const initials = `${user.first_name[0]}${user?.last_name?.[0]}`.toUpperCase();

  return (
    <InfoCard
      title="Customer Information"
      icon={<FiUser />}
      className={className}
    >
      <div className="space-y-4">
        <div className="flex items-center gap-3 pb-3 border-b">
          <Avatar className="h-12 w-12">
            {user.image !== "" && (
              <AvatarImage src={user?.image} alt={fullName} />
            )}
            <AvatarFallback className="bg-primary/10 text-primary font-semibold">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold text-base">{fullName}</p>
            <p className="text-xs text-muted-foreground">{user.email}</p>
          </div>
        </div>

        <div>
          <InfoRow label="Phone" value={user.phone || "Not provided"} />
          <InfoRow label="Customer ID" value={`#${user.id}`} />
          <InfoRow
            label="Role"
            value={
              <span
                className={`capitalize px-2 py-0.5 rounded text-xs font-medium ${
                  user.role === "admin"
                    ? "bg-purple-100 text-purple-800"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {user.role}
              </span>
            }
          />
        </div>
      </div>
    </InfoCard>
  );
}
