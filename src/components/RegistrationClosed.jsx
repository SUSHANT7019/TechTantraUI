import React from 'react';
import { Home, CalendarOff, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const RegistrationClosed = () => {
    return (
        <div className="min-h-screen relative overflow-hidden flex items-center justify-center">
            {/* Video Background - Reusing the consistent background */}
            <div className="fixed inset-0 z-0">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                >
                    <source src="https://res.cloudinary.com/dgx4bwlbo/video/upload/v1771039051/background_vopq9v.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
            </div>

            {/* Content Container */}
            <div className="relative z-10 container mx-auto px-4 max-w-2xl text-center">
                <div className="glass-panel p-8 md:p-12 rounded-3xl border border-white/10 shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)] animate-fade-in-up bg-black/20 backdrop-blur-md">

                    {/* Icon */}
                    <div className="mb-8 flex justify-center">
                        <div className="w-24 h-24 rounded-full bg-red-500/10 flex items-center justify-center border border-red-500/20 shadow-[0_0_30px_-5px_rgba(239,68,68,0.3)] animate-pulse-slow">
                            <CalendarOff className="w-12 h-12 text-red-400" />
                        </div>
                    </div>

                    {/* Heading */}
                    <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 font-outfit tracking-tight">
                        Registration <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-pink-600">Closed</span>
                    </h1>

                    {/* Message */}
                    <div className="space-y-4 mb-10">
                        <p className="text-xl text-gray-200 font-medium">
                            Thank you for your overwhelming response!
                        </p>
                        <p className="text-gray-400 max-w-lg mx-auto leading-relaxed">
                            We have reached maximum capacity for <b>TechTantra Hackthon 2K26</b>.
                            If you have already registered, please check your email for further instructions.
                        </p>
                    </div>

                    {/* Action Button */}
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 text-white font-bold text-lg hover:shadow-lg hover:shadow-blue-500/30 hover:-translate-y-1 transition-all duration-300 group"
                    >
                        <Home className="w-5 h-5 group-hover:scale-110 transition-transform" />
                        Back to Home
                    </Link>

                    {/* Footer Info */}
                    <div className="mt-8 pt-6 border-t border-white/5 mx-auto max-w-xs">
                        <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                            <AlertCircle className="w-4 h-4" />
                            <span>Contact on 8010472310 for further Query!</span>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default RegistrationClosed;
