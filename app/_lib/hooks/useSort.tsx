import { SortOption } from "@/app/_components/products/filter/SortBy";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export const useInitialSort = <T extends string>(
  options: SortOption<T>[],
  defaultSort: T,
  urlParamName: string,
  syncWithURL: boolean
): T => {
  const searchParams = useSearchParams();

  if (!syncWithURL) return defaultSort;

  const sortParam = searchParams.get(urlParamName);
  const orderParam = searchParams.get("orderBy");

  // Reconstruct full sort value from URL params
  const urlSortValue = orderParam ? `${sortParam}-${orderParam}` : sortParam;

  // Validate if the URL value exists in options
  const isValid = options.some((opt) => opt.value === urlSortValue);

  return isValid ? (urlSortValue as T) : defaultSort;
};

/**
 * Hook to handle click outside dropdown
 */
export const useClickOutside = (
  ref: React.RefObject<HTMLElement>,
  handler: () => void,
  isActive: boolean
) => {
  useEffect(() => {
    if (!isActive) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handler();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [ref, handler, isActive]);
};