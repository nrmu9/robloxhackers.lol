// components/common/TextField.tsx
import React from 'react';

interface TextFieldProps {
  id: string;
  type?: string;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

const TextField: React.FC<TextFieldProps> = ({
  id,
  type = 'text',
  value,
  onChange,
  required = false
}) => {
  return (
    <input
      id={id}
      type={type}
      value={value}
      onChange={onChange}
      required={required}
      className="w-full bg-zinc-700 text-white border border-zinc-600 focus:border-indigo-500 rounded py-2 px-4 outline-none transition-colors duration-300 ease-in-out"
    />
  );
};

export default TextField;
