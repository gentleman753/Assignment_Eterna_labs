import React, { useMemo } from 'react';
import { Zap, Globe, Search as SearchIcon, User, Activity, Ghost, PieChart, Lock, Copy, MessageSquare } from 'lucide-react';
import { useAppDispatch, useAppSelector, actions } from '../../context/StoreContext';
import { Token } from '../../types';
import { formatK, formatTimeAgo } from '../../utils';
import { COLORS } from '../../constants';

const TokenCard = React.memo(({ token, onClick }: { token: Token, onClick: () => void }) => {
    const dispatch = useAppDispatch();
    const settings = useAppSelector(state => state.ui.displaySettings.layout);
    const quickBuySize = useAppSelector(state => state.ui.displaySettings.layout.quickBuySize);

    const handleQuickBuy = (e: React.MouseEvent) => {
        e.stopPropagation();
        let amount = '0';
        switch (quickBuySize) {
            case 'small': amount = '0.01'; break;
            case 'large': amount = '0.1'; break;
            case 'mega': amount = '0.5'; break;
            case 'ultra': amount = '1.0'; break;
            default: amount = '0';
        }
        dispatch(actions.addToast(`Bought ${amount} SOL of ${token.ticker}`, 'success'));
    };

    const handleCopy = (e: React.MouseEvent) => {
        e.stopPropagation();
        navigator.clipboard.writeText(token.id);
        dispatch(actions.addToast('Contract Address Copied', 'info'));
    };

    // Memoize random values to prevent hydration mismatch
    const randomStats = useMemo(() => ({
        fees: (Math.random() * 5).toFixed(3),
        globe: Math.random() > 0.5,
        searchCount: Math.floor(Math.random() * 20),
        activityCount: Math.floor(Math.random() * 10)
    }), []);

    return (
        <div
            onClick={onClick}
            className={`
                relative group cursor-pointer 
                ${COLORS.surface} border ${COLORS.border}
                p-2 rounded-lg select-none flex gap-3 items-start
                transition-all duration-200 hover:border-zinc-600
                h-[92px] mb-2 overflow-hidden
            `}
        >
            {/* Left: Token Image */}
            <div className="w-[56px] h-[56px] flex-shrink-0 relative">
                <img
                    src={token.logoImage}
                    alt={token.ticker}
                    className={`w-full h-full object-cover border border-white/10 ${settings.circleImages ? 'rounded-full' : 'rounded-md'}`}
                />
                <div className="absolute -bottom-1 -right-1 bg-black/80 backdrop-blur-sm text-[9px] px-1.5 py-0.5 text-zinc-400 font-mono border border-white/10 rounded">
                    {token.id.substring(0, 4)}
                </div>
            </div>

            {/* Middle: Info & Stats */}
            <div className="flex-1 min-w-0 flex flex-col justify-between h-full py-0.5">
                <div className="flex flex-col gap-1">
                    {/* Row 1: Ticker & Name */}
                    <div className="flex items-center gap-2">
                        <span className="font-bold text-white text-[13px] leading-none truncate hover:text-[#3b82f6] transition-colors">{token.ticker}</span>
                        <span className="text-zinc-500 text-[11px] leading-none truncate max-w-[100px]">{token.name}</span>
                        <Copy size={10} className="text-zinc-600 hover:text-zinc-400 cursor-pointer" onClick={handleCopy} />
                    </div>

                    {/* Row 2: Time & Socials */}
                    <div className="flex items-center gap-3 text-[10px]">
                        <span className="text-[#22c55e] font-mono font-bold">{formatTimeAgo(token.createdAt)}</span>
                        <div className="flex items-center gap-2 text-zinc-500">
                            <div className="flex items-center gap-1 hover:text-zinc-300">
                                <User size={10} /> <span className="font-mono">{token.misc.comments}</span>
                            </div>
                            {randomStats.globe && <Globe size={10} className="text-zinc-500 hover:text-zinc-300" />}
                            <div className="flex items-center gap-1 hover:text-zinc-300">
                                <SearchIcon size={10} /> <span className="font-mono">{randomStats.searchCount}</span>
                            </div>
                            <div className="flex items-center gap-1 hover:text-zinc-300">
                                <Activity size={10} /> <span className="font-mono">{randomStats.activityCount}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Row 3: Risk Metrics */}
                <div className="flex items-center gap-3 text-[9px] font-mono text-zinc-500 mt-auto mb-1">
                    <span className="flex items-center gap-1 hover:text-zinc-300" title="Top 10 Holders">
                        <User size={8} className="text-[#ef4444]" />
                        <span className="text-[#ef4444]">{token.risk.top10}%</span>
                    </span>
                    <span className="flex items-center gap-1 hover:text-zinc-300" title="Dev Holdings">
                        <Ghost size={8} className="text-[#22c55e]" />
                        <span className="text-[#22c55e]">{token.risk.dev}%</span>
                    </span>
                    <span className="flex items-center gap-1 hover:text-zinc-300" title="Insider Holdings">
                        <PieChart size={8} className="text-[#ef4444]" />
                        <span className="text-[#ef4444]">{token.risk.insiders}%</span>
                    </span>
                    <span className="flex items-center gap-1 hover:text-zinc-300" title="Liquidity Locked">
                        <Lock size={8} className="text-[#22c55e]" />
                        <span className="text-[#22c55e]">{token.risk.liquidity}%</span>
                    </span>
                    <span className="flex items-center gap-1 hover:text-zinc-300" title="Activity">
                        <Activity size={8} className="text-[#22c55e]" />
                        <span className="text-[#22c55e]">0%</span>
                    </span>
                </div>

                {/* Progress Bar */}
                {settings.progressBar && (
                    <div className="w-full h-1 bg-zinc-800 rounded-full overflow-hidden mt-1">
                        <div
                            className={`h-full ${token.bondingCurveProgress > 80 ? 'bg-[#ef4444]' : 'bg-[#22c55e]'}`}
                            style={{ width: `${token.bondingCurveProgress}%` }}
                        />
                    </div>
                )}
            </div>

            {/* Right: Financials & Actions */}
            <div className="flex flex-col items-end justify-between h-full min-w-[100px] py-0.5">
                <div className="text-right">
                    <div className="text-[10px] text-zinc-500 font-mono flex justify-end items-center gap-1">
                        MC <span className="text-[#3b82f6] font-bold text-[11px]">{formatK(token.marketCap, settings.noDecimals)}</span>
                    </div>
                    <div className="text-[10px] text-zinc-500 font-mono flex justify-end items-center gap-1 mt-0.5">
                        V <span className="text-white text-[11px]">{formatK(token.volume24h, settings.noDecimals)}</span>
                    </div>
                </div>

                <div className="flex flex-col items-end gap-1 w-full">
                    <div className="text-[9px] text-zinc-600 font-mono flex items-center gap-1">
                        F <span className="text-[#3b82f6]">{randomStats.fees}</span>
                        <span className="text-zinc-700">|</span>
                        TX <span className="text-zinc-400">{token.transactions}</span>
                    </div>
                    <button
                        onClick={handleQuickBuy}
                        className="w-full bg-[#3b82f6] hover:bg-[#2563eb] text-white text-[10px] font-bold rounded-[4px] h-6 flex items-center justify-center gap-1 shadow-lg shadow-blue-900/20 transition-all active:scale-95"
                    >
                        <Zap size={10} fill="currentColor" />
                        {quickBuySize === 'small' ? '0.01' :
                            quickBuySize === 'large' ? '0.1' :
                                quickBuySize === 'mega' ? '0.5' :
                                    quickBuySize === 'ultra' ? '1.0' : '0'} SOL
                    </button>
                </div>
            </div>
        </div>
    );
});

export default TokenCard;
