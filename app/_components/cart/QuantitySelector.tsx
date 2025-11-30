import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FaMinus, FaPlus } from "react-icons/fa";

// Quantity Selector Component
interface QuantitySelectorProps {
  quantity: number;
  onChange: (quantity: number) => void;
  min: number;
  max: number;
  disabled?: boolean;
}

export default function QuantitySelector({
  quantity,
  onChange,
  max,
  min,
  disabled,
}: QuantitySelectorProps) {
  return (
    <div className="flex items-center border border-border rounded-md overflow-hidden">
      <button
        disabled={quantity <= min || disabled}
        onClick={() => onChange(quantity - 1)}
        className="px-3 cursor-pointer py-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed bg-transparent disabled:text-muted-foreground/70"
        aria-label="Decrease quantity"
      >
        <FaMinus size={14} />
      </button>

      <input
        type="number"
        value={quantity}
        onChange={(e) => {
          const val = parseInt(e.target.value) || 1;
          onChange(val);
        }}
        disabled={disabled}
        className="w-16 text-center py-2 outline-none text-foreground focus:outline-none focus:bg-input-focus disabled:opacity-50"
        min={min}
        max={max}
      />

      <button
        disabled={disabled  || quantity > max}
        onClick={() => onChange(quantity + 1)}
        className={`px-3 cursor-pointer py-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed bg-transparent disabled:text-muted-foreground/70`}
        aria-label="Increase quantity"
      >
        <FaPlus size={14}  />
      </button>
    </div>
  );
}
