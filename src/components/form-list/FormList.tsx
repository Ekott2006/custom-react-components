import { SetStateAction, useState } from 'react';
import FormInputList from './FormInputList.tsx';

const FormList = () => {
    const [list, setList] = useState<{ id: number, value: string }[]>([
        { id: 0, value: '' }
    ])
    console.log(list);


    return (
        <>
            <FormInputList list={list} setList={setList} />
            <h2 className='font-bold text-xl'>Values</h2>
            <ul>
                {list.map((x, i) => <li key={i}>{x.value}</li>)}
            </ul>
        </>
    );
};


export default FormList