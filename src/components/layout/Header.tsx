import React, { useState } from 'react';
import { Search, Bell, Star, Folder, Wallet, User, ChevronDown, List } from 'lucide-react';
import { useAppDispatch, useAppSelector, actions } from '../../context/StoreContext';
import DisplayDropdown from '../features/DisplayDropdown';

const Header = () => {
    const dispatch = useAppDispatch();
    const searchQuery = useAppSelector(state => state.ui.searchQuery);
    const settings = useAppSelector(state => state.ui.displaySettings.layout);
    const [isDisplayOpen, setIsDisplayOpen] = useState(false);

    return (
        <header className="bg-[#000000] border-b border-[#27272a] px-4 py-3 flex items-center justify-between">
            {/* Left: Logo & Navigation */}
            <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-blue-600 rounded flex items-center justify-center">
                        <span className="text-white text-xs font-bold">A</span>
                    </div>
                    <span className="text-white font-bold text-sm">AXIOM <span className="text-blue-500">Pro</span></span>
                </div>

                {/* Navigation Menu */}
                <nav className="hidden md:flex items-center gap-4 text-sm">
                    <a href="#" className="text-zinc-500 hover:text-white transition-colors">Discover</a>
                    <a href="#" className="text-blue-500 font-medium">Pulse</a>
                    <a href="#" className="text-zinc-500 hover:text-white transition-colors">Trackers</a>
                    <a href="#" className="text-zinc-500 hover:text-white transition-colors">Perpetuals</a>
                    <a href="#" className="text-zinc-500 hover:text-white transition-colors">Yield</a>
                    <a href="#" className="text-zinc-500 hover:text-white transition-colors">Vision</a>
                    <a href="#" className="text-zinc-500 hover:text-white transition-colors">Portfolio</a>
                    <a href="#" className="text-zinc-500 hover:text-white transition-colors">Rewards</a>
                </nav>
            </div>

            {/* Center: Search */}
            <div className="flex-1 max-w-md mx-4">
                {settings.showSearchBar && (
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
                        <input
                            type="text"
                            placeholder="Search by token or CA..."
                            value={searchQuery}
                            onChange={(e) => dispatch(actions.setSearchQuery(e.target.value))}
                            className="w-full bg-[#18181b] border border-[#27272a] rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#3f3f46]"
                        />
                    </div>
                )}
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-3">
                {/* SOL Selector */}
                <button className="hidden md:flex items-center gap-2 bg-[#18181b] border border-[#27272a] rounded-lg px-3 py-2 text-sm text-white hover:border-[#3f3f46] transition-colors">
                    <span className="text-xs">◎</span>
                    <span>SOL</span>
                    <ChevronDown size={14} />
                </button>

                {/* Deposit Button */}
                <button className="hidden md:block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                    Deposit
                </button>

                {/* Icon Buttons */}
                <button className="text-zinc-400 hover:text-white transition-colors p-2">
                    <Star size={18} />
                </button>
                <button className="text-zinc-400 hover:text-white transition-colors p-2">
                    <Bell size={18} />
                </button>
                <button className="text-zinc-400 hover:text-white transition-colors p-2 relative">
                    <Folder size={18} />
                    <span className="absolute -top-1 -right-1 bg-zinc-700 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">0</span>
                </button>
                <button className="text-zinc-400 hover:text-white transition-colors p-2 relative">
                    <Wallet size={18} />
                    <span className="absolute -top-1 -right-1 bg-zinc-700 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">0</span>
                </button>
                <button className="text-zinc-400 hover:text-white transition-colors p-2">
                    <User size={18} />
                </button>
            </div>
        </header>
    );
};

export default Header;
