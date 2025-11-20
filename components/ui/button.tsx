import { ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'ghost';
};

export function Button({ variant = 'primary', className, children, ...props }: ButtonProps) {
  const base = 'rounded-lg px-4 py-2 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-400';
  const variants = {
    primary: 'bg-emerald-500 text-slate-950 hover:bg-emerald-400',
    ghost: 'bg-transparent text-emerald-200 ring-1 ring-emerald-500/40 hover:bg-emerald-500/10'
  };

  return (
    <button className={cn(base, variants[variant], className)} {...props}>
      {children}
    </button>
  );
}
