import React from 'react';
import { cn } from './utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'secondary' | 'outline' | 'ghost' | 'destructive' | 'glow';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'md', isLoading = false, children, disabled, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-98 disabled:opacity-50 disabled:pointer-events-none cursor-pointer';

    const variants = {
      default: 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-md shadow-indigo-500/20 focus:ring-indigo-500',
      secondary: 'bg-slate-800 text-slate-100 hover:bg-slate-700 focus:ring-slate-500',
      outline: 'border border-slate-700 bg-transparent text-slate-200 hover:bg-slate-800 hover:text-white focus:ring-slate-500',
      ghost: 'bg-transparent text-slate-300 hover:bg-slate-800 hover:text-white focus:ring-slate-500',
      destructive: 'bg-rose-600 text-white hover:bg-rose-700 focus:ring-rose-500 shadow-md shadow-rose-500/20',
      glow: 'bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 text-white font-semibold shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:brightness-110 focus:ring-indigo-400'
    };

    const sizes = {
      sm: 'text-xs px-3 py-1.5 gap-1.5',
      md: 'text-sm px-4 py-2.5 gap-2',
      lg: 'text-base px-6 py-3.5 gap-2.5'
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {isLoading && (
          <svg className="animate-spin h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
