import React from 'react';
import { cn } from './utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'outline' | 'success' | 'warning' | 'info' | 'purple' | 'cyan';
}

export function Badge({ className, variant = 'default', children, ...props }: BadgeProps) {
  const variants = {
    default: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
    outline: 'border-slate-700 text-slate-300',
    success: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    warning: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    info: 'bg-sky-500/10 text-sky-400 border-sky-500/20',
    purple: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    cyan: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20'
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium border transition-colors',
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
