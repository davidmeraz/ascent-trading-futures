import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Check, Lock } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';
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

    // Confetti Effect trigger
    const triggerConfetti = () => {
        const duration = 3000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };
        const random = (min, max) => Math.random() * (max - min) + min;

        const interval = setInterval(() => {
            const timeLeft = animationEnd - Date.now();
            if (timeLeft <= 0) return clearInterval(interval);
            const particleCount = 50 * (timeLeft / duration);
            confetti({ ...defaults, particleCount, origin: { x: random(0.1, 0.3), y: Math.random() - 0.2 } });
            confetti({ ...defaults, particleCount, origin: { x: random(0.7, 0.9), y: Math.random() - 0.2 } });
        }, 250);
    };

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
        setStatus('success');
        setCoursePurchased(true);
        triggerConfetti();
        // Redirect after short delay
        setTimeout(() => {
            navigate('/learn');
        }, 2500);
    };

    return (
        <div className="fixed inset-0 z-50 bg-[#020617] flex items-center justify-center p-4">
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="max-w-md w-full bg-[#0B0F1C] border border-white/10 rounded-2xl p-8 relative overflow-hidden shadow-2xl"
            >
                {/* Background Glow */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-600"></div>

                {status === 'success' ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex flex-col items-center text-center py-8"
                    >
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 200, damping: 20 }}
                            className="w-24 h-24 bg-emerald-500 rounded-full flex items-center justify-center mb-6 shadow-lg shadow-emerald-500/50"
                        >
                            <Check className="w-12 h-12 text-white stroke-[3]" />
                        </motion.div>
                        <h2 className="text-3xl font-bold text-white mb-2">Purchase Successful!</h2>
                        <p className="text-emerald-400 font-medium mb-8">Access Granted</p>
                        <div className="text-slate-500 text-sm animate-pulse">
                            Redirecting to Dashboard...
                        </div>
                    </motion.div>
                ) : (
                    <div className="flex flex-col items-center">
                        <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mb-6 border border-white/5">
                            <Lock className="w-8 h-8 text-slate-400" />
                        </div>

                        <h1 className="text-2xl font-bold text-white mb-2">Confirm Enrollment</h1>
                        <p className="text-slate-400 text-sm mb-8 text-center">Secure your spot in the Futures Trading Masterclass.</p>

                        {/* Invoice */}
                        <div className="w-full bg-slate-900/50 rounded-xl p-4 border border-white/5 mb-8 space-y-3">
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-400">Product</span>
                                <span className="text-white font-medium">Masterclass Access</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-400">Price</span>
                                <span className="text-white line-through decoration-slate-600">$497.00</span>
                            </div>
                            <div className="flex justify-between text-sm border-t border-white/5 pt-3">
                                <span className="text-emerald-400 font-medium">Total Due</span>
                                <span className="text-emerald-400 font-bold text-lg">$0.00</span>
                            </div>
                        </div>

                        {/* Hold Button */}
                        <div
                            className="relative w-full h-14 rounded-xl overflow-hidden bg-slate-800 select-none cursor-pointer transform transition-transform active:scale-95 border border-white/10 hover:border-white/20"
                            onMouseDown={startHold}
                            onMouseUp={endHold}
                            onMouseLeave={endHold}
                            onTouchStart={startHold}
                            onTouchEnd={endHold}
                        >
                            {/* Filling Background */}
                            <motion.div
                                className="absolute top-0 left-0 h-full bg-emerald-600"
                                style={{ width: `${progress}%` }}
                                transition={{ duration: 0 }} // Direct control
                            />

                            {/* Text Content */}
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 gap-2">
                                <span className="font-bold text-white tracking-wide text-sm uppercase">
                                    {progress > 0 ? "HOLD TO CONFIRM..." : "HOLD TO BUY"}
                                </span>
                            </div>
                        </div>
                        <p className="text-[10px] text-slate-500 mt-4 text-center">
                            Press and hold button to complete secure checkout
                        </p>
                    </div>
                )}
            </motion.div>
        </div>
    );
}
