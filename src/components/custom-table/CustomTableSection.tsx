import { FormEvent, useEffect, useState } from "react";
import { generateUUID } from "../../utils";
import { TableControls } from "../table/component/TableControls";
import customColumn from "./customTableHelper";
import CustomTablePagination from "./CustomTablePagination";
import useCustomTable from "./hooks/useCustomTable";
import useCustomTableQuery from "./useCustomTableQuery";

const CustomTable = () => {
    const checkboxId = generateUUID()
    const columns = customColumn(checkboxId)

    const [currentPage, setCurrentPage] = useState(0) // Set from url
    const [myFilter, setMyFilter] = useState<{ category?: string, title?: string }>({});

    const { data, isLoading } = useCustomTableQuery(currentPage, myFilter)
    const { structure, pagination, filter } = useCustomTable({
        data: data?.products.products ?? [],
        columns,
        pagination: {
            currentPage,
            totalItems: data?.products.total,
            itemsPerPage: 10
        }
    })

    useEffect(() => {
        setMyFilter({ category: filter.get("category"), title: filter.get("title") })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filter.data])
    useEffect(() => {
        // console.log(pagination);
        setCurrentPage(pagination.currentPage)
    }, [pagination, pagination.currentPage])

    if (isLoading) return <h1>Loading...</h1>


    function handleCategorySearch(event: FormEvent<HTMLSelectElement>): void {
        filter.set("category", event.currentTarget.value)
    }

    function handleTitleSearch(event: FormEvent<HTMLInputElement>): void {
        filter.set("title", event.currentTarget.value)
    }
    function handleBulkOperations() {
        const elements = Array.from(document.getElementsByClassName(checkboxId)) as HTMLInputElement[]
        elements.filter(x => x.checked).map(x => {
            console.log(x.name);
        })
    }

    return <>
        <TableControls categories={data?.categories ?? []} onCategorySearch={handleCategorySearch} onTitleSearch={handleTitleSearch} onBulkOperations={handleBulkOperations} />
        <div className="overflow-x-auto">
            <table className="w-full table-fixed">
                <thead>
                    <tr>{structure.headers.map(x => <th key={x.id}>{x.content}</th>)}</tr>
                </thead>
                <tbody>
                    {structure.rows.map((rows, i) => <tr key={i}>{rows.map(x => <td key={x.id}>{x.content}</td>)}</tr>)}
                </tbody>
            </table>
        </div>
        <CustomTablePagination pagination={pagination} />
    </>

};

export default CustomTable;
