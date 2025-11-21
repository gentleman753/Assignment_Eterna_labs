import React from 'react';

/**
 * A Radix-like Switch component with proper accessibility and state classes.
 */
const Switch = ({ checked, onCheckedChange, id }: { checked: boolean; onCheckedChange: (c: boolean) => void; id?: string }) => (
    <button
        type="button"
        role="switch"
        aria-checked={checked}
        id={id}
        onClick={() => onCheckedChange(!checked)}
        className={`
      peer inline-flex h-[20px] w-[36px] shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent 
      transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3b82f6] focus-visible:ring-offset-2 focus-visible:ring-offset-[#020203]
      disabled:cursor-not-allowed disabled:opacity-50
      ${checked ? 'bg-[#3b82f6]' : 'bg-[#27272a]'}
    `}
    >
        <span
            data-state={checked ? 'checked' : 'unchecked'}
            className={`
        pointer-events-none block h-4 w-4 rounded-full bg-white shadow-lg ring-0 transition-transform 
        ${checked ? 'translate-x-4' : 'translate-x-0'}
      `}
        />
    </button>
);

export default Switch;
