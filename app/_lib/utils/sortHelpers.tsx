import { useRouter } from "next/navigation";

export const parseSortValue = (sortValue: string) => {
  const parts = sortValue.split("-");
  return {
    sortBy: parts[0],
    orderBy: parts[1] || null,
  };
};

/**
 * Updates URL search params with the selected sort value
 */
export const updateURLParams = (
  sortValue: string,
  defaultValue: string,
  paramName: string,
  router: ReturnType<typeof useRouter>
) => {
  const params = new URLSearchParams(window?.location?.search);
  const { sortBy, orderBy } = parseSortValue(sortValue);

  // Remove params if default value is selected
  if (sortValue === defaultValue) {
    params.delete(paramName);
    params.delete("orderBy");
  } else {
    params.set(paramName, sortBy);
    orderBy ? params.set("orderBy", orderBy) : params.delete("orderBy");
  }

  const newURL = `${location.pathname}${
    params.toString() ? "?" + params.toString() : ""
  }`;
  router.push(newURL, { scroll: false });
};
