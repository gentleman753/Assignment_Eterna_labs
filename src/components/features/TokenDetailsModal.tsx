import React from 'react';
import { X, Activity } from 'lucide-react';
import { Token } from '../../types';
import SimulatedChart from './SimulatedChart';
import Button from '../ui/Button';

const TokenDetailsModal = ({ token, onClose }: { token: Token | null, onClose: () => void }) => {
    if (!token) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
            <div className="bg-[#0e0e11] border border-[#27272a] rounded-lg w-full max-w-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150">
                <div className="p-4 border-b border-[#27272a] flex justify-between items-center bg-[#020203]">
                    <h2 className="text-lg font-bold text-white flex items-center gap-2">
                        {token.ticker} / SOL <span className="text-xs text-zinc-500 font-normal bg-zinc-900 px-2 py-1 rounded">{token.id}</span>
                    </h2>
                    <button onClick={onClose} className="text-zinc-500 hover:text-white transition-colors"><X size={20} /></button>
                </div>
                <div className="p-6 bg-[#050507]">
                    <SimulatedChart token={token} />
                    <div className="mt-4 flex justify-between items-center">
                        <div className="text-xs text-zinc-400 flex items-center gap-2">
                            <Activity size={12} className="text-zinc-500" />
                            High-performance simulated feed (15m)
                        </div>
                        <div className="flex gap-2">
                            <Button variant="secondary" className="text-[11px]">View on Solscan</Button>
                            <Button variant="primary" className="text-[11px]">Execute Trade</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TokenDetailsModal;
