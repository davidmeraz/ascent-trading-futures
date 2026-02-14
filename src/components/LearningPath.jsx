import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { BookOpen, Skull, BrainCircuit, ArrowRight, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';

const STEPS = [
    {
        level: "Phase 1",
        title: "The Foundation",
        subtitle: "Noob -> Trader",
        description: "Your journey begins here. Master the mechanics of the market, understand leverage, and place your first trade without blowing up.",
        color: "from-emerald-400 to-green-600",
        icon: <BookOpen className="w-8 h-8 text-white" />,
        shadow: "shadow-emerald-500/20",
        status: "current",
        topics: ["Market Mechanics", "Risk Management 101", "Platform Mastery", "Basic Price Action"]
    },
    {
        level: "Phase 2",
        title: "The Consistency",
        subtitle: "Trader -> Pro",
        description: "Stop gambling, start operating. Build a statistical edge, master your psychology, and scale your sizing.",
        color: "from-blue-400 to-indigo-600",
        icon: <BrainCircuit className="w-8 h-8 text-white" />,
        shadow: "shadow-blue-500/20",
        status: "locked",
        topics: ["Volume Analysis", "Advanced Psychology", "Probability Models", "Trade Journaling"]
    },
    {
        level: "Phase 3",
        title: "The Edge",
        subtitle: "Pro -> Institutional",
        description: "compete with the algorithms. Deep liquidity concepts, macro-economic hedging, and order flow dominance.",
        color: "from-rose-500 to-red-900",
        icon: <Skull className="w-8 h-8 text-white" />,
        shadow: "shadow-rose-500/20",
        status: "locked",
        topics: ["Order Flow / Level 2", "Algo Tracking", "Macro Correlations", "Portfolio Hedging"]
    }
];

export default function LearningPath() {
    return (
        <section className="py-24 bg-[#020617] relative overflow-hidden" id="learning-path">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-20">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-blue-500 to-purple-600"
                    >
                        The Path to Mastery
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-slate-400 text-lg max-w-2xl mx-auto"
                    >
                        Success isn't accidental. Follow our proven roadmap from your first trade to institutional competence.
                    </motion.p>
                </div>

                <div className="relative">
                    {/* Desktop Connector Line */}
                    <div className="hidden md:block absolute top-[28%] left-0 w-full h-1 bg-gradient-to-r from-emerald-500/30 via-blue-500/30 to-rose-500/30 -z-10" />

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
                        {STEPS.map((step, index) => (
                            <div key={index} className="relative">
                                <Card step={step} index={index} />

                                {/* Mobile Arrow connector for visual flow */}
                                {index < STEPS.length - 1 && (
                                    <div className="md:hidden flex justify-center my-4 text-slate-600">
                                        <ArrowRight className="w-8 h-8 rotate-90" />
                                    </div>
                                )}

                                {/* Desktop Arrow connector */}
                                {index < STEPS.length - 1 && (
                                    <div className="hidden md:block absolute top-[25%] -right-6 text-slate-700 z-20">
                                        <ArrowRight className="w-8 h-8" />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

function Card({ step, index }) {
    const isLocked = step.status === "locked";
    const isPurchased = localStorage.getItem('course_purchased') === 'true';

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className={`relative p-[1px] rounded-3xl overflow-hidden h-full ${isLocked ? 'opacity-70 contrast-75' : 'group hover:-translate-y-2'} transition-all duration-300`}
        >
            {/* Border Gradient */}
            <div className={`absolute inset-0 bg-gradient-to-br ${step.color} ${isLocked ? 'opacity-10' : 'opacity-20 group-hover:opacity-100'} transition-opacity duration-500`} />

            <div className="relative h-full bg-[#0B0F1C] rounded-[23px] p-8 flex flex-col justify-between">
                <div>
                    <div className="flex items-center justify-between mb-8">
                        <span className={`px-4 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-white/5 border border-white/10 text-white`}>
                            {step.level}
                        </span>
                        <div className={`p-3 rounded-xl bg-gradient-to-br ${step.color} shadow-lg ${step.shadow} ${isLocked ? 'grayscale opacity-50' : ''}`}>
                            {step.icon}
                        </div>
                    </div>

                    <h3 className="text-3xl font-bold text-white mb-2">{step.title}</h3>
                    <p className={`text-sm font-medium bg-gradient-to-r ${step.color} bg-clip-text text-transparent mb-6`}>
                        {step.subtitle}
                    </p>

                    <p className="text-slate-400 mb-8 leading-relaxed">
                        {step.description}
                    </p>

                    <div className="space-y-3 mb-8">
                        {step.topics.map((topic, i) => (
                            <div key={i} className="flex items-center text-sm text-slate-300">
                                <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${step.color} mr-3`} />
                                {topic}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-4">
                    {isLocked ? (
                        <div className="w-full py-4 rounded-xl font-bold text-slate-500 bg-white/5 flex items-center justify-center gap-2 border border-white/5 cursor-not-allowed">
                            <Lock className="w-4 h-4" />
                            Next Phase
                        </div>
                    ) : !isPurchased ? (
                        <Link to="/enrollment-success" className="w-full py-4 rounded-xl font-bold text-slate-400 bg-white/5 flex items-center justify-center gap-2 border border-white/5 hover:border-emerald-500/50 hover:text-emerald-400 transition-all cursor-pointer">
                            <Lock className="w-4 h-4" />
                            Unlock Course
                        </Link>
                    ) : (
                        <Link to="/learn/futures-origin" className={`w-full py-4 rounded-xl font-bold text-white bg-gradient-to-r ${step.color} opacity-90 hover:opacity-100 transition-opacity shadow-lg ${step.shadow} flex items-center justify-center gap-2`}>
                            Start Journey
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    )}
                </div>
            </div>
        </motion.div>
    );
}
