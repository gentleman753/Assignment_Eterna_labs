import React, { useState } from 'react';
import { Sun, Search, Hash, Eye, EyeOff, Square, Loader, LayoutGrid, Zap } from 'lucide-react';
import { useAppDispatch, useAppSelector, actions } from '../../context/StoreContext';
import Switch from '../ui/Switch';

const DisplayDropdown = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
    const dispatch = useAppDispatch();
    const settings = useAppSelector(state => state.ui.displaySettings);
    const [activeTab, setActiveTab] = useState<'Layout' | 'Metrics' | 'Row' | 'Extras'>('Layout');

    if (!isOpen) return null;

    const updateLayout = (key: string, value: any) => {
        dispatch(actions.updateDisplaySettings('layout', key, value));
    };

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 z-40"
                onClick={onClose}
            />

            {/* Dropdown */}
            <div className="absolute top-12 right-0 w-[320px] bg-[#09090b] border border-[#27272a] rounded-xl shadow-2xl z-50 overflow-hidden font-sans">
                {/* Metrics Section */}
                <div className="p-3 border-b border-[#27272a]">
                    <div className="text-[10px] text-zinc-500 font-medium mb-2">Metrics</div>
                    <div className="grid grid-cols-2 gap-2">
                        <button
                            onClick={() => updateLayout('metricsSize', 'small')}
                            className={`py-2 px-3 rounded border text-center transition-all ${settings.layout.metricsSize === 'small'
                                ? 'bg-[#27272a] border-[#3f3f46] text-white'
                                : 'bg-[#09090b] border-[#27272a] text-zinc-500 hover:border-[#3f3f46]'
                                }`}
                        >
                            <div className="text-[10px] font-medium">MC 77K</div>
                            <div className="text-[10px] text-zinc-500">Small</div>
                        </button>
                        <button
                            onClick={() => updateLayout('metricsSize', 'large')}
                            className={`py-2 px-3 rounded border text-center transition-all ${settings.layout.metricsSize === 'large'
                                ? 'bg-[#27272a] border-[#3f3f46] text-white'
                                : 'bg-[#09090b] border-[#27272a] text-zinc-500 hover:border-[#3f3f46]'
                                }`}
                        >
                            <div className="text-[11px] font-bold">MC 77K</div>
                            <div className="text-[10px] text-zinc-500">Large</div>
                        </button>
                    </div>
                </div>

                {/* Quick Buy Section */}
                <div className="p-3 border-b border-[#27272a]">
                    <div className="text-[10px] text-zinc-500 font-medium mb-2">Quick Buy</div>
                    <div className="grid grid-cols-4 gap-2">
                        {['small', 'large', 'mega', 'ultra'].map((size) => (
                            <button
                                key={size}
                                onClick={() => updateLayout('quickBuySize', size)}
                                className={`py-2 px-1 rounded border text-center transition-all flex flex-col items-center justify-center ${settings.layout.quickBuySize === size
                                    ? 'bg-[#3b82f6]/10 border-[#3b82f6] text-[#3b82f6]'
                                    : 'bg-[#09090b] border-[#27272a] text-zinc-500 hover:border-[#3f3f46]'
                                    }`}
                            >
                                <Zap size={12} fill="currentColor" className="mb-1" />
                                <div className="text-[9px] font-medium capitalize">{size}</div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Theme Toggle */}
                <div className="p-3 border-b border-[#27272a]">
                    <button className="flex items-center gap-2 text-zinc-300 hover:text-white transition-colors w-full">
                        <Sun size={14} />
                        <span className="text-[11px] font-medium">Grey</span>
                    </button>
                </div>

                {/* Tabs */}
                <div className="flex border-b border-[#27272a] bg-[#09090b] px-2">
                    {(['Layout', 'Metrics', 'Row', 'Extras'] as const).map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`flex-1 py-2 text-[11px] font-medium transition-colors relative ${activeTab === tab
                                ? 'text-white'
                                : 'text-zinc-500 hover:text-zinc-300'
                                }`}
                        >
                            {tab}
                            {activeTab === tab && (
                                <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-white mx-2" />
                            )}
                        </button>
                    ))}
                </div>

                {/* Settings List */}
                <div className="p-2">
                    {activeTab === 'Layout' && (
                        <div className="space-y-0.5">
                            <SettingRow
                                icon={<Search size={12} />}
                                label="Show Search Bar"
                                checked={settings.layout.showSearchBar}
                                onChange={() => updateLayout('showSearchBar', !settings.layout.showSearchBar)}
                            />
                            <SettingRow
                                icon={<Hash size={12} />}
                                label="No Decimals"
                                checked={settings.layout.noDecimals}
                                onChange={() => updateLayout('noDecimals', !settings.layout.noDecimals)}
                            />
                            <SettingRow
                                icon={<Eye size={12} />}
                                label="Show Hidden Tokens"
                                checked={settings.layout.showHiddenTokens}
                                onChange={() => updateLayout('showHiddenTokens', !settings.layout.showHiddenTokens)}
                            />
                            <SettingRow
                                icon={<EyeOff size={12} />}
                                label="Unhide on Migrated"
                                checked={settings.layout.unhideOnMigrated}
                                onChange={() => updateLayout('unhideOnMigrated', !settings.layout.unhideOnMigrated)}
                            />
                            <SettingRow
                                icon={<Square size={12} />}
                                label="Circle Images"
                                checked={settings.layout.circleImages}
                                onChange={() => updateLayout('circleImages', !settings.layout.circleImages)}
                            />
                            <SettingRow
                                icon={<Loader size={12} />}
                                label="Progress Bar"
                                checked={settings.layout.progressBar}
                                onChange={() => updateLayout('progressBar', !settings.layout.progressBar)}
                            />
                            <SettingRow
                                icon={<LayoutGrid size={12} />}
                                label="Spaced Tables"
                                checked={settings.layout.spacedTables}
                                onChange={() => updateLayout('spacedTables', !settings.layout.spacedTables)}
                            />
                        </div>
                    )}
                    {activeTab !== 'Layout' && (
                        <div className="text-center text-zinc-500 py-8 text-xs">
                            Coming soon
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

const SettingRow = ({
    icon,
    label,
    checked,
    onChange
}: {
    icon: React.ReactNode;
    label: string;
    checked: boolean;
    onChange: () => void;
}) => (
    <div
        className="flex items-center justify-between py-2 px-2 hover:bg-[#18181b] rounded cursor-pointer transition-colors group"
        onClick={onChange}
    >
        <div className="flex items-center gap-3">
            <span className="text-zinc-500 group-hover:text-zinc-300 transition-colors">{icon}</span>
            <span className="text-[11px] text-zinc-300 font-medium group-hover:text-white transition-colors">{label}</span>
        </div>
        {/* Assuming the reference image might not show a switch, but we keep it for functionality. 
            If the user wants it EXACTLY like the image and the image has no switch, we'd hide it.
            For now, I'll make it small. */}
        <div className={`w-2 h-2 rounded-full ${checked ? 'bg-[#3b82f6]' : 'bg-zinc-700'}`} />
    </div>
);

export default DisplayDropdown;
