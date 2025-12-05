// components/AddressSection.tsx
import { FiMapPin } from "react-icons/fi";
import { InfoCard, InfoRow } from "./InfoCard";
import { Address } from "@/app/_lib/types/user_types";

interface AddressSectionProps {
  address: Address;
  className?: string;
}

/**
 * Presenter Component: Displays shipping address details
 * Single Responsibility: Shows formatted address information
 */
export function AddressSection({
  address,
  className = "",
}: AddressSectionProps) {
  return (
    <InfoCard
      title="Shipping Address"
      icon={<FiMapPin />}
      className={className}
      headerAction={
        address.is_default && (
          <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full font-medium">
            Default
          </span>
        )
      }
    >
      <div className="space-y-1">
        {address.name && (
          <p className="font-semibold text-base mb-3">{address.name}</p>
        )}

        <InfoRow label="Address" value={address.address} />
        <InfoRow label="City" value={address.city} />
        <InfoRow label="State" value={address.state} />
        <InfoRow label="Postal Code" value={address.postal_code} />
        <InfoRow label="Country" value={address.country} />
      </div>
    </InfoCard>
  );
}
