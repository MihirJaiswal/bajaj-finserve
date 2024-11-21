import Select, { MultiValue } from 'react-select';

interface Option {
  value: string;
  label: string;
}

interface DropdownProps {
  onChange: (selected: string[]) => void;
}

const options: Option[] = [
  { value: 'alphabets', label: 'Alphabets' },
  { value: 'numbers', label: 'Numbers' },
  { value: 'highestLowercaseAlphabet', label: 'Highest Lowercase Alphabet' },
];

export default function Dropdown({ onChange }: DropdownProps) {
  const handleChange = (selected: MultiValue<Option>) => {
    onChange(selected.map((option) => option.value));
  };

  return (
    <div className="mt-4 text-black">
      <Select
        isMulti
        options={options}
        placeholder="Select response data to display"
        onChange={handleChange}
      />
    </div>
  );
}
