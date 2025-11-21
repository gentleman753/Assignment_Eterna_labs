import React from 'react';

/**
 * A Badge component for tags and statuses.
 */
const Badge = ({ children, variant = 'default', className = '' }: { children: React.ReactNode; variant?: 'default' | 'outline' | 'secondary' | 'destructive' | 'success'; className?: string }) => {
    const variants = {
        default: "border-transparent bg-[#3b82f6] text-white hover:bg-[#3b82f6]/80",
        secondary: "border-transparent bg-[#27272a] text-[#e4e4e7] hover:bg-[#27272a]/80",
        destructive: "border-transparent bg-[#f43f5e]/20 text-[#f43f5e] border-[#f43f5e]/20",
        success: "border-transparent bg-[#00ff9d]/10 text-[#00ff9d] border-[#00ff9d]/20",
        outline: "text-[#e4e4e7] border-[#27272a]",
    };
    return (
        <div className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${variants[variant]} ${className}`}>
            {children}
        </div>
    );
};

export default Badge;
