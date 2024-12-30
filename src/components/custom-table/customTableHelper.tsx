import { Product } from "../../utils"
import { TableColumn } from "./hooks/useCustomTable"

const customColumn = (checkboxId: string) => [
    {
        cell: (data: Product) => <input type="checkbox" name={`${data.id}`} className={checkboxId} />,
        id: 'id-empty',
        header: () => <></>,
        filterType: () => null
    }, {
        cell: (data: Product) => <>{data.id}</>,
        id: 'id',
        header: () => <>ID</>,
        filterType: (data: Product) => data.id
    }, {
        cell: (data: Product) => <>{data.title}</>,
        id: 'title',
        header: () => <>Title</>,
        filterType: (data: Product) => data.title
    }, {
        cell: (data: Product) => <>{data.price}</>,
        id: 'price',
        header: () => <>Price</>,
        filterType: (data: Product) => data.price
    }, {
        cell: (data: Product) => <>{data.category}</>,
        id: 'category',
        header: () => <>Category</>,
        filterType: (data: Product) => data.category
    }, {
        cell: () => <></>,
        id: 'action',
        header: () => <>Actions</>,
        filterType: (data: Product) => ({ id: data.id, price: data.price })
    }
] as const satisfies readonly TableColumn<Product>[]

export default customColumn