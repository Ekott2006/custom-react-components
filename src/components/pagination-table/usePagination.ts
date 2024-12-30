import { useEffect, useState } from "react";

export type PaginationConfig = {
  totalItems?: number;
  totalPages?: number;
  itemsPerPage: number;
  currentPage: number;
  initialPage?: number;
};

export type PaginationState = {
  totalItems: number;
  totalPages: number;
  itemsPerPage: number;
  currentPage: number;
};

export type PaginationActions = {
  setPageIndex: (index: number) => void;
  next: () => void;
  prev: () => void;
  hasNext: () => boolean;
  hasPrev: () => boolean;
  first: () => void;
  last: () => void;
};

export type PaginationHook = PaginationState & PaginationActions;

/**
 * Custom hook for managing Tablepagination state and actions
 * @param config Initial Tablepagination configuration
 * @returns Combined Tablepagination state and actions
 */
function usePagination(config: PaginationConfig): PaginationHook {
  const initialPage = config.initialPage ?? 1;
  const [totalItems, setTotalItems] = useState(config.totalItems ?? -1);
  const [itemsPerPage, setItemsPerPage] = useState(config.itemsPerPage);
  const [totalPages, setTotalPages] = useState(config.totalPages ?? -1);
  const [currentPage, setCurrentPage] = useState(config.currentPage);

  useEffect(() => {
    setTotalItems(config.totalItems || 0);
  }, [config.totalItems]);
  useEffect(() => {
    setItemsPerPage(config.itemsPerPage);
  }, [config.itemsPerPage]);
  useEffect(() => {
    setTotalPages(config.totalPages || 0);
  }, [config.totalPages]);
  useEffect(() => {
    setCurrentPage(config.currentPage);
  }, [config.currentPage]);

  useEffect(() => {
    if (totalPages === -1 && itemsPerPage) {
      setTotalPages(Math.ceil(totalItems / itemsPerPage) - 1);
    }
  }, [totalPages, itemsPerPage, totalItems]);
  useEffect(() => {
    if (totalItems === -1 && totalPages) {
      setTotalItems(totalPages * itemsPerPage);
    }
  }, [totalItems, totalPages, itemsPerPage]);

  const setPageIndex = (index: number) => {
    setCurrentPage(Math.max(1, Math.min(index, totalPages)));
  };

  const next = () => {
    setCurrentPage(Math.min(currentPage + 1, totalPages));
  };

  const prev = () => {
    setCurrentPage(Math.max(currentPage - 1, initialPage));
  };

  const hasNext = () => currentPage < totalPages;
  const hasPrev = () => currentPage > initialPage;

  const first = () => setPageIndex(initialPage);
  const last = () => setPageIndex(totalPages);

  console.log(hasNext(), {
    currentPage,
    itemsPerPage,
    totalItems,
    totalPages,
  });

  return {
    currentPage,
    itemsPerPage,
    totalItems,
    totalPages,
    setPageIndex,
    next,
    prev,
    hasNext,
    hasPrev,
    first,
    last,
  };
}

export default usePagination;
