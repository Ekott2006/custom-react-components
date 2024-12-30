import { ColumnFiltersState } from '@tanstack/react-table'
import { FormEvent, useEffect, useState } from 'react'
import { generateUUID } from '../../utils'
import TableContent from './component/TableContent'
import { TableControls } from './component/TableControls'
import TablePagination from './component/TablePagination'
import useTable from './hooks/useTable'
import columns from './tableHelper'
import useTableQuery from './useTableQuery'

const TableSection = () => {
  const pageIndex = 0 // Set from url
  const checkboxId = generateUUID()
  const [customFilter, setCustomFilter] = useState<ColumnFiltersState>()

  const { data, isLoading } = useTableQuery(pageIndex, customFilter)
  const { columnFilters, table } = useTable({
    data: data?.products.products,
    rowCount: data?.products.total,
    pagination: { pageSize: data?.products.limit, pageIndex },
    columns: columns(checkboxId)
  })
  useEffect(() => {
    setCustomFilter(columnFilters)
  }, [columnFilters])

  console.log(customFilter);
  

  if (isLoading) return <h1>Loading...</h1>

  function handleCategorySearch(event: FormEvent<HTMLSelectElement>): void {
    table.getColumn("Category")?.setFilterValue(event.currentTarget.value)
  }

  function handleTitleSearch(event: FormEvent<HTMLInputElement>): void {
    table.getColumn("Title")?.setFilterValue(event.currentTarget.value)
  }
  function handleBulkOperations() {
    const elements = Array.from(document.getElementsByClassName(checkboxId)) as HTMLInputElement[]
    elements.filter(x => x.checked).map(x => {
      console.log(x.name);
    })
  }

  return (
    <section className='max-w-6xl mx-auto'>
      <TableControls categories={data?.categories ?? []} onCategorySearch={handleCategorySearch} onTitleSearch={handleTitleSearch} onBulkOperations={handleBulkOperations} />
      <TableContent table={table} />
      <TablePagination table={table} />
    </section>
  )
}

export default TableSection