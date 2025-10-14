// components/filter-bar/PriceRangeFilter.tsx
import { useState, useCallback } from "react";

interface PriceRange {
  min: number;
  max: number;
}

interface PriceRangeFilterProps {
  value: PriceRange;
  onChange: (range: PriceRange) => void;
}

const PriceRangeFilter: React.FC<PriceRangeFilterProps> = ({
  value,
  onChange,
}) => {
  const [localMin, setLocalMin] = useState(value.min.toString());
  const [localMax, setLocalMax] = useState(value.max.toString());

  const handleApply = useCallback(() => {
    const min = Math.max(0, parseInt(localMin) || 0);
    const max = Math.min(1000, parseInt(localMax) || 1000);
    onChange({ min, max: Math.max(min, max) });
  }, [localMin, localMax, onChange]);

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <input
          type="number"
          value={localMin}
          onChange={(e) => setLocalMin(e.target.value)}
          placeholder="Min"
          className="w-full px-3 py-2 text-sm border border-input rounded bg-background focus:border-border-focus focus:ring-1 focus:ring-ring outline-none"
        />
        <span className="text-muted-foreground">—</span>
        <input
          type="number"
          value={localMax}
          onChange={(e) => setLocalMax(e.target.value)}
          placeholder="Max"
          className="w-full px-3 py-2 text-sm border border-input rounded bg-background focus:border-border-focus focus:ring-1 focus:ring-ring outline-none"
        />
      </div>
      <button
        onClick={handleApply}
        className="w-full px-3 py-2 text-sm bg-button-secondary text-button-secondary-foreground rounded hover:bg-button-secondary-hover transition-colors"
      >
        Apply
      </button>
    </div>
  );
};

export default PriceRangeFilter;