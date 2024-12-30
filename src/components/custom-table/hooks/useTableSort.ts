import { useState } from "react";
import { TableColumn } from "./useCustomTable";

export type SortDirection = "asc" | "desc";

export type TableSortHook<Columns extends readonly TableColumn<Data>[], Data> = {
  set: (columnId: Columns[number]["id"], direction: SortDirection) => void;
  remove: (columnId: Columns[number]["id"]) => void;
  clear: () => void;
  toggle: (columnId: Columns[number]["id"], defaultDirection?: SortDirection) => void;
  data: Map<Columns[number]["id"], SortDirection>;
};

/**
 * Custom hook for managing table column sorting
 * @template Columns - Array of table column definitions
 * @template Data - Type of data in the table rows
 * @returns Object containing sort management functions and current sort state
 */
const useTableSort = <
  Columns extends readonly TableColumn<Data>[],
  Data
>(): TableSortHook<Columns, Data> => {
  const [data, setData] = useState<Map<Columns[number]["id"], SortDirection>>(
    new Map()
  );

  const set = (columnId: Columns[number]["id"], direction: SortDirection) => {
    setData((currentSorts) => 
      new Map(currentSorts.set(columnId, direction))
    );
  };

  const remove = (columnId: Columns[number]["id"]) => {
    setData((currentSorts) => {
      const updatedSorts = new Map(currentSorts);
      updatedSorts.delete(columnId);
      return updatedSorts;
    });
  };

  const clear = () => {
    setData(new Map());
  };

  const toggle = (
    columnId: Columns[number]["id"], 
    defaultDirection: SortDirection = "asc"
  ) => {
    setData((currentSorts) => {
      const updatedSorts = new Map(currentSorts);
      
      if (updatedSorts.has(columnId)) {
        const newDirection = updatedSorts.get(columnId) === "asc" ? "desc" : "asc";
        updatedSorts.set(columnId, newDirection);
      } else {
        updatedSorts.set(columnId, defaultDirection);
      }
      
      return updatedSorts;
    });
  };

  return {
    set,
    remove,
    clear,
    toggle,
    data
  };
};

export default useTableSort;