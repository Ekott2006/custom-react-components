import { useEffect } from "react";
import useFilter, { TableFilterHook } from "./useTableFilter";
import useTablePagination, {
  TablePaginationConfig,
} from "./useTablePagination";
import useTableSort, { TableSortHook } from "./useTableSort";

export type TableColumn<T> = {
  id: string;
  header: () => React.ReactNode;
  cell: (rowData: T) => React.ReactNode;
  filterType: (rowData: T) => unknown;
};

export type TableColumnId<
  Columns extends readonly TableColumn<Data>[],
  Data
> = Columns[number]["id"];

export type CustomTableProps<
  Columns extends readonly TableColumn<Data>[],
  Data
> = {
  columns: Columns;
  data: Data[];
  pagination?: TablePaginationConfig;
  filter?: TableFilterHook<Columns, Data>;
};

type TableCell = {
  id: string;
  content: React.ReactNode;
};

type TableStructure = {
  headers: TableCell[];
  rows: TableCell[][];
};

export type CustomTableHook<
  Columns extends readonly TableColumn<Data>[],
  Data
> = {
  pagination: ReturnType<typeof useTablePagination>;
  filter: TableFilterHook<Columns, Data>;
  sort: TableSortHook<Columns, Data>;
  data: Data[];
  structure: TableStructure;
};

/**
 * A custom hook for managing table state and functionality
 * @template Columns - Array of table column definitions
 * @template Data - Type of table row data
 * @returns Object containing table state and rendering helpers
 */
const useCustomTable = <Columns extends readonly TableColumn<Data>[], Data>(
  props: CustomTableProps<Columns, Data>
): CustomTableHook<Columns, Data> => {
  const {
    data = [],
    pagination: paginationOptions = { itemsPerPage: 10, currentPage: 0 },
    filter: externalFilter,
  } = props;

  const pagination = useTablePagination(paginationOptions);
  const sort = useTableSort<Columns, Data>();
  const internalFilter = useFilter<Columns, Data>();
  const activeFilter = externalFilter ?? internalFilter;

  // Reset pagination when filter changes
  useEffect(() => {
    pagination.first();
    // Dependency on activeFilter.data instead of the whole filter object
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeFilter.data]);

  const structure: TableStructure = {
    headers: props.columns.map((column) => ({
        id: column.id,
        content: column.header(),
      })),
    rows: data.map((row) =>
        props.columns.map((column) => ({
          id: column.id,
          content: column.cell(row),
        }))
      ),
  };

  return {
    pagination,
    filter: activeFilter,
    sort,
    data,
    structure,
  };
};

export default useCustomTable;
