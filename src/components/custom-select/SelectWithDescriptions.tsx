import React, { useState, useRef, useEffect } from 'react';

interface Option {
    value: string;
    title: string;
    description: string;
}

interface SelectWithDescriptionProps {
    options: Option[];
    placeholder?: string;
    onChange?: (selectedValue: string) => void;
}

const SelectWithDescription: React.FC<SelectWithDescriptionProps> = ({
    options,
    placeholder = 'Select an option...',
    onChange,
}) => {
    return <label>
        <select>
            {options.map(x => <option value={x.value}>
                <span className="font-bold block ">{x.title}</span>
                <br />
                <span className="text-sm text-gray-600 block">{x.description}</span></option>)}
        </select>
    </label>
};

export default SelectWithDescription;