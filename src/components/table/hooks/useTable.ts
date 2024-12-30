import {
  AccessorFnColumnDef,
  ColumnFiltersState,
  getCoreRowModel,
  PaginationState,
  useReactTable
} from "@tanstack/react-table";
import { useEffect, useMemo, useState } from "react";
import { useDebounce } from "../../../utils";
type useTableRequest<T> = {
  pagination?: Partial<PaginationState>;
  onPaginationChange?: (x: PaginationState) => void;
  rowCount?: number;
  data?: T[];
  columns: (AccessorFnColumnDef<T, number> | AccessorFnColumnDef<T, string>)[];
  debounceTime?: number;
};
const useTable = <T>(props: useTableRequest<T>) => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: -1,
    ...props.pagination,
  });
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const debouncedColumnFilters: ColumnFiltersState = useDebounce(
    columnFilters,
    props.debounceTime ?? 1000
  );
  const defaultData = useMemo(() => [], []);
  const rowCount = props.rowCount ?? 0;

  // Effects
  useEffect(() => {
    setPagination((prev) => ({
      ...prev,
      pageIndex: 0,
    }));
  }, [columnFilters]);
  useEffect(() => {
    setPagination((prev) => ({
      ...prev,
      pageSize: pagination.pageSize ?? -1,
    }));
  }, [pagination.pageSize]);
  useEffect(() => {
    if (props.onPaginationChange) props.onPaginationChange(pagination);
  }, [pagination, props]);

  // Table instance
  const table = useReactTable({
    columns: props.columns,
    data: props.data ?? defaultData,
    getCoreRowModel: getCoreRowModel(),
    onPaginationChange: setPagination,
    state: {
      pagination,
      columnFilters,
    },
    rowCount,
    manualPagination: true,
    onColumnFiltersChange: setColumnFilters,
    manualFiltering: true,
  });

  return { table, columnFilters: debouncedColumnFilters };
};

export default useTable;
