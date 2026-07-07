import React from 'react';

const badgeVariants = {
  default: 'bg-white/10 border border-white/10 text-white',
  success: 'bg-emerald-400/10 border border-emerald-400/20 text-emerald-200',
  danger: 'bg-rose-400/10 border border-rose-400/20 text-rose-200',
  muted: 'bg-white/5 border border-white/10 text-slate-300',
  accent: 'bg-sky-400/10 border border-sky-400/20 text-sky-200',
};

// We use "export const" so named imports still work
export const Badge = ({ children, variant = 'default', className = '', ...props }) => {
  // Added a safety check: if the variant doesn't exist, it falls back to 'default'
  const variantClass = badgeVariants[variant] || badgeVariants.default;
  
  return (
    <span
      className={`inline-flex items-center rounded-none px-3 py-1.5 text-[0.65rem] font-semibold tracking-[0.18em] uppercase ${variantClass} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
};

// We also use "export default" so default imports work too
export default Badge;
