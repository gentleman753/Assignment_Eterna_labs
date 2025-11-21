import React, { useState } from 'react';
import { Zap, Search, Hash, Eye, EyeOff, Circle, RefreshCw, LayoutGrid, Square, ExternalLink } from 'lucide-react';
import { useAppDispatch, useAppSelector, actions } from '../../context/StoreContext';
import { DisplaySettings } from '../../types';
import Switch from '../ui/Switch';

const ToggleRow = ({ icon: Icon, label, checked, onChange }: { icon: any, label: string, checked: boolean, onChange: () => void }) => (
    <div className="flex items-center justify-between py-2 cursor-pointer group" onClick={onChange}>
        <div className="flex items-center gap-3 text-zinc-400 group-hover:text-zinc-200 transition-colors">
            <Icon size={14} />
            <span className="text-[11px] font-medium">{label}</span>
        </div>
        <Switch checked={checked} onCheckedChange={onChange} />
    </div>
);

const DisplaySettingsPopover = () => {
    const dispatch = useAppDispatch();
    const settings = useAppSelector(state => state.ui.displaySettings);
    const [activeTab, setActiveTab] = useState<'Layout' | 'Metrics' | 'Row' | 'Extras'>('Layout');

    const updateLayout = (key: keyof DisplaySettings['layout'], val: any) => {
        dispatch(actions.updateDisplaySettings('layout', key, val));
    };

    const updateExtras = (key: keyof DisplaySettings['extras'], val: any) => {
        dispatch(actions.updateDisplaySettings('extras', key, val));
    };

    // Helper to render tabs with proper active state
    const TabButton = ({ name }: { name: string }) => (
        <button
            onClick={() => setActiveTab(name as any)}
            className={`flex-1 py-1.5 text-[11px] font-medium rounded-md transition-all ${activeTab === name ? 'bg-[#27272a] text-white shadow-sm' : 'text-zinc-500 hover:text-zinc-300 hover:bg-white/5'}`}
        >
            {name}
        </button>
    );

    return (
        <div className="absolute top-12 right-20 w-[320px] bg-[#09090b] border border-[#27272a] rounded-xl shadow-2xl z-[100] overflow-hidden animate-in fade-in zoom-in-95 duration-150 origin-top-right ring-1 ring-black/20">
            <div className="flex items-center justify-between p-1 bg-[#020203] border-b border-[#27272a]">
                {['Layout', 'Metrics', 'Row', 'Extras'].map((tab) => (
                    <TabButton key={tab} name={tab} />
                ))}
            </div>

            <div className="p-4 max-h-[500px] overflow-y-auto custom-scrollbar">
                {activeTab === 'Layout' && (
                    <div className="space-y-5">
                        {/* Metrics Section */}
                        <div className="space-y-2">
                            <div className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider">Metrics</div>
                            <div className="grid grid-cols-2 gap-2">
                                <button onClick={() => updateLayout('metricsSize', 'small')} className={`py-2 rounded border text-center transition-all relative overflow-hidden ${settings.layout.metricsSize === 'small' ? 'bg-[#3b82f6]/10 border-[#3b82f6] text-white ring-1 ring-[#3b82f6]/50' : 'bg-[#18181b] border-[#27272a] text-zinc-500 hover:border-zinc-600'}`}>
                                    <div className="text-[10px]">MC 77K</div>
                                    <div className="text-[9px] opacity-60">Small</div>
                                    {settings.layout.metricsSize === 'small' && <div className="absolute top-0 right-0 p-0.5"><div className="w-1.5 h-1.5 bg-[#3b82f6] rounded-full" /></div>}
                                </button>
                                <button onClick={() => updateLayout('metricsSize', 'large')} className={`py-2 rounded border text-center transition-all relative overflow-hidden ${settings.layout.metricsSize === 'large' ? 'bg-[#3b82f6]/10 border-[#3b82f6] text-white ring-1 ring-[#3b82f6]/50' : 'bg-[#18181b] border-[#27272a] text-zinc-500 hover:border-zinc-600'}`}>
                                    <div className="text-xs font-bold">MC 77K</div>
                                    <div className="text-[9px] opacity-60">Large</div>
                                    {settings.layout.metricsSize === 'large' && <div className="absolute top-0 right-0 p-0.5"><div className="w-1.5 h-1.5 bg-[#3b82f6] rounded-full" /></div>}
                                </button>
                            </div>
                        </div>

                        {/* Quick Buy Section */}
                        <div className="space-y-2">
                            <div className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider">Quick Buy</div>
                            <div className="grid grid-cols-4 gap-2">
                                {['Small', 'Large', 'Mega', 'Ultra'].map((size) => (
                                    <button
                                        key={size}
                                        onClick={() => updateLayout('quickBuySize', size.toLowerCase())}
                                        className={`py-1.5 rounded border flex flex-col items-center gap-1 transition-all ${settings.layout.quickBuySize === size.toLowerCase() ? 'bg-[#3b82f6]/10 border-[#3b82f6] text-white ring-1 ring-[#3b82f6]/50' : 'bg-[#18181b] border-[#27272a] text-zinc-500 hover:border-zinc-600'}`}
                                    >
                                        <Zap size={10} fill="currentColor" />
                                        <span className="text-[8px]">{size}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Toggles Grid */}
                        <div className="space-y-0.5 border-t border-[#27272a] pt-4">
                            <ToggleRow icon={Search} label="Show Search Bar" checked={settings.layout.showSearchBar} onChange={() => updateLayout('showSearchBar', !settings.layout.showSearchBar)} />
                            <ToggleRow icon={Hash} label="No Decimals" checked={settings.layout.noDecimals} onChange={() => updateLayout('noDecimals', !settings.layout.noDecimals)} />
                            <ToggleRow icon={Eye} label="Show Hidden Tokens" checked={settings.layout.showHiddenTokens} onChange={() => updateLayout('showHiddenTokens', !settings.layout.showHiddenTokens)} />
                            <ToggleRow icon={EyeOff} label="Unhide on Migrated" checked={settings.layout.unhideOnMigrated} onChange={() => updateLayout('unhideOnMigrated', !settings.layout.unhideOnMigrated)} />
                            <ToggleRow icon={Circle} label="Circle Images" checked={settings.layout.circleImages} onChange={() => updateLayout('circleImages', !settings.layout.circleImages)} />
                            <ToggleRow icon={RefreshCw} label="Progress Bar" checked={settings.layout.progressBar} onChange={() => updateLayout('progressBar', !settings.layout.progressBar)} />
                            <ToggleRow icon={LayoutGrid} label="Spaced Tables" checked={settings.layout.spacedTables} onChange={() => updateLayout('spacedTables', !settings.layout.spacedTables)} />
                        </div>
                    </div>
                )}

                {activeTab === 'Extras' && (
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <div className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider">Click Quick Buy Behavior</div>
                            <div className="grid grid-cols-2 gap-2">
                                <button
                                    onClick={() => updateExtras('quickBuyBehavior', 'nothing')}
                                    className={`py-3 rounded border flex flex-col items-center gap-1.5 transition-all ${settings.extras.quickBuyBehavior === 'nothing' ? 'bg-[#27272a] text-white border-zinc-500 ring-1 ring-zinc-500' : 'bg-[#18181b] border-[#27272a] text-zinc-500 hover:border-zinc-600'}`}
                                >
                                    <Square size={12} /> <span className="text-[9px] font-medium">Nothing</span>
                                </button>
                                <button
                                    onClick={() => updateExtras('quickBuyBehavior', 'open_page')}
                                    className={`py-3 rounded border flex flex-col items-center gap-1.5 transition-all ${settings.extras.quickBuyBehavior === 'open_page' ? 'bg-[#27272a] text-white border-zinc-500 ring-1 ring-zinc-500' : 'bg-[#18181b] border-[#27272a] text-zinc-500 hover:border-zinc-600'}`}
                                >
                                    <ExternalLink size={12} /> <span className="text-[9px] font-medium">Open Page</span>
                                </button>
                            </div>
                            <button
                                onClick={() => updateExtras('quickBuyBehavior', 'open_tab')}
                                className={`w-full py-3 rounded border flex flex-col items-center gap-1.5 transition-all ${settings.extras.quickBuyBehavior === 'open_tab' ? 'bg-[#27272a] text-white border-zinc-500 ring-1 ring-zinc-500' : 'bg-[#18181b] border-[#27272a] text-zinc-500 hover:border-zinc-600'}`}
                            >
                                <ExternalLink size={12} /> <span className="text-[9px] font-medium">Open in New Tab</span>
                            </button>
                        </div>

                        <div className="border-t border-[#27272a] pt-4">
                            <ToggleRow icon={Zap} label="Second Quick Buy Button" checked={settings.extras.secondQuickBuy} onChange={() => updateExtras('secondQuickBuy', !settings.extras.secondQuickBuy)} />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DisplaySettingsPopover;
