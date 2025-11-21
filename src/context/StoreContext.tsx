import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { MarketState, Action, Token } from '../types';
import { INITIAL_STATE } from '../constants';
import { Toast } from '../components/ui/Toast';

// Extended State Interface
interface AppState extends MarketState {
    ui: {
        selectedTokenId: string | null;
        isSettingsOpen: boolean;
        displaySettings: any;
        searchQuery: string;
        toasts: Toast[];
    }
}

// Extended Actions
type AppAction =
    | Action
    | { type: 'SET_SEARCH_QUERY', payload: string }
    | { type: 'ADD_TOAST', payload: Toast }
    | { type: 'REMOVE_TOAST', payload: string };

// Initial State with new fields
const EXTENDED_INITIAL_STATE: AppState = {
    ...INITIAL_STATE,
    ui: {
        ...INITIAL_STATE.ui,
        searchQuery: '',
        toasts: []
    }
};

// Reducer
const rootReducer = (state: AppState, action: AppAction): AppState => {
    switch (action.type) {
        case 'UPDATE_PRICES':
            const updatedTokens = { ...state.tokens };
            action.payload.forEach((update: any) => {
                if (updatedTokens[update.id]) {
                    updatedTokens[update.id] = {
                        ...updatedTokens[update.id],
                        marketCap: update.marketCap,
                        volume24h: update.volume24h,
                        bondingCurveProgress: update.bondingCurveProgress,
                        transactions: update.transactions
                    };
                }
            });
            return { ...state, tokens: updatedTokens };

        case 'ADD_TOKEN':
            return {
                ...state,
                tokens: { [action.payload.id]: action.payload, ...state.tokens }
            };

        case 'SET_SELECTED_TOKEN':
            return { ...state, ui: { ...state.ui, selectedTokenId: action.payload } };

        case 'TOGGLE_SETTINGS':
            return { ...state, ui: { ...state.ui, isSettingsOpen: !state.ui.isSettingsOpen } };

        case 'UPDATE_DISPLAY_SETTINGS':
            return {
                ...state,
                ui: {
                    ...state.ui,
                    displaySettings: {
                        ...state.ui.displaySettings,
                        [action.payload.category]: {
                            ...state.ui.displaySettings[action.payload.category],
                            [action.payload.key]: action.payload.value
                        }
                    }
                }
            };

        case 'SET_SEARCH_QUERY':
            return { ...state, ui: { ...state.ui, searchQuery: action.payload } };

        case 'ADD_TOAST':
            return { ...state, ui: { ...state.ui, toasts: [...state.ui.toasts, action.payload] } };

        case 'REMOVE_TOAST':
            return { ...state, ui: { ...state.ui, toasts: state.ui.toasts.filter(t => t.id !== action.payload) } };

        default:
            return state;
    }
};

// Actions
export const actions = {
    updatePrices: (updates: any[]) => ({ type: 'UPDATE_PRICES', payload: updates } as const),
    addToken: (token: Token) => ({ type: 'ADD_TOKEN', payload: token } as const),
    setSelectedToken: (id: string | null) => ({ type: 'SET_SELECTED_TOKEN', payload: id } as const),
    toggleSettings: () => ({ type: 'TOGGLE_SETTINGS' } as const),
    updateDisplaySettings: (category: string, key: string, value: any) => ({ type: 'UPDATE_DISPLAY_SETTINGS', payload: { category, key, value } } as const),
    setSearchQuery: (query: string) => ({ type: 'SET_SEARCH_QUERY', payload: query } as const),
    addToast: (message: string, type: 'success' | 'error' | 'info' = 'info') => ({
        type: 'ADD_TOAST',
        payload: { id: Math.random().toString(36).substr(2, 9), message, type }
    } as const),
    removeToast: (id: string) => ({ type: 'REMOVE_TOAST', payload: id } as const),
};

// Context
const StoreContext = createContext<{
    state: AppState;
    dispatch: React.Dispatch<AppAction>;
} | null>(null);

export const Provider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(rootReducer, EXTENDED_INITIAL_STATE);
    return <StoreContext.Provider value={{ state, dispatch }}>{children}</StoreContext.Provider>;
};

export const useAppDispatch = () => {
    const context = useContext(StoreContext);
    if (!context) throw new Error('useAppDispatch must be used within a Provider');
    return context.dispatch;
};

export const useAppSelector = <T,>(selector: (state: AppState) => T): T => {
    const context = useContext(StoreContext);
    if (!context) throw new Error('useAppSelector must be used within a Provider');
    return selector(context.state);
};
