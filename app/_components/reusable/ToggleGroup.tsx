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
  paramName: string;
  options: ToggleOption<T>[];
  defaultValue?: T;
  onChange?: (value: T) => void;
  variant?: "default" | "outline";
  className?: string;
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
    router.push(
      pathname + "?" + createQueryString(paramName, value.toString()),
      { scroll }
    );

    onChange?.(value);
  }

  return (
    <div className="w-full sm:w-auto overflow-x-auto">
      <ToggleGroup
        type="single"
        variant={variant}
        value={currentValue?.toString()}
        className={`flex-nowrap sm:flex-wrap justify-start sm:justify-center ${className}`}
      >
        {options?.map((item) => (
          <ToggleGroupItem
            key={item.id}
            onClick={() => handleValueChange(item.value)}
            className="cursor-pointer text-xs sm:text-sm whitespace-nowrap flex-shrink-0"
            value={item.value.toString()}
            aria-label={item.title}
            disabled={item.disabled}
          >
            {item.icon && (
              <item.icon className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-1.5" />
            )}
            {item.title}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </div>
  );
}
