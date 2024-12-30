import { Table, flexRender } from "@tanstack/react-table";
import { FC } from "react";
import { Product } from "../../../utils";

export type TableContentProps = {
    table: Table<Product>;
}

const TableContent: FC<TableContentProps> = ({ table }) => (
    <div className="overflow-x-auto">
        <table className="w-full table-fixed">
            <thead>
                {table.getHeaderGroups().map((headerGroup) => (
                    <tr key={headerGroup.id}>
                        {headerGroup.headers.map((header) => (
                            <th
                                key={header.id}
                                className="border border-black text-center py-2 px-4"
                            >
                                {header.isPlaceholder
                                    ? null
                                    : flexRender(header.column.columnDef.header, header.getContext())}
                            </th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody>
                {table.getRowModel().rows.map((row) => (
                    <tr key={row.id}>
                        {row.getVisibleCells().map((cell) => (
                            <td key={cell.id} className="border border-black text-center p-2">
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);

export default TableContent