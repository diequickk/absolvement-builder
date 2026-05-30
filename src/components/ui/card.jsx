import React from 'react';

export const Card = ({ children, className = '', ...props }) => (
  <div
    className={`bg-[#060812]/70 border border-white/10 shadow-[0_28px_90px_-45px_rgba(0,0,0,0.8)] backdrop-blur-3xl rounded-none overflow-hidden ring-1 ring-white/5 transition-all duration-300 hover:border-white/15 hover:shadow-[0_32px_100px_-45px_rgba(255,255,255,0.08)] ${className}`}
    {...props}
  >
    {children}
  </div>
);

export const CardHeader = ({ children, className = '', ...props }) => (
  <div className={`px-6 py-5 border-b border-white/10 ${className}`} {...props}>
    {children}
  </div>
);

export const CardTitle = ({ children, className = '', ...props }) => (
  <h3 className={`text-lg font-semibold tracking-[0.16em] uppercase text-white/95 ${className}`} {...props}>
    {children}
  </h3>
);

export const CardContent = ({ children, className = '', ...props }) => (
  <div className={`px-6 py-5 ${className}`} {...props}>
    {children}
  </div>
);
