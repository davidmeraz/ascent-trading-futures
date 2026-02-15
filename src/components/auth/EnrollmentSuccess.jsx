import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Check, Lock } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

import { useStorage } from '../../hooks/useStorage';

export default function EnrollmentSuccess() {
    const navigate = useNavigate();
    const [coursePurchased, setCoursePurchased] = useStorage('course_purchased', false);
    const [status, setStatus] = useState('idle'); // idle, holding, success
    const [progress, setProgress] = useState(0);
    const holdInterval = useRef(null);
    const startTime = useRef(null);

    useEffect(() => {
        if (coursePurchased) {
            navigate('/learn');
        }
    }, [navigate, coursePurchased]);

    // Cleanup interval on unmount to prevent memory leaks
    useEffect(() => {
        return () => clearInterval(holdInterval.current);
    }, []);



    const startHold = () => {
        if (status === 'success') return;
        setStatus('holding');
        startTime.current = Date.now();

        clearInterval(holdInterval.current);
        holdInterval.current = setInterval(() => {
            const elapsedTime = Date.now() - startTime.current;
            const newProgress = Math.min((elapsedTime / 2000) * 100, 100); // 2 seconds to fill

            setProgress(newProgress);

            if (newProgress >= 100) {
                clearInterval(holdInterval.current);
                completePurchase();
            }
        }, 16);
    };

    const endHold = () => {
        if (status === 'success') return;
        clearInterval(holdInterval.current);
        setStatus('idle');
        setProgress(0);
    };

    const completePurchase = () => {
        setStatus('processing');

        // Simulate real transaction processing
        setTimeout(() => {
            setStatus('success');
            setCoursePurchased(true);
            // Redirect after short delay
            setTimeout(() => {
                navigate('/learn');
            }, 1000);
        }, 2500);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#020617] overflow-hidden font-sans">
            {/* Ambient Background Effects */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[120px] mix-blend-screen" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-emerald-600/10 rounded-full blur-[100px] mix-blend-screen" />
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
            </div>

            <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className="relative max-w-md w-full bg-[#0B0F1C]/80 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-2xl shadow-black/50 overflow-hidden"
            >
                {/* Top decorative gradient line */}
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />

                {status === 'success' ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex flex-col items-center text-center py-10"
                    >
                        <motion.div
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ type: "spring", stiffness: 200, damping: 15 }}
                            className="w-24 h-24 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center mb-8 shadow-lg shadow-emerald-500/30 ring-4 ring-emerald-500/20"
                        >
                            <Check className="w-12 h-12 text-white stroke-[3]" />
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">Access Granted</h2>
                            <p className="text-slate-400 mb-8">Welcome to the inner circle.</p>

                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 text-emerald-400 text-sm font-medium border border-emerald-500/20 animate-pulse">
                                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                                Redirecting to Dashboard...
                            </div>
                        </motion.div>
                    </motion.div>
                ) : status === 'processing' ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex flex-col items-center text-center py-12"
                    >
                        {/* High-tech Spinner */}
                        <div className="relative w-20 h-20 mb-8">
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                                className="absolute inset-0 rounded-full border-4 border-emerald-500/20 border-t-emerald-500"
                            />
                            <motion.div
                                animate={{ rotate: -180 }}
                                transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                                className="absolute inset-2 rounded-full border-4 border-blue-500/20 border-b-blue-500"
                            />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <Lock className="w-6 h-6 text-emerald-400 animate-pulse" />
                            </div>
                        </div>

                        <h2 className="text-2xl font-bold text-white mb-3 tracking-tight">Processing Purchase...</h2>
                        <div className="flex flex-col gap-1 text-sm text-slate-400 font-mono">
                            <motion.span
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.5 }}
                            >
                                {">"} Verifying credentials...
                            </motion.span>
                            <motion.span
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 1.2 }}
                            >
                                {">"} Establishing secure connection...
                            </motion.span>
                        </div>
                    </motion.div>
                ) : (
                    <div className="flex flex-col items-center">
                        <div className="relative mb-6">
                            <div className="absolute inset-0 bg-emerald-500/20 blur-xl rounded-full" />
                            <div className="relative w-16 h-16 bg-[#161b2c] rounded-2xl flex items-center justify-center border border-white/10 shadow-xl">
                                <Lock className="w-7 h-7 text-emerald-400" />
                            </div>
                        </div>

                        <h1 className="text-2xl font-bold text-white mb-2 tracking-tight">Confirm Purchase</h1>
                        <p className="text-slate-400 text-sm mb-8 text-center max-w-[280px] leading-relaxed">
                            Secure your spot in the <span className="text-white font-medium">Futures Trading Masterclass</span>.
                        </p>

                        {/* Digital Receipt Styling */}
                        <div className="w-full bg-[#020617]/50 rounded-2xl p-5 border border-white/5 mb-8 relative group hover:border-white/10 transition-colors">
                            {/* Receipt perforations */}
                            <div className="absolute -bottom-2 left-0 right-0 h-4 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMTAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTEwIDAgMCAxMGgyMHoiIGZpbGw9IiMwQjBGMUMiIGZpbGwtb3BhY2l0eT0iMSIvPjwvc3ZnPg==')] bg-repeat-x opacity-0" /> {/* Hidden for cleaner look but kept conceptually */}

                            <div className="space-y-4">
                                <div className="flex justify-between items-center pb-4 border-b border-white/5 border-dashed">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                                            <Check className="w-5 h-5" />
                                        </div>
                                        <div className="text-left">
                                            <div className="text-white font-medium text-sm">Pro Membership</div>
                                            <div className="text-slate-500 text-xs text-left">Lifetime Access</div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-slate-400 text-xs line-through">$497.00</div>
                                        <div className="text-white font-bold">$0.00</div>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center text-xs">
                                    <span className="text-slate-500">Processing Fee</span>
                                    <span className="text-slate-400">Waived</span>
                                </div>
                                <div className="flex justify-between items-center pt-2">
                                    <span className="text-slate-300 font-medium">Total Due</span>
                                    <span className="text-emerald-400 font-bold text-xl tracking-tight">$0.00</span>
                                </div>
                            </div>
                        </div>

                        {/* Interactive Hold Button */}
                        <div className="w-full relative group">
                            <button
                                className="relative w-full h-14 rounded-xl overflow-hidden bg-[#1a2030] border border-white/10 group-hover:border-emerald-500/30 transition-all duration-300 shadow-lg shadow-black/20"
                                onMouseDown={startHold}
                                onMouseUp={endHold}
                                onMouseLeave={endHold}
                                onTouchStart={startHold}
                                onTouchEnd={endHold}
                            >
                                {/* Progress Fill */}
                                <motion.div
                                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-emerald-600 to-emerald-400"
                                    style={{ width: `${progress}%` }}
                                    transition={{ duration: 0 }}
                                />

                                {/* Button Content */}
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 gap-2.5">
                                    {progress > 0 && progress < 100 && (
                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    )}
                                    <span className={`font-bold tracking-wide text-sm uppercase transition-colors ${progress > 50 ? 'text-white shadow-sm' : 'text-slate-300'}`}>
                                        {progress > 0 ? "Confirming..." : "HOLD TO CONFIRM"}
                                    </span>
                                </div>
                            </button>

                            {/* Helper text */}
                            <p className="text-[11px] text-slate-500 mt-4 text-center select-none font-medium">
                                Secure SSL Encryption • Instant Access
                            </p>
                        </div>
                    </div>
                )}
            </motion.div>
        </div>
    );
}
