import React from 'react';

interface TextAreaFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function TextAreaField({ label, value, onChange, className = '' }: TextAreaFieldProps) {
  return (
    <div className={className}>
      <label className="text-sm font-medium text-gray-500">{label}</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={4}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
      />
    </div>
  );
}