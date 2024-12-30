import { createColumnHelper } from "@tanstack/react-table"
import { Product } from "../../utils"

const columnHelper = createColumnHelper<Product>()
const columns = (checkboxId: string) =>  [
  columnHelper.accessor(x => x.id, {
    cell: (props) => <input type="checkbox" name={props.getValue().toString()} className={checkboxId} />
    , id: "normal", header: ""
  }),
  columnHelper.accessor(x => x.id, { header: "ID" }),
  columnHelper.accessor(x => x.title, { header: "Title" }),
  columnHelper.accessor(x => x.price, { header: "Price" }),
  columnHelper.accessor(x => x.category, { header: "Category" }),
  columnHelper.display({cell() {
      
  },id: "action", header: "Actions"})
]

export default columns