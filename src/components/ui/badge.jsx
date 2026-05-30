import React from 'react';

const badgeVariants = {
  default: 'bg-white/10 border border-white/10 text-white',
  success: 'bg-emerald-400/10 border border-emerald-400/20 text-emerald-200',
  danger: 'bg-rose-400/10 border border-rose-400/20 text-rose-200',
  muted: 'bg-white/5 border border-white/10 text-slate-300',
  accent: 'bg-sky-400/10 border border-sky-400/20 text-sky-200',
};

export const Badge = ({ children, variant = 'default', className = '', ...props }) => (
  <span
    className={`inline-flex items-center rounded-none px-3 py-1.5 text-[0.65rem] font-semibold tracking-[0.18em] uppercase ${badgeVariants[variant] || badgeVariants.default} ${className}`}
    {...props}
  >
    {children}
  </span>
);
