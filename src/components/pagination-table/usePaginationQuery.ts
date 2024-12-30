import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { APIResponse } from "./utils";

const usePaginationQuery = <Data>(
  apiUrl: string,
  page: number,
  pageSize: number
) => {
  return useQuery({
    queryKey: ["data", page, pageSize],
    placeholderData: keepPreviousData,
    queryFn: async () => {
      const response = await fetch(`${apiUrl}?page=${page}&limit=${pageSize}`);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const result = (await response.json()) as APIResponse<Data>;
      return result
    },
  });
};


export default usePaginationQuery