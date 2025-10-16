// Quantity Selector Component
interface QuantitySelectorProps {
  quantity: number;
  onChange: (quantity: number) => void;
  disabled?: boolean;
}

export default function QuantitySelector({
  quantity,
  onChange,
  disabled,
}: QuantitySelectorProps) {
  return (
    <div className="flex items-center border border-[var(--border)] rounded-md overflow-hidden">
      <button
        onClick={() => onChange(quantity - 1)}
        disabled={disabled || quantity <= 1}
        className="px-3 py-2 hover:bg-[var(--muted)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Decrease quantity"
      >
        <svg
          className="w-4 h-4 text-[var(--foreground)]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20 12H4"
          />
        </svg>
      </button>

      <input
        type="number"
        value={quantity}
        onChange={(e) => {
          const val = parseInt(e.target.value) || 1;
          onChange(val);
        }}
        disabled={disabled}
        className="w-16 text-center py-2 bg-transparent text-[var(--foreground)] focus:outline-none focus:bg-[var(--input-focus)] disabled:opacity-50"
        min="1"
        max="99"
      />

      <button
        onClick={() => onChange(quantity + 1)}
        disabled={disabled || quantity >= 99}
        className="px-3 py-2 hover:bg-[var(--muted)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Increase quantity"
      >
        <svg
          className="w-4 h-4 text-[var(--foreground)]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4v16m8-8H4"
          />
        </svg>
      </button>
    </div>
  );
}
