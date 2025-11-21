import React from 'react';

const Button = ({ children, variant = 'primary', className = '', ...props }: any) => {
    const base = "px-3 py-1.5 rounded-md text-xs font-bold transition-all duration-200 flex items-center justify-center gap-2 select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50";
    const variants = {
        primary: "bg-[#4f46e5] hover:bg-[#4338ca] text-white shadow-[0_0_10px_rgba(79,70,229,0.3)]",
        ghost: "bg-transparent hover:bg-white/5 text-zinc-400 hover:text-zinc-200",
        outline: "border border-[#27272a] bg-[#18181b] text-zinc-300 hover:border-zinc-600 hover:text-white",
        secondary: "bg-[#27272a] text-zinc-100 hover:bg-[#3f3f46]",
    };
    return <button className={`${base} ${variants[variant as keyof typeof variants]} ${className}`} {...props}>{children}</button>;
};

export default Button;
