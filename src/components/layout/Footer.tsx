import React from 'react';
import { Settings, Copy, ChevronDown, Wallet, Twitter, Globe, Activity, Clock, Zap } from 'lucide-react';

const Footer = () => (
    <footer className="h-7 border-t border-[#1f1f26] bg-[#050507] flex items-center justify-between px-4 text-[10px] text-zinc-500 select-none fixed bottom-0 w-full z-50">
        <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-[#3b82f6] font-bold bg-[#3b82f6]/10 px-2 py-0.5 rounded-[3px] border border-[#3b82f6]/20 cursor-pointer hover:bg-[#3b82f6]/20">
                <Settings size={10} /> PRESET 1
            </div>
            <div className="flex gap-4 items-center border-l border-[#27272a] pl-4 h-4">
                <span className="flex items-center gap-1 hover:text-zinc-300 cursor-pointer"><Copy size={10} /> 1 <ChevronDown size={8} /></span>
                <span className="flex items-center gap-1 hover:text-zinc-300 cursor-pointer"><Wallet size={10} /> Wallet</span>
                <span className="flex items-center gap-1 hover:text-zinc-300 cursor-pointer"><Twitter size={10} /> Twitter</span>
                <span className="flex items-center gap-1 hover:text-zinc-300 cursor-pointer"><Globe size={10} /> Discover</span>
                <span className="flex items-center gap-1 hover:text-zinc-300 cursor-pointer text-[#3b82f6]"><Activity size={10} /> Pulse</span>
                <span className="flex items-center gap-1 hover:text-zinc-300 cursor-pointer">PnL</span>
            </div>
        </div>
        <div className="flex items-center gap-4">
            <div className="flex gap-3 items-center border-r border-[#27272a] pr-4 h-4">
                <span className="text-amber-500 flex items-center gap-1 font-mono font-medium">$92.0K</span>
                <span className="text-blue-500 font-mono font-medium">$3033</span>
                <span className="text-[#00ff9d] font-mono font-medium">$143.43</span>
            </div>
            <div className="flex items-center gap-3">
                <span className="text-zinc-600 font-mono">$58.9K</span>
                <span className="text-zinc-600 font-mono flex items-center gap-1"><Clock size={8} /> 0.0s</span>
                <span className="text-zinc-600 font-mono flex items-center gap-1"><Zap size={8} /> 0.003</span>
                <span className="text-[#00ff9d] bg-[#00ff9d]/10 px-1.5 py-0.5 rounded border border-[#00ff9d]/20 flex items-center gap-1 font-medium">● Connection is stable</span>
                <span className="text-zinc-300 font-bold bg-[#1c1c22] px-1.5 py-0.5 rounded border border-[#27272a] flex items-center gap-1">GLOBAL <ChevronDown size={8} /></span>
            </div>
        </div>
    </footer>
);

export default Footer;
