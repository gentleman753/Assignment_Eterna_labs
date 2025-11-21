import React from 'react';
import { Search as SearchIcon, Zap, SlidersHorizontal } from 'lucide-react';
import { useAppDispatch, useAppSelector, actions } from '../../context/StoreContext';
import { Token, TokenStatus } from '../../types';
import TokenCard from './TokenCard';

const Swimlane = ({ title, icon: Icon, tokens, type }: { title: string, icon: any, tokens: Token[], type: TokenStatus }) => {
    const dispatch = useAppDispatch();
    const [filter, setFilter] = React.useState<'ALL' | 'P1' | 'P2' | 'P3'>('ALL');
    const settings = useAppSelector(state => state.ui.displaySettings.layout);

    const filteredTokens = React.useMemo(() => {
        let result = tokens;

        // Filter hidden tokens
        if (!settings.showHiddenTokens) {
            // Assuming we have a hidden property or list. For now, mock logic or skip if not implemented in Token type.
            // If unhideOnMigrated is true and token is migrated, show it.
        }

        if (filter === 'ALL') return result;

        // Mock filtering logic since we don't have real P1/P2/P3 data
        return result.filter(t => {
            const hash = t.id.charCodeAt(0) % 3;
            if (filter === 'P1') return hash === 0;
            if (filter === 'P2') return hash === 1;
            return hash === 2;
        });
    }, [tokens, filter, settings.showHiddenTokens, settings.unhideOnMigrated]);

    return (
        <div className="flex flex-col h-full bg-[#000000] border-r border-[#27272a] last:border-r-0 overflow-hidden">
            <div className="px-3 py-2 border-b border-[#27272a] flex items-center justify-between bg-[#09090b] min-h-[40px]">
                <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-[13px]">{title}</span>
                </div>

                <div className="flex items-center gap-3">
                    <div className="text-[10px] text-zinc-500 flex items-center gap-1 font-mono">
                        <Zap size={10} /> {filteredTokens.length}
                    </div>
                    <div className="flex bg-[#18181b] rounded border border-[#27272a] p-[1px]">
                        <button
                            onClick={() => setFilter(filter === 'P1' ? 'ALL' : 'P1')}
                            className={`px-2 py-0.5 text-[9px] font-bold rounded-[2px] transition-colors ${filter === 'P1' ? 'text-[#3b82f6] bg-[#3b82f6]/10' : 'text-zinc-500 hover:text-zinc-300'}`}
                        >
                            P1
                        </button>
                        <button
                            onClick={() => setFilter(filter === 'P2' ? 'ALL' : 'P2')}
                            className={`px-2 py-0.5 text-[9px] font-bold rounded-[2px] transition-colors ${filter === 'P2' ? 'text-[#3b82f6] bg-[#3b82f6]/10' : 'text-zinc-500 hover:text-zinc-300'}`}
                        >
                            P2
                        </button>
                        <button
                            onClick={() => setFilter(filter === 'P3' ? 'ALL' : 'P3')}
                            className={`px-2 py-0.5 text-[9px] font-bold rounded-[2px] transition-colors ${filter === 'P3' ? 'text-[#3b82f6] bg-[#3b82f6]/10' : 'text-zinc-500 hover:text-zinc-300'}`}
                        >
                            P3
                        </button>
                    </div>
                    <SlidersHorizontal size={14} className="text-zinc-500 cursor-pointer hover:text-white transition-colors" />
                </div>
            </div>
            <div className={`flex-1 overflow-y-auto p-2 custom-scrollbar bg-[#000000] ${settings.spacedTables ? 'space-y-4' : 'space-y-2'}`}>
                {filteredTokens.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-32 text-zinc-700 gap-2">
                        <div className="w-4 h-4 border-2 border-zinc-800 border-t-[#3b82f6] rounded-full animate-spin" />
                        <span className="text-[10px]">Listening for new pairs...</span>
                    </div>
                ) : (
                    filteredTokens.map(token => (<TokenCard key={token.id} token={token} onClick={() => dispatch(actions.setSelectedToken(token.id))} />))
                )}
            </div>
        </div>
    );
};

export default Swimlane;
