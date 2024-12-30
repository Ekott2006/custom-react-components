import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { ColumnFiltersState } from "@tanstack/react-table";
import ky from "ky";
import { ProductResponse } from "../../utils";

const tableApi = async (
  page: number,
  categorySearch?: string,
  titleSearch?: string
) => {
  const limit = 10;
  let baseUrl = "https://dummyjson.com/products";
  if (categorySearch) baseUrl += `/category/${categorySearch}`;
  else if (titleSearch) baseUrl += "/search";
  const url = new URL(baseUrl);
  url.searchParams.append("limit", limit.toString());
  url.searchParams.append("select", "title,price,category");
  url.searchParams.append("skip", (page * limit).toString());
  if (titleSearch) url.searchParams.append("q", titleSearch);

  const res = await ky.get<ProductResponse>(url);
  const data = await res.json();
  return data;
};
const categoriesApi = async () => {
  const res = await ky.get<string[]>(
    "https://dummyjson.com/products/category-list"
  );
  return await res.json();
};
const useTableQuery = (page: number, columnFilter?: ColumnFiltersState) => {
  const categorySearch = columnFilter?.find(
    (x) => x.id.toLowerCase() === "category"
  )?.value as string;
  const titleSearch = columnFilter?.find((x) => x.id.toLowerCase() === "title")
    ?.value as string;
  const tableData = useQuery({
    queryFn: async () => {
      return {
        products: await tableApi(page, categorySearch, titleSearch),
        categories: await categoriesApi(),
      };
    },
    queryKey: ["table", page, categorySearch, titleSearch],
    placeholderData: keepPreviousData,
  });

  return tableData;
};

export default useTableQuery;
