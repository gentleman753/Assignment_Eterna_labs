import React, { useMemo } from 'react';
import { Droplets, Flame, Rocket } from 'lucide-react';
import { useAppDispatch, useAppSelector, actions } from '../../context/StoreContext';
import { useMarketSimulation } from '../../hooks/useMarketSimulation';
import Header from './Header';
import PulseSubHeader from './PulseSubHeader';
import Footer from './Footer';
import Swimlane from '../features/Swimlane';
import TokenDetailsModal from '../features/TokenDetailsModal';
import { ToastContainer } from '../ui/Toast';

const Dashboard = () => {
    useMarketSimulation();
    const dispatch = useAppDispatch();
    const tokens = useAppSelector((state) => state.tokens);
    const selectedTokenId = useAppSelector((state) => state.ui.selectedTokenId);
    const searchQuery = useAppSelector((state) => state.ui.searchQuery);
    const toasts = useAppSelector((state) => state.ui.toasts);

    const filteredTokens = useMemo(() => {
        const allTokens = Object.values(tokens);
        if (!searchQuery) return allTokens;
        const lowerQuery = searchQuery.toLowerCase();
        return allTokens.filter(t =>
            t.ticker.toLowerCase().includes(lowerQuery) ||
            t.name.toLowerCase().includes(lowerQuery) ||
            t.id.toLowerCase().includes(lowerQuery)
        );
    }, [tokens, searchQuery]);

    const newPairs = useMemo(() => filteredTokens.filter(t => t.status === 'new').sort((a, b) => b.createdAt - a.createdAt), [filteredTokens]);
    const finalStretch = useMemo(() => filteredTokens.filter(t => t.status === 'final-stretch').sort((a, b) => b.bondingCurveProgress - a.bondingCurveProgress), [filteredTokens]);
    const migrated = useMemo(() => filteredTokens.filter(t => t.status === 'migrated').sort((a, b) => b.volume24h - a.volume24h), [filteredTokens]);

    const selectedToken = selectedTokenId ? tokens[selectedTokenId] : null;

    return (
        <div className="h-screen bg-[#000000] text-zinc-100 font-sans flex flex-col overflow-hidden pb-7">
            <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 5px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #000000; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #27272a; border-radius: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #3f3f46; }
        body { background-color: #000000; font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; }
      `}</style>
            <Header />
            <PulseSubHeader />
            <main className="flex-1 flex flex-col md:flex-row w-full min-h-0 overflow-y-auto md:overflow-hidden">
                <div className="w-full md:flex-1 md:min-w-[320px] min-h-[500px] md:h-full border-b md:border-b-0 md:border-r border-[#27272a] last:border-0"><Swimlane title="New Pairs" icon={Droplets} tokens={newPairs} type="new" /></div>
                <div className="w-full md:flex-1 md:min-w-[320px] min-h-[500px] md:h-full border-b md:border-b-0 md:border-r border-[#27272a] last:border-0"><Swimlane title="Final Stretch" icon={Flame} tokens={finalStretch} type="final-stretch" /></div>
                <div className="w-full md:flex-1 md:min-w-[320px] min-h-[500px] md:h-full"><Swimlane title="Migrated" icon={Rocket} tokens={migrated} type="migrated" /></div>
            </main>
            <Footer />
            {selectedToken && <TokenDetailsModal token={selectedToken} onClose={() => dispatch(actions.setSelectedToken(null))} />}
            <ToastContainer toasts={toasts} removeToast={(id) => dispatch(actions.removeToast(id))} />
        </div>
    );
};

export default Dashboard;
