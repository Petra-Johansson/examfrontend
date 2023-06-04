export const sortArrayBy = <T,>(
  array: T[],
  key: keyof T,
  direction: "asc" | "desc" = "desc"
): T[] => {
  const sortedArray = [...array]; // Create a copy of the original array to avoid mutating it
  sortedArray.sort((a: T, b: T) => {
    if (a[key] < b[key]) {
      return direction === "asc" ? -1 : 1;
    }
    if (a[key] > b[key]) {
      return direction === "asc" ? 1 : -1;
    }
    return 0;
  });
  return sortedArray;
};
