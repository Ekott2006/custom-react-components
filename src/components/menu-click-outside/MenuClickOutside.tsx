import { useEffect, useRef, useState } from "react"

const data = ["Home", "Contact Us", "About Us", "Settings"]
const useClickOutside = <T extends HTMLElement,>(handler: () => void) => {
    const ref = useRef<T>(null)
    useEffect(() => {
        const customHandler = (e: MouseEvent) => {
            if (!ref.current?.contains(e.target as Node)) {
                handler()
            }
        }
        document.addEventListener("mousedown", customHandler)
        return () => { document.onmousedown = null }
    })
    return ref
}
const MenuClickOutside = () => {
    const [showMenu, setShowMenu] = useState(false)
    const [showMenu2, setShowMenu2] = useState(false)
    const ref = useClickOutside<HTMLDivElement>(() => { setShowMenu(false) })
    const ref2 = useClickOutside<HTMLDivElement>(() => { setShowMenu2(false) })


    return (<>
        <div className="mx-4 w-max h-40 relative" ref={ref}>
            <button onClick={() => setShowMenu(prev => !prev)}>Menu</button>
            {showMenu ? <ul className="rounded absolute w-max grid my-3 bg-slate-600 text-white gap-2 p-2">
                {data.map((x, i) => <li key={i}><button onClick={() => console.log(x)}>{x}</button></li>)}
            </ul> : <></>}
        </div> 
        <div className="mx-4 w-max h-40 relative" ref={ref2}>
            <button onClick={() => setShowMenu2(prev => !prev)} id="10">Menu</button>
            {showMenu2 ? <ul className="rounded absolute w-max grid my-3 bg-slate-600 text-white gap-2 p-2">
                {data.map((x, i) => <li key={i}><button onClick={() => console.log(x)}>{x}</button></li>)}
            </ul> : <></>}
        </div>
    </>)
}

export default MenuClickOutside