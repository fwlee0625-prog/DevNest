import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = '', ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={`relative block w-full rounded-md border-0 px-4 py-2.5 text-gray-900 ring-1 ring-gray-200 transition-shadow duration-200 ring-inset placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-gray-300 focus:outline-none focus:ring-inset sm:text-sm sm:leading-6 dark:bg-black dark:text-white dark:ring-gray-800 dark:focus:ring-gray-600 ${className}`}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';
