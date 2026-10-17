import React from 'react';
import { cn } from './utils';

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = 'text', disabled, ...props }, ref) => {
    return (
      <input
        type={type}
        ref={ref}
        disabled={disabled}
        className={cn(
          'flex h-11 w-full rounded-xl border border-slate-800 bg-slate-900/80 px-4 py-2 text-sm text-slate-100 placeholder:text-slate-500 shadow-sm transition-all focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';
