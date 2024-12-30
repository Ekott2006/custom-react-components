import { useState, useEffect } from "react";

export type TablePaginationConfig = {
  totalItems?: number;
  totalPages?: number;
  itemsPerPage: number;
  currentPage: number;
};

export type TablePaginationState = {
  totalItems: number;
  totalPages: number;
  itemsPerPage: number;
  currentPage: number;
};

export type TablePaginationActions = {
  setPageIndex: (index: number) => void;
  next: () => void;
  prev: () => void;
  hasNext: () => boolean;
  hasPrev: () => boolean;
  first: () => void;
  last: () => void;
};

export type TablePaginationHook = TablePaginationState & TablePaginationActions;

/**
 * Custom hook for managing Tablepagination state and actions
 * @param config Initial Tablepagination configuration
 * @returns Combined Tablepagination state and actions
 */
function useTableTablePagination(config: TablePaginationConfig): TablePaginationHook {
  const [data, setData] = useState<TablePaginationState>({
    totalItems: config.totalItems ?? -1,
    totalPages: config.totalPages ?? -1,
    itemsPerPage: config.itemsPerPage,
    currentPage: config.currentPage,
  });

  // Update state when config changes
  useEffect(() => {
    setData((prev) => ({
      ...prev,
      ...(config.totalItems !== undefined && { totalItems: config.totalItems }),
      ...(config.totalPages !== undefined && { totalPages: config.totalPages }),
      itemsPerPage: config.itemsPerPage,
      currentPage: config.currentPage,
    }));
  }, [
    config.totalItems,
    config.totalPages,
    config.itemsPerPage,
    config.currentPage,
  ]);

  // Synchronize totalItems and totalPages
  useEffect(() => {
    setData((prev) => {
      const { totalItems, totalPages, itemsPerPage } = prev;

      if (totalItems >= 0) {
        return {
          ...prev,
          totalPages: Math.ceil(totalItems / itemsPerPage) - 1,
        };
      }

      if (totalPages >= 0) {
        return {
          ...prev,
          totalItems: totalPages * itemsPerPage,
        };
      }

      return prev;
    });
  }, [data.totalItems, data.totalPages, data.itemsPerPage]);

  const TablepaginationActions: TablePaginationActions = {
    setPageIndex: (index: number) => {
      if (index >= 1 && index <= data.totalPages) {
        setData((prev) => ({ ...prev, currentPage: index }));
      }
    },

    next: () => {
      if (TablepaginationActions.hasNext()) {
        setData((prev) => ({ ...prev, currentPage: prev.currentPage + 1 }));
      }
    },

    prev: () => {
      if (TablepaginationActions.hasPrev()) {
        setData((prev) => ({ ...prev, currentPage: prev.currentPage - 1 }));
      }
    },

    hasNext: () => data.currentPage < data.totalPages,

    hasPrev: () => data.currentPage > 0,

    first: () => {
      setData((prev) => ({ ...prev, currentPage: 0 }));
    },

    last: () => {
      if (TablepaginationActions.hasNext()) {
        setData((prev) => ({ ...prev, currentPage: prev.totalPages }));
      }
    },
  };

  return {
    ...data,
    ...TablepaginationActions,
  };
}

export default useTableTablePagination;
