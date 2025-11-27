'use client';

import { TextareaHTMLAttributes, forwardRef } from 'react';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className = '', error, ...props }, ref) => {
    return (
      <div className="w-full">
        <textarea
          ref={ref}
          className={`
            w-full rounded-lg border px-4 py-2 text-sm transition-colors
            placeholder:text-gray-400
            focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2
            disabled:cursor-not-allowed disabled:opacity-50
            ${
              error
                ? 'border-red-300 dark:border-red-700'
                : 'border-gray-200 dark:border-gray-800'
            }
            bg-white dark:bg-gray-900
            text-gray-900 dark:text-white
            ${className}
          `}
          {...props}
        />
        {error && (
          <p className="mt-1 text-xs text-red-600 dark:text-red-400">{error}</p>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

