"use client";
import { buildQuery } from "@/app/_lib/utils/utils";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

interface Value {
  id: number;
  title: string;
  value: number;
  icon?: React.ElementType;
}

interface Props {
  // props here
  values: Value[];
  checked?: boolean;
}

export default function ToggleGroupComponent({ values }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const duration = searchParams.get("duration") || 12

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  function handleAddParam(value: number) {
    router.push(
      pathname + "?" + createQueryString("duration", value.toString()),
      { scroll: false }
    );
  }

  return (
    <ToggleGroup type="single" variant="outline" value={duration.toString()}>
      {values?.map((item, i) => (
        <ToggleGroupItem
          key={item.id || i + 1}
          onClick={() => handleAddParam(item.value)}
          className="cursor-pointer"
          value={item?.value.toString()}
          aria-label={item.title}
        >
          {item?.icon && <item.icon />}
          {item?.title}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
}
