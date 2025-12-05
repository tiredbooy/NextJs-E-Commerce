"use client";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export interface ToggleOption<T = string | number> {
  id: string | number;
  title: string;
  value: T;
  icon?: React.ElementType;
  disabled?: boolean;
}

interface ToggleGroupFilterProps<T = string | number> {
  /**
   * The URL parameter name to sync with (e.g., "duration", "status", "category")
   */
  paramName: string;

  /**
   * Array of options to display
   */
  options: ToggleOption<T>[];

  /**
   * Default value if no param is set
   */
  defaultValue?: T;

  /**
   * Optional callback when value changes
   */
  onChange?: (value: T) => void;

  /**
   * Toggle group variant
   */
  variant?: "default" | "outline";

  /**
   * Custom className for the toggle group
   */
  className?: string;

  /**
   * Whether to scroll on navigation
   */
  scroll?: boolean;
}

export default function ToggleGroupFilter<
  T extends string | number = string | number
>({
  paramName,
  options,
  defaultValue,
  onChange,
  variant = "outline",
  className,
  scroll = false,
}: ToggleGroupFilterProps<T>) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Get current value from URL or use default
  const currentValue = (searchParams.get(paramName) as T) || defaultValue;

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );

  function handleValueChange(value: T) {
    // Update URL
    router.push(
      pathname + "?" + createQueryString(paramName, value.toString()),
      { scroll }
    );

    onChange?.(value);
  }

  return (
    <ToggleGroup
      type="single"
      variant={variant}
      value={currentValue?.toString()}
      className={className}
    >
      {options?.map((item) => (
        <ToggleGroupItem
          key={item.id}
          onClick={() => handleValueChange(item.value)}
          className="cursor-pointer"
          value={item.value.toString()}
          aria-label={item.title}
          disabled={item.disabled}
        >
          {item.icon && <item.icon className="w-4 h-4 mr-1.5" />}
          {item.title}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
}
