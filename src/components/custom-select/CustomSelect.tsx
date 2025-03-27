import React from 'react';
import SelectWithDescription from './SelectWithDescriptions';

const CustomSelect: React.FC = () => {
  const options = [
    {
      value: '1',
      title: 'Option 1',
      description: 'This is the first option with a description.',
    },
    {
      value: '2',
      title: 'Option 2',
      description: 'This is the second option with a description.',
    },
    {
      value: '3',
      title: 'Option 3',
      description: 'This is the third option with a description.',
    },
  ];

  const handleChange = (selectedValue: string) => {
    console.log('Selected Value:', selectedValue);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Custom Select with Descriptions</h1>
      <SelectWithDescription
        options={options}
        placeholder="Choose an option..."
        onChange={handleChange}
      />
    </div>
  );
};

export default CustomSelect;