import { Dispatch, FC, FormEvent, SetStateAction } from "react";
import DeleteIcon from "./assets/DeleteRed.svg";
import AddIcon from "./assets/addGrey.svg";

export type FormInputListProps = {
    list: { id: number; value: string; }[], setList: Dispatch<SetStateAction<{ id: number; value: string; }[]>>

}
const FormInputList: FC<FormInputListProps> = ({list, setList}) => {
  const handleButtonChange = (bool: boolean, id?: number) => {
    return () => {
      if (bool) {
        setList(x => x.filter(a => a.id !== id));
      } else {
        setList(x => [...x, {id: list.at(-1)!.id + 1, value: ""}]);
      }
    };
  };
    function handleInputChange(i: number) {
        return (event: FormEvent<HTMLInputElement>) => {
            setList(x => {
              // @ts-expect-error
                x[i] = {id: x[i].id, value: event.target.value}
                return x
            })
        }
    }

  return (
    <label >
      <h3 className="font-medium text-xl">Condition for Winning </h3>
      {list.map((x, i) => <div className="flex gap-4 items-center" key={x.id}>
          <input className="border border-gray-200 p-1.5" onInput={handleInputChange(i)}/>
          <button        
            type="button"
            onClick={handleButtonChange(list.length - 1 > i, x.id)}
            className={`border-2 border-gray-200 p-1 bg-white size-max rounded ${list.length - 1 > i ? "focus:outline-[#F92828]" : "focus:outline-light-blue-500"}`}>
            <img src={list.length - 1 > i ? DeleteIcon : AddIcon} alt={list.length - 1 > i ? "Delete" : "Add"} className={"size-6"}/>
          </button>
        </div>,
      )}
    </label>
  );
};
export default FormInputList;
