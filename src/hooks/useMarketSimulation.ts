import { useEffect, useRef } from 'react';
import { useAppDispatch, actions } from '../context/StoreContext';
import { generateRandomToken } from '../utils';
import { Token } from '../types';

export const useMarketSimulation = () => {
    const dispatch = useAppDispatch();
    const tokensRef = useRef<string[]>([]);

    useEffect(() => {
        const initialTokens = Array.from({ length: 21 }).map(() => {
            const rand = Math.random();
            const status = rand < 0.33 ? 'new' : rand < 0.66 ? 'final-stretch' : 'migrated';
            return generateRandomToken(status);
        });
        initialTokens.forEach(t => {
            tokensRef.current.push(t.id);
            dispatch(actions.addToken(t));
        });
    }, [dispatch]);

    useEffect(() => {
        const interval = setInterval(() => {
            const updates: any[] = [];
            const numUpdates = Math.floor(Math.random() * 12) + 4;

            for (let i = 0; i < numUpdates; i++) {
                if (tokensRef.current.length > 0) {
                    const randomId = tokensRef.current[Math.floor(Math.random() * tokensRef.current.length)];
                    updates.push({
                        id: randomId,
                        volume24h: Math.random() * 100000,
                        transactions: Math.floor(Math.random() * 5000),
                        price: Math.random() * 0.01 + 0.0001
                    });
                }
            }
            if (updates.length > 0) dispatch(actions.updatePrices(updates));

            if (Math.random() > 0.70) {
                const newToken = generateRandomToken('new');
                tokensRef.current.push(newToken.id);
                dispatch(actions.addToken(newToken));
            }
        }, 250);
        return () => clearInterval(interval);
    }, [dispatch]);
};
