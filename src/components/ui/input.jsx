import React from 'react';

export const Input = ({ className = '', ...props }) => (
  <input className={`w-full bg-black/60 border border-white/10 px-4 py-2 rounded-none text-sm text-white placeholder-gray-600 focus:outline-none focus:border-white/30 ${className}`} {...props} />
);
