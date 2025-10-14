// components/filter-bar/ActiveFilterBadge.tsx
import { X } from "lucide-react";

interface ActiveFilterBadgeProps {
  label: string;
  onRemove: () => void;
}

const ActiveFilterBadge: React.FC<ActiveFilterBadgeProps> = ({
  label,
  onRemove,
}) => {
  return (
    <span className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-accent text-accent-foreground rounded-full">
      {label}
      <button
        onClick={onRemove}
        className="hover:bg-accent-hover rounded-full p-0.5 transition-colors"
        aria-label={`Remove ${label} filter`}
      >
        <X className="w-3 h-3" />
      </button>
    </span>
  );
};

export default ActiveFilterBadge;