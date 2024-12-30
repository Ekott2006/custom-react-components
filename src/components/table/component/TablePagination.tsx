import { Table } from "@tanstack/react-table";
import { FC } from "react";
import { Product } from "../../../utils";

export type TablePaginationProps = {
    table: Table<Product>;
}
const TablePagination: FC<TablePaginationProps> = ({ table }) => (
    <div className="flex justify-center gap-4 my-4">
        <button
            className="p-3 text-xl border rounded border-slate-800 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-800 hover:text-white"
            onClick={() => table.firstPage()}
            disabled={!table.getCanPreviousPage()}
            aria-label="First page"
        >
            {'<<'}
        </button>
        <button
            className="p-3 text-xl border rounded border-slate-800 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-800 hover:text-white"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            aria-label="Previous page"
        >
            {'<'}
        </button>
        <button
            className="p-3 text-xl border rounded border-slate-800 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-800 hover:text-white"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            aria-label="Next page"
        >
            {'>'}
        </button>
        <button
            className="p-3 text-xl border rounded border-slate-800 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-800 hover:text-white"
            onClick={() => table.lastPage()}
            disabled={!table.getCanNextPage()}
            aria-label="Last page"
        >
            {'>>'}
        </button>
    </div>
);
export default TablePagination