import { ArrowRight, Play, Shield, TrendingUp, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { getStorageValue } from '../hooks/useStorage';

// Animated grid background
function GridBackground() {
    return (
        <div className="absolute inset-0 -z-10 overflow-hidden">
            {/* Animated grid */}
            <div className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                    backgroundSize: '64px 64px',
                }}
            />

            {/* Radial glow center */}
            <motion.div
                animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.25, 0.15] }}
                transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] bg-emerald-500/20 rounded-full blur-[150px]"
            />
            <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
                transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
                className="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-blue-600/15 rounded-full blur-[130px]"
            />
            <motion.div
                animate={{ scale: [1.1, 1, 1.1], opacity: [0.08, 0.15, 0.08] }}
                transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 5 }}
                className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[120px]"
            />

            {/* Noise texture */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150" />

            {/* Top glow line */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent" />
        </div>
    );
}

// Floating stat badges
function FloatingBadge({ children, delay = 0, className = '' }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, delay }}
            className={`inline-flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-white/[0.04] border border-white/[0.08] backdrop-blur-sm text-sm ${className}`}
        >
            {children}
        </motion.div>
    );
}

export default function Hero() {
    const isPurchased = getStorageValue('course_purchased', false);

    return (
        <div className="relative overflow-hidden pt-28 pb-20 lg:pt-44 lg:pb-36 min-h-[90vh] flex items-center">
            <GridBackground />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
                <div className="text-center max-w-4xl mx-auto">
                    {/* Status pill */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium mb-10"
                    >
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </span>
                        Live Market Data • Trading Education
                    </motion.div>

                    {/* Main heading */}
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.1 }}
                        className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8 leading-[0.95]"
                    >
                        <span className="bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/40">
                            Master the Art of
                        </span>
                        <br />
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-emerald-300 to-blue-400">
                            Futures Trading
                        </span>
                    </motion.h1>

                    {/* Subtitle */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.25 }}
                        className="text-lg sm:text-xl text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed"
                    >
                        Professional education for serious traders. Learn to trade
                        <span className="text-white font-medium"> S&P 500</span>,
                        <span className="text-white font-medium"> Nasdaq</span>, and
                        <span className="text-white font-medium"> Crude Oil </span>
                        futures with institutional-grade strategies.
                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.35 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
                    >
                        <Link
                            to={isPurchased ? "/learn" : "/enrollment-success"}
                            className="group relative bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all flex items-center gap-2.5 shadow-2xl shadow-emerald-500/20 hover:shadow-emerald-500/40 hover:-translate-y-0.5"
                        >
                            {isPurchased ? "Continue Learning" : "Start Futures Course"}
                            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <button className="group px-8 py-4 rounded-xl text-lg font-semibold text-slate-300 border border-white/10 hover:border-white/20 hover:bg-white/5 transition-all flex items-center gap-2.5 hover:-translate-y-0.5">
                            <Play className="h-5 w-5 text-emerald-400 group-hover:text-emerald-300 transition-colors" />
                            Watch Preview
                        </button>
                    </motion.div>

                    {/* Trust badges */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                        className="flex flex-wrap justify-center gap-3 sm:gap-5"
                    >
                        <FloatingBadge delay={0.55}>
                            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                                <TrendingUp className="w-4 h-4 text-emerald-400" />
                            </div>
                            <div className="text-left">
                                <div className="text-white font-semibold text-sm">ES • NQ • CL</div>
                                <div className="text-slate-500 text-xs">Major Futures</div>
                            </div>
                        </FloatingBadge>

                        <FloatingBadge delay={0.65}>
                            <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                                <Shield className="w-4 h-4 text-blue-400" />
                            </div>
                            <div className="text-left">
                                <div className="text-white font-semibold text-sm">CME Regulated</div>
                                <div className="text-slate-500 text-xs">Transparent Markets</div>
                            </div>
                        </FloatingBadge>

                        <FloatingBadge delay={0.75}>
                            <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center">
                                <Zap className="w-4 h-4 text-purple-400" />
                            </div>
                            <div className="text-left">
                                <div className="text-white font-semibold text-sm">3 Levels</div>
                                <div className="text-slate-500 text-xs">Noob → Expert</div>
                            </div>
                        </FloatingBadge>
                    </motion.div>
                </div>
            </div>

            {/* Bottom fade */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#020617] to-transparent z-10" />
        </div>
    );
}
