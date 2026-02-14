import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CheckCircle, MessageCircle } from 'lucide-react';

export default function PaymentSuccess() {
    const location = useLocation();
    const { transactionId = "000000" } = location.state || {};

    return (
        <div className="min-h-screen relative flex items-center justify-center p-4 overflow-hidden pt-20">
            <div className="fixed inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-gray-900 to-black"></div>
            </div>

            <div className="relative z-10 w-full max-w-md animate-fade-in-up">
                <div className="glass-panel p-8 rounded-2xl border border-green-500/30 text-center shadow-2xl shadow-green-900/20">
                    <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6 ring-1 ring-green-400/50">
                        <CheckCircle className="w-10 h-10 text-green-400" />
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-3 font-outfit">Payment Submitted!</h2>
                    <p className="text-gray-300 mb-6">
                        Your transaction ID <span className="text-cyan-400 font-mono">{transactionId}</span> has been received.
                        We will verify it shortly and send a confirmation email and Token.
                    </p>

                    {/* WhatsApp Group Link */}
                    <div className="mb-8 p-4 bg-green-500/10 rounded-xl border border-green-500/20">
                        <p className="text-green-300 text-sm mb-3">Join our official WhatsApp group for updates:</p>
                        <a
                            href="https://chat.whatsapp.com/B4j1tWj4YRu36KATBeDiPq"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-green-600 hover:bg-green-500 text-white rounded-lg font-bold transition-all shadow-lg shadow-green-900/40"
                        >
                            <MessageCircle className="w-5 h-5" />
                            Join WhatsApp Group
                        </a>
                    </div>

                    <div className="space-y-3">
                        <Link
                            to="/register"
                            className="block w-full py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white rounded-xl font-medium transition-all shadow-lg hover:shadow-cyan-500/25"
                        >
                            Register Another Team
                        </Link>
                        <Link
                            to="/"
                            className="block w-full py-3 bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white rounded-xl font-medium transition-all"
                        >
                            Back to Home
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
