import React from 'react';

interface InputFieldProps {
  label: string;
  type?: 'text' | 'number' | 'date';
  value: string | number;
  onChange: (value: string) => void;
  className?: string;
}

export function InputField({ label, type = 'text', value, onChange, className = '' }: InputFieldProps) {
  return (
    <div className={className}>
      <label className="text-sm font-medium text-gray-500">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
      />
    </div>
  );
}