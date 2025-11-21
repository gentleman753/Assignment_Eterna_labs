import React, { useState } from 'react';
import { Activity, LayoutGrid, List, ChevronDown, TrendingUp, RefreshCw, Maximize2, Monitor, HelpCircle, Bookmark, Grid3x3, Volume2 } from 'lucide-react';
import DisplayDropdown from '../features/DisplayDropdown';

const PulseSubHeader = () => {
    const [isDisplayOpen, setIsDisplayOpen] = useState(false);

    return (
        <div className="h-11 border-b border-[#27272a] bg-[#000000] flex items-center justify-between px-4 relative z-40">
            {/* Left: Pulse Title & Icons */}
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                    <h1 className="text-base font-bold text-white">Pulse</h1>
                    <div className="w-6 h-6 rounded-full bg-[#18181b] flex items-center justify-center border border-[#27272a]">
                        <Activity size={12} className="text-[#3b82f6]" />
                    </div>
                    <div className="w-6 h-6 rounded-full bg-[#18181b] flex items-center justify-center border border-[#27272a]">
                        <LayoutGrid size={12} className="text-amber-500" />
                    </div>
                </div>
            </div>

            {/* Right: Controls */}
            <div className="flex items-center gap-4 relative">
                {/* Help Icon */}
                <button className="text-zinc-500 hover:text-white transition-colors p-1.5">
                    <HelpCircle size={16} />
                </button>

                {/* Display Dropdown */}
                <div className="relative">
                    <button
                        onClick={() => setIsDisplayOpen(!isDisplayOpen)}
                        className={`bg-[#18181b] border border-[#27272a] text-zinc-300 px-3 py-1.5 rounded-md text-[11px] font-medium flex items-center gap-2 hover:bg-[#27272a] hover:border-zinc-600 transition-all ${isDisplayOpen ? 'text-white border-zinc-500 bg-[#27272a]' : ''
                            }`}
                    >
                        <List size={12} /> Display <ChevronDown size={12} />
                    </button>

                    <DisplayDropdown isOpen={isDisplayOpen} onClose={() => setIsDisplayOpen(false)} />
                </div>

                {/* Action Icons */}
                <div className="flex items-center gap-2 border-l border-[#27272a] pl-4">
                    <button className="p-1.5 text-zinc-500 hover:text-white hover:bg-[#18181b] rounded transition-colors">
                        <Bookmark size={14} />
                    </button>
                    <button className="p-1.5 text-zinc-500 hover:text-white hover:bg-[#18181b] rounded transition-colors">
                        <Grid3x3 size={14} />
                    </button>
                    <button className="p-1.5 text-zinc-500 hover:text-white hover:bg-[#18181b] rounded transition-colors">
                        <Volume2 size={14} />
                    </button>
                    <button className="p-1.5 text-zinc-500 hover:text-white hover:bg-[#18181b] rounded transition-colors">
                        <TrendingUp size={14} />
                    </button>

                    {/* Monitor Selector */}
                    <div className="flex items-center gap-1 bg-[#18181b] border border-[#27272a] rounded px-2 py-1 ml-2">
                        <Monitor size={12} className="text-[#3b82f6]" />
                        <span className="text-[10px] font-bold text-white">1</span>
                        <ChevronDown size={10} className="text-zinc-500" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PulseSubHeader;
