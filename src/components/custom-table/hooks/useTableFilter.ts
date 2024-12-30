import { useState, useCallback } from "react";
import { TableColumn } from "./useCustomTable";

// Represents the mapping of column IDs to their corresponding filter values
type TableColumnFilterMapping<Columns extends readonly TableColumn<Data>[], Data> = {
  [ColumnId in Columns[number]["id"]]: ReturnType<
    Extract<Columns[number], { id: ColumnId }>["filterType"]
  >;
};

export type TableFilterHook<
  Columns extends readonly TableColumn<Data>[],
  Data
> = {
  set: <ColumnId extends keyof TableColumnFilterMapping<Columns, Data>>(
    columnId: ColumnId,
    filterValue: TableColumnFilterMapping<Columns, Data>[ColumnId]
  ) => void;
  remove: <ColumnId extends keyof TableColumnFilterMapping<Columns, Data>>(
    columnId: ColumnId
  ) => void;
  clear: () => void;
  get: <ColumnId extends keyof TableColumnFilterMapping<Columns, Data>>(
    columnId: ColumnId
  ) => TableColumnFilterMapping<Columns, Data>[ColumnId] | undefined;
  data: Map<
    Columns[number]["id"],
    TableColumnFilterMapping<Columns, Data>[Columns[number]["id"]]
  >;
};

/**
 * A custom hook for managing table column filters
 * @template Columns - Array of table column definitions
 * @template Data - Type of data in the table rows
 * @returns Object containing filter management functions and current filter state
 */
const useTableFilter = <
  Columns extends readonly TableColumn<Data>[],
  Data
>(): TableFilterHook<Columns, Data> => {
  const [data, setData] = useState<
    Map<
      keyof TableColumnFilterMapping<Columns, Data>,
      TableColumnFilterMapping<Columns, Data>[keyof TableColumnFilterMapping<
        Columns,
        Data
      >]
    >
  >(new Map());

  const set = <ColumnId extends keyof TableColumnFilterMapping<Columns, Data>>(
    columnId: ColumnId,
    filterValue: TableColumnFilterMapping<Columns, Data>[ColumnId]
  ) => {
    setData(
      (currentFilters) => new Map(currentFilters.set(columnId, filterValue))
    );
  };

  const remove = <ColumnId extends keyof TableColumnFilterMapping<Columns, Data>>(
    columnId: ColumnId
  ) => {
    setData((currentFilters) => {
      const updatedFilters = new Map(currentFilters);
      updatedFilters.delete(columnId);
      return updatedFilters;
    });
  };

  const clear = () => {
    setData(new Map());
  };

  const get = useCallback(
    <ColumnId extends keyof TableColumnFilterMapping<Columns, Data>>(
      columnId: ColumnId
    ): TableColumnFilterMapping<Columns, Data>[ColumnId] | undefined => {
      return data.get(columnId);
    },
    [data]
  );

  return {
    get,
    clear,
    remove,
    set,
    data,
  };
};

export default useTableFilter;
