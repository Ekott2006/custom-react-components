import React, { FormEvent } from 'react';

export type TableControlsProps = {
    categories: string[];
    onCategorySearch: (event: FormEvent<HTMLSelectElement>) => void;
    onTitleSearch: (event: FormEvent<HTMLInputElement>) => void;
    onBulkOperations: () => void;
}

export const TableControls: React.FC<TableControlsProps> = ({
    categories, onCategorySearch, onTitleSearch, onBulkOperations,
}) => (
    <div className="flex items-center justify-evenly mb-5 gap-4 flex-wrap">
        <button
            onClick={onBulkOperations}
            className="p-3 text-xl border rounded border-slate-800 disabled:bg-inherit hover:bg-slate-800 hover:text-white cursor-pointer"
        >
            Bulk Operations
        </button>
        <label className="flex gap-5 items-center">
            <span className="font-bold text-xl whitespace-nowrap">Title Search</span>
            <input
                type="search"
                onInput={onTitleSearch}
                className="border border-slate-800 rounded px-3 py-1 w-full"
                placeholder="Search by title..." />
        </label>

        <label className="flex gap-5 items-center">
            <span className="font-bold text-xl">Products Category</span>
            <select
                className="border border-slate-800 rounded px-3 py-1"
                onInput={onCategorySearch}
            >
                <option value="">All Categories</option>
                {categories.map((category) => (
                    <option key={category} value={category}>
                        {category}
                    </option>
                ))}
            </select>
        </label>
    </div>
);
