import { FC } from "react";
import { PaginationData } from "./hooks/useTablePagination";

export type CustomTablePaginationProps = {
    pagination: PaginationData
}
const CustomTablePagination: FC<CustomTablePaginationProps> = ({ pagination }) => (
    <div className="flex justify-center gap-4 my-4">
        <button
            className="p-3 text-xl border rounded border-slate-800 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-800 hover:text-white"
            onClick={() => pagination.first()}
            aria-label="First page"
        >
            {'<<'}
        </button>
        <button
            className="p-3 text-xl border rounded border-slate-800 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-800 hover:text-white"
            onClick={() => pagination.prev()}
            disabled={!pagination.hasPrev()}
            aria-label="Previous page"
        >
            {'<'}
        </button>
        <span className="text-2xl place-items-center mt-2">{pagination.currentPage + 1}</span>
        <button
            className="p-3 text-xl border rounded border-slate-800 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-800 hover:text-white"
            onClick={() => pagination.next()}
            disabled={!pagination.hasNext()}
            aria-label="Next page"
        >
            {'>'}
        </button>
        <button
            className="p-3 text-xl border rounded border-slate-800 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-800 hover:text-white"
            onClick={() => pagination.last()}
            disabled={!pagination.hasNext()}
            aria-label="Last page"
        >
            {'>>'}
        </button>
    </div>
);
export default CustomTablePagination