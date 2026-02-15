import { Clock, DollarSign, Globe, Lock, Zap, BarChart } from 'lucide-react';
import { motion } from 'framer-motion';

const FEATURES = [
    {
        icon: Zap,
        title: 'Capital Efficiency',
        description: 'Control large contract values with a fraction of the capital. Understand the power and risk of leverage.',
        accent: 'emerald',
    },
    {
        icon: Globe,
        title: '24/5 Global Access',
        description: 'Trade around the clock. Asian, European, and US sessions provide opportunities whenever you are ready.',
        accent: 'blue',
    },
    {
        icon: BarChart,
        title: 'Deep Liquidity',
        description: 'Execute large orders instantly in the most liquid markets in the world (ES, NQ, CL).',
        accent: 'purple',
    },
    {
        icon: DollarSign,
        title: 'Tax Advantages',
        description: 'Learn about the 60/40 tax rule for futures trading in the US and how it benefits active traders.',
        accent: 'amber',
    },
    {
        icon: Clock,
        title: 'No Pattern Day Trading',
        description: 'Forget the $25k rule. Futures accounts have no PDT restrictions, allowing you to trade freely.',
        accent: 'cyan',
    },
    {
        icon: Lock,
        title: 'Regulated Market',
        description: 'Trade on a centralized, regulated exchange (CME Group). Transparent data, no hidden order flow.',
        accent: 'rose',
    }
];

const ACCENT_STYLES = {
    emerald: {
        iconBg: 'bg-emerald-500/10',
        iconColor: 'text-emerald-400',
        borderHover: 'hover:border-emerald-500/30',
        glowBg: 'bg-emerald-500/5',
        dot: 'bg-emerald-500',
    },
    blue: {
        iconBg: 'bg-blue-500/10',
        iconColor: 'text-blue-400',
        borderHover: 'hover:border-blue-500/30',
        glowBg: 'bg-blue-500/5',
        dot: 'bg-blue-500',
    },
    purple: {
        iconBg: 'bg-purple-500/10',
        iconColor: 'text-purple-400',
        borderHover: 'hover:border-purple-500/30',
        glowBg: 'bg-purple-500/5',
        dot: 'bg-purple-500',
    },
    amber: {
        iconBg: 'bg-amber-500/10',
        iconColor: 'text-amber-400',
        borderHover: 'hover:border-amber-500/30',
        glowBg: 'bg-amber-500/5',
        dot: 'bg-amber-500',
    },
    cyan: {
        iconBg: 'bg-cyan-500/10',
        iconColor: 'text-cyan-400',
        borderHover: 'hover:border-cyan-500/30',
        glowBg: 'bg-cyan-500/5',
        dot: 'bg-cyan-500',
    },
    rose: {
        iconBg: 'bg-rose-500/10',
        iconColor: 'text-rose-400',
        borderHover: 'hover:border-rose-500/30',
        glowBg: 'bg-rose-500/5',
        dot: 'bg-rose-500',
    },
};

export default function Features() {
    return (
        <section className="py-28 bg-[#020617] relative overflow-hidden" id="features">
            {/* Subtle bg glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-emerald-500/[0.03] rounded-full blur-[150px]" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Section header */}
                <div className="text-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-400 text-xs font-medium uppercase tracking-wider mb-6"
                    >
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        Why Futures
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.05 }}
                        className="text-4xl md:text-5xl font-bold mb-5 text-white"
                    >
                        The Unfair Advantage
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed"
                    >
                        Futures offer unique advantages over stocks and crypto. We teach you how to leverage them professionally.
                    </motion.p>
                </div>

                {/* Feature cards grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {FEATURES.map((feature, index) => {
                        const Icon = feature.icon;
                        const style = ACCENT_STYLES[feature.accent];

                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.08 }}
                                className={`group relative p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] ${style.borderHover} hover:bg-white/[0.04] transition-all duration-300 hover:-translate-y-0.5`}
                            >
                                {/* Hover glow */}
                                <div className={`absolute inset-0 ${style.glowBg} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl`} />

                                <div className="relative z-10">
                                    <div className={`w-12 h-12 rounded-xl ${style.iconBg} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                                        <Icon className={`h-6 w-6 ${style.iconColor}`} />
                                    </div>
                                    <h3 className="text-lg font-semibold mb-2.5 text-white group-hover:text-white/95 transition-colors">
                                        {feature.title}
                                    </h3>
                                    <p className="text-slate-500 text-sm leading-relaxed">
                                        {feature.description}
                                    </p>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
