import { MarketState } from '../types';

export const INITIAL_STATE: MarketState = {
    tokens: {},
    ui: {
        selectedTokenId: null,
        isSettingsOpen: false,
        displaySettings: {
            layout: {
                metricsSize: 'large',
                quickBuySize: 'small',
                showSearchBar: true,
                noDecimals: false,
                showHiddenTokens: true,
                unhideOnMigrated: true,
                circleImages: false,
                progressBar: true,
                spacedTables: false,
            },
            extras: {
                quickBuyBehavior: 'nothing',
                secondQuickBuy: false
            }
        }
    }
};

export const COLORS = {
    bg: 'bg-[#000000]',
    surface: 'bg-[#09090b]',
    surfaceHover: 'hover:bg-[#121214]',
    border: 'border-[#27272a]',
    accentGreen: 'text-[#22c55e]',
    accentBlue: 'text-[#3b82f6]',
    accentRed: 'text-[#ef4444]',
    textPrimary: 'text-[#fafafa]',
    textSecondary: 'text-[#a1a1aa]',
};
