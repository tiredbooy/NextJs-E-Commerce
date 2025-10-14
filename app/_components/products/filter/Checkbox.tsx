// components/filter-bar/Checkbox.tsx
interface CheckboxProps {
  id: string;
  label: string;
  count?: number;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({
  id,
  label,
  count,
  checked,
  onChange,
}) => {
  return (
    <label
      htmlFor={id}
      className="flex items-center justify-between cursor-pointer group py-1 hover:bg-muted-hover rounded px-2 -mx-2 transition-colors"
    >
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id={id}
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="w-4 h-4 rounded border-border text-primary focus:ring-2 focus:ring-ring focus:ring-offset-0 cursor-pointer"
        />
        <span className="text-sm text-foreground select-none">{label}</span>
      </div>
      {count !== undefined && (
        <span className="text-xs text-muted-foreground">({count})</span>
      )}
    </label>
  );
};

export default Checkbox;