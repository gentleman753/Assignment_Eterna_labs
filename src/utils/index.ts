import { Token, TokenStatus } from '../types';

export const formatK = (val: number, noDecimals = false) => {
    if (val === undefined || val === null || isNaN(val)) return '$0';
    if (val >= 1000000) return `$${(val / 1000000).toFixed(noDecimals ? 0 : 2)}M`;
    if (val >= 1000) return `$${(val / 1000).toFixed(noDecimals ? 0 : 1)}K`;
    return `$${val.toFixed(noDecimals ? 0 : 2)}`;
};

export const formatTimeAgo = (timestamp: number) => {
    const seconds = Math.floor((Date.now() - timestamp) / 1000);
    if (seconds < 60) return `${seconds}s`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m`;
    return `${Math.floor(minutes / 60)}h`;
};

export const generateRandomToken = (status: TokenStatus): Token => {
    const id = Math.random().toString(36).substr(2, 9);
    const tickers = ['NESSA', 'CHAD', 'MIA', 'Wubli', 'USD1', 'JEWLON', 'BigGuy', 'PENNY', 'MTXMAX', 'SHOE', 'TRUMP', 'PEPE'];
    const names = ['Nessa', 'Chad', 'MIA KHALIFA', 'Wubli', 'World Liberty Financial', 'JEWLON', 'Big Guy', 'The Penny', 'Multi-Tx Max', 'ShoeIndex 6900', 'TrumpWin', 'Pepe Coin'];
    const images = [
        'https://api.dicebear.com/9.x/avataaars/svg?seed=Nessa',
        'https://api.dicebear.com/9.x/avataaars/svg?seed=Chad',
        'https://api.dicebear.com/9.x/avataaars/svg?seed=Mia',
        'https://api.dicebear.com/9.x/avataaars/svg?seed=Wubli',
        'https://api.dicebear.com/9.x/avataaars/svg?seed=Usd1',
        'https://api.dicebear.com/9.x/avataaars/svg?seed=Jewlon',
        'https://api.dicebear.com/9.x/avataaars/svg?seed=BigGuy'
    ];

    const idx = Math.floor(Math.random() * tickers.length);
    const isNew = status === 'new';

    return {
        id,
        ticker: tickers[idx],
        name: names[idx],
        status,
        price: Math.random() * 0.01 + 0.0001,
        priceChange24h: (Math.random() * 40) - 10,
        marketCap: 3000 + Math.random() * 500000,
        volume24h: 1000 + Math.random() * 50000,
        transactions: Math.floor(Math.random() * 500),
        createdAt: Date.now() - Math.floor(Math.random() * (isNew ? 1000 * 60 * 2 : 1000 * 60 * 60)),
        bondingCurveProgress: status === 'migrated' ? 100 : (isNew ? Math.random() * 20 : 80 + Math.random() * 19),
        holders: Math.floor(Math.random() * 500),
        logoColor: `hsl(${Math.floor(Math.random() * 360)}, 70%, 50%)`,
        logoImage: images[Math.floor(Math.random() * images.length)],
        risk: {
            top10: Math.floor(Math.random() * 40),
            dev: Math.floor(Math.random() * 5),
            liquidity: Math.floor(Math.random() * 100),
            insiders: Math.floor(Math.random() * 10)
        },
        socials: {
            twitter: Math.random() > 0.3,
            telegram: Math.random() > 0.3,
            website: Math.random() > 0.5
        },
        misc: {
            comments: Math.floor(Math.random() * 50),
            rating: Math.floor(Math.random() * 100)
        }
    };
};
