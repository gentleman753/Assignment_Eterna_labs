import React, { useEffect, useRef } from 'react';
import { Token } from '../../types';

const SimulatedChart = ({ token }: { token: Token }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    useEffect(() => {
        if (!canvasRef.current) return;
        const ctx = canvasRef.current.getContext('2d');
        if (!ctx) return;
        const candles = Array.from({ length: 40 }).map((_, i) => {
            const base = token.price;
            const variance = base * 0.2;
            const open = base + (Math.random() * variance - variance / 2);
            const close = base + (Math.random() * variance - variance / 2);
            const high = Math.max(open, close) + Math.random() * variance * 0.5;
            const low = Math.min(open, close) - Math.random() * variance * 0.5;
            return { open, close, high, low };
        });
        const width = canvasRef.current.width;
        const height = canvasRef.current.height;
        const candleWidth = (width / candles.length) * 0.8;
        const spacing = (width / candles.length) * 0.2;
        const minPrice = Math.min(...candles.map(c => c.low));
        const maxPrice = Math.max(...candles.map(c => c.high));
        const range = maxPrice - minPrice;
        const getY = (price: number) => height - ((price - minPrice) / range) * (height - 20) - 10;
        ctx.clearRect(0, 0, width, height);
        ctx.strokeStyle = '#27272a';
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        for (let i = 0; i < 5; i++) {
            const y = (height / 5) * i;
            ctx.moveTo(0, y);
            ctx.lineTo(width, y);
        }
        ctx.stroke();
        candles.forEach((c, i) => {
            const x = i * (candleWidth + spacing) + spacing;
            const yOpen = getY(c.open);
            const yClose = getY(c.close);
            const yHigh = getY(c.high);
            const yLow = getY(c.low);
            const isGreen = c.close >= c.open;
            ctx.fillStyle = isGreen ? '#00ff9d' : '#f43f5e';
            ctx.strokeStyle = isGreen ? '#00ff9d' : '#f43f5e';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(x + candleWidth / 2, yHigh);
            ctx.lineTo(x + candleWidth / 2, yLow);
            ctx.stroke();
            const candleHeight = Math.max(Math.abs(yClose - yOpen), 1);
            ctx.fillRect(x, Math.min(yOpen, yClose), candleWidth, candleHeight);
        });
    }, [token.price]);

    return (
        <div className="w-full h-64 bg-[#0b0b0f] relative border border-[#27272a] rounded-lg overflow-hidden">
            <canvas ref={canvasRef} width={600} height={256} className="w-full h-full" />
            <div className="absolute top-2 left-2 text-zinc-700 font-bold text-xs pointer-events-none">{token.ticker}USD 15m</div>
            <div className="absolute right-0 top-0 bottom-0 w-12 border-l border-[#27272a] bg-[#0b0b0f] flex flex-col justify-between py-2 text-[9px] text-zinc-500 px-1">
                <span>{(token.price * 1.2).toFixed(4)}</span>
                <span>{(token.price * 1.1).toFixed(4)}</span>
                <span>{(token.price).toFixed(4)}</span>
                <span>{(token.price * 0.9).toFixed(4)}</span>
                <span>{(token.price * 0.8).toFixed(4)}</span>
            </div>
        </div>
    );
};

export default SimulatedChart;
