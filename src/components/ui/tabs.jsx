import React, { createContext, useContext, useState } from 'react';

const TabsContext = createContext({ value: undefined, onChange: () => {} });

export const Tabs = ({ defaultValue, value, onValueChange, className = '', children, ...props }) => {
  const [activeValue, setActiveValue] = useState(value ?? defaultValue);
  const selectedValue = value !== undefined ? value : activeValue;

  const handleChange = (nextValue) => {
    if (onValueChange) {
      onValueChange(nextValue);
    }
    if (value === undefined) {
      setActiveValue(nextValue);
    }
  };

  return (
    <TabsContext.Provider value={{ value: selectedValue, onChange: handleChange }}>
      <div className={className} {...props}>
        {children}
      </div>
    </TabsContext.Provider>
  );
};

export const TabsList = ({ className = '', children, ...props }) => (
  <div className={className} {...props}>
    {children}
  </div>
);

export const TabsTrigger = ({ value, className = '', children, ...props }) => {
  const context = useContext(TabsContext);
  return (
    <button
      type="button"
      data-state={context.value === value ? 'active' : 'inactive'}
      className={className}
      onClick={() => context.onChange(value)}
      {...props}
    >
      {children}
    </button>
  );
};

export const TabsContent = ({ value, className = '', children, ...props }) => {
  const context = useContext(TabsContext);
  if (context.value !== value) {
    return null;
  }

  return (
    <div className={className} {...props}>
      {children}
    </div>
  );
};
