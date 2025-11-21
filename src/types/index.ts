export type TokenStatus = 'new' | 'final-stretch' | 'migrated';

export interface Token {
    id: string;
    ticker: string;
    name: string;
    status: TokenStatus;
    price: number;
    priceChange24h: number;
    marketCap: number;
    volume24h: number;
    transactions: number;
    createdAt: number;
    bondingCurveProgress: number;
    holders: number;
    logoColor: string;
    logoImage?: string;
    risk: {
        top10: number;
        dev: number;
        liquidity: number;
        insiders: number;
    };
    socials: {
        twitter: boolean;
        telegram: boolean;
        website: boolean;
    };
    misc: {
        comments: number;
        rating: number;
    }
}

export interface DisplaySettings {
    layout: {
        metricsSize: 'small' | 'large';
        quickBuySize: 'small' | 'large' | 'mega' | 'ultra';
        showSearchBar: boolean;
        noDecimals: boolean;
        showHiddenTokens: boolean;
        unhideOnMigrated: boolean;
        circleImages: boolean;
        progressBar: boolean;
        spacedTables: boolean;
    };
    extras: {
        quickBuyBehavior: 'nothing' | 'open_page' | 'open_tab';
        secondQuickBuy: boolean;
    };
}

export interface MarketState {
    tokens: Record<string, Token>;
    ui: {
        selectedTokenId: string | null;
        isSettingsOpen: boolean;
        displaySettings: DisplaySettings;
    };
}

export type Action =
    | { type: 'ADD_TOKEN'; payload: Token }
    | { type: 'UPDATE_PRICES'; payload: any[] }
    | { type: 'SET_SELECTED_TOKEN'; payload: string | null }
    | { type: 'TOGGLE_SETTINGS' }
    | { type: 'UPDATE_DISPLAY_SETTINGS'; payload: { category: string; key: string; value: any } };
