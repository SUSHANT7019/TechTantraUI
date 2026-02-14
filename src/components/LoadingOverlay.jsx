import React from 'react';
import { Loader2 } from 'lucide-react';

export default function LoadingOverlay({ isLoading, message = "Loading..." }) {
    if (!isLoading) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <div className="flex flex-col items-center p-6 bg-gray-900/80 rounded-2xl border border-white/10 shadow-xl">
                <Loader2 className="w-10 h-10 text-cyan-400 animate-spin mb-4" />
                <p className="text-white font-medium">{message}</p>
            </div>
        </div>
    );
}
