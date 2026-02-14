import { Clock, DollarSign, Globe, Lock, Zap, BarChart } from 'lucide-react';
import { motion } from 'framer-motion';

const ICON_MAP = {
    Zap, Globe, BarChart, DollarSign, Clock, Lock
};

const FEATURES = [
    {
        icon: 'Zap',
        title: 'Capital Efficiency',
        description: 'Control large contract values with a fraction of the capital. Understand the power and risk of leverage.'
    },
    {
        icon: 'Globe',
        title: '24/5 Global Access',
        description: 'Trade around the clock. Asian, European, and US sessions provide opportunities whenever you are ready.'
    },
    {
        icon: 'BarChart',
        title: 'Deep Liquidity',
        description: 'Execute large orders instantly in the most liquid markets in the world (ES, NQ, CL).'
    },
    {
        icon: 'DollarSign',
        title: 'Tax Advantages',
        description: 'Learn about the 60/40 tax rule for futures trading in the US and how it benefits active traders.'
    },
    {
        icon: 'Clock',
        title: 'No Pattern Day Trading',
        description: 'Forget the $25k rule. Futures accounts have no PDT restrictions, allowing you to trade freely.'
    },
    {
        icon: 'Lock',
        title: 'Regulated Market',
        description: 'Trade on a centralized, regulated exchange (CME Group). Transparent data, no hidden order flow.'
    }
];

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
};

export default function Features() {
    return (
        <div className="py-24 bg-[#020617] relative" id="features">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="text-3xl md:text-4xl font-bold mb-4"
                    >
                        Why Trade Futures?
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-slate-400 max-w-2xl mx-auto"
                    >
                        Futures offer unique advantages over stocks and crypto. We teach you how to leverage them professionally.
                    </motion.p>
                </div>

                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {FEATURES.map((feature, index) => {
                        const Icon = ICON_MAP[feature.icon];
                        return (
                            <motion.div
                                key={index}
                                variants={item}
                                className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-emerald-500/50 hover:bg-white/10 transition-all group"
                            >
                                <div className="w-12 h-12 rounded-lg bg-emerald-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                    <Icon className="h-6 w-6 text-emerald-400" />
                                </div>
                                <h3 className="text-xl font-semibold mb-2 text-white">{feature.title}</h3>
                                <p className="text-slate-400 leading-relaxed">
                                    {feature.description}
                                </p>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </div>
    );
}
