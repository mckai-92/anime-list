import { useEffect, useState } from "react";

export function useDebouncedInputChange(value: string) {
  /**
   * @prop debouncedSearchTerm is populated after delay and is used in filter
   */
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(value);
    }, 500); // 500ms delay

    return () => {
      clearTimeout(handler);
    };
  }, [value]); // Re-run effect when searchTerm changes

  return debouncedSearchTerm;
}
