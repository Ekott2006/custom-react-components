import { createBrowserRouter, RouterProvider } from 'react-router'
import TableSection from './TableSection'
const router = createBrowserRouter([{
    path: "/", element: <TableSection />
}])
const TableRouter = () => {
    return (
        <RouterProvider router={router} />
    )
}

export default TableRouter