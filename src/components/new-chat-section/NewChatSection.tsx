const NewChatSection = () => {
    return <div className="grid grid-cols-3 gap-4 h-screen m-5">
        <div className={"border p-4"}>
            <div className={"flex items-center justify-between"}>

            <h2 className={"font-semibold text-xl"}>Message</h2>
                <div className={"space-y-1 w-36"}>
                    <label className={"text-sm block"}>Sort by Category</label>
                    <select className={"py-1.5 border rounded w-full"}>
                        <option>Teacher</option>
                    </select>
                </div>
            </div>

            <input type={"search"}/>

        </div>
        <div className="col-span-2 bg-yellow-800"></div>
    </div>
}
export default NewChatSection