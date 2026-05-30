import React from 'react';

export const Button = ({ children, className = '', variant = 'default', ...props }) => {
  const baseStyle = "inline-flex items-center justify-center rounded-none font-semibold tracking-[0.16em] text-sm uppercase transition duration-300 ease-out select-none disabled:opacity-50 disabled:pointer-events-none";

  const variants = {
    default: "bg-gradient-to-r from-slate-100/95 to-slate-200/90 text-slate-950 shadow-[0_18px_60px_-30px_rgba(15,23,42,0.45)] border border-white/10 hover:from-white hover:to-slate-100",
    outline: "bg-white/5 border border-white/20 text-white hover:bg-white/10 shadow-[0_12px_28px_-18px_rgba(255,255,255,0.15)]",
    ghost: "bg-transparent text-white/85 hover:text-white hover:bg-white/5",
  };

  const currentVariant = variants[variant] || variants.default;

  return (
    <button
      className={`${baseStyle} ${currentVariant} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
