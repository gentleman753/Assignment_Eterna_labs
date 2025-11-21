import React, { useEffect } from 'react';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'info';

export interface Toast {
    id: string;
    message: string;
    type: ToastType;
}

interface ToastProps {
    toast: Toast;
    onClose: (id: string) => void;
}

const ToastItem = ({ toast, onClose }: ToastProps) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose(toast.id);
        }, 3000);

        return () => clearTimeout(timer);
    }, [toast.id, onClose]);

    const getIcon = () => {
        switch (toast.type) {
            case 'success': return <CheckCircle size={16} className="text-green-500" />;
            case 'error': return <AlertCircle size={16} className="text-red-500" />;
            default: return <Info size={16} className="text-blue-500" />;
        }
    };

    return (
        <div className="flex items-center gap-3 bg-[#18181b] border border-[#27272a] text-zinc-200 px-4 py-3 rounded-lg shadow-lg min-w-[300px] animate-in slide-in-from-right-full fade-in duration-300">
            {getIcon()}
            <span className="text-sm font-medium flex-1">{toast.message}</span>
            <button onClick={() => onClose(toast.id)} className="text-zinc-500 hover:text-zinc-300 transition-colors">
                <X size={14} />
            </button>
        </div>
    );
};

export const ToastContainer = ({ toasts, removeToast }: { toasts: Toast[], removeToast: (id: string) => void }) => {
    return (
        <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2 pointer-events-none">
            <div className="pointer-events-auto flex flex-col gap-2">
                {toasts.map(toast => (
                    <ToastItem key={toast.id} toast={toast} onClose={removeToast} />
                ))}
            </div>
        </div>
    );
};
