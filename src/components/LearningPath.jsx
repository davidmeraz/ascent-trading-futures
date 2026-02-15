import { motion } from 'framer-motion';
import { BookOpen, Skull, BrainCircuit, ArrowRight, Lock, Sprout, Rocket, Crown, CheckCircle, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getStorageValue } from '../hooks/useStorage';
import { COURSE_CONTENT_BY_LEVEL } from '../data/courseData';

const STEPS = [
    {
        level: "Phase 1",
        title: "The Foundation",
        subtitle: "Noob → Trader",
        description: "Your journey begins here. Master the mechanics of the market, understand leverage, and place your first trade without blowing up.",
        gradient: "from-emerald-500 to-green-600",
        bgVia: "via-[#051C15]",
        iconBg: "from-emerald-500 to-green-600",
        shadow: "shadow-emerald-500/20",
        textAccent: "text-emerald-400",
        borderAccent: "border-emerald-500/20",
        badgeBg: "bg-emerald-500/10",
        Icon: Sprout,
        levelKey: 'noob',
        status: "current",
        topics: ["Market Mechanics", "Risk Management 101", "Platform Mastery", "Basic Price Action"]
    },
    {
        level: "Phase 2",
        title: "The Consistency",
        subtitle: "Trader → Pro",
        description: "Stop gambling, start operating. Build a statistical edge, master your psychology, and scale your sizing.",
        gradient: "from-blue-400 to-indigo-600",
        bgVia: "via-[#0B0F1C]",
        iconBg: "from-blue-500 to-indigo-600",
        shadow: "shadow-blue-500/20",
        textAccent: "text-blue-400",
        borderAccent: "border-blue-500/20",
        badgeBg: "bg-blue-500/10",
        Icon: Rocket,
        levelKey: 'pro',
        status: "locked",
        topics: ["Volume Analysis", "Advanced Psychology", "Probability Models", "Trade Journaling"]
    },
    {
        level: "Phase 3",
        title: "The Edge",
        subtitle: "Pro → Expert",
        description: "Compete with the algorithms. Deep liquidity concepts, macro-economic hedging, and order flow dominance.",
        gradient: "from-red-500 to-amber-600",
        bgVia: "via-[#1C0B0B]",
        iconBg: "from-red-500 to-amber-600",
        shadow: "shadow-red-500/20",
        textAccent: "text-red-400",
        borderAccent: "border-red-500/20",
        badgeBg: "bg-red-500/10",
        Icon: Crown,
        levelKey: 'expert',
        status: "locked",
        topics: ["Order Flow / Level 2", "Algo Tracking", "Macro Correlations", "Portfolio Hedging"]
    }
];

export default function LearningPath() {
    return (
        <section className="py-28 bg-[#020617] relative overflow-hidden" id="learning-path">
            {/* Bg accent */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Section header */}
                <div className="text-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-400 text-xs font-medium uppercase tracking-wider mb-6"
                    >
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                        Learning Roadmap
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.05 }}
                        className="text-4xl md:text-5xl font-bold mb-5"
                    >
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-blue-400 to-red-400">
                            The Path to Mastery
                        </span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed"
                    >
                        Success isn't accidental. Follow our proven roadmap from your first trade to institutional competence.
                    </motion.p>
                </div>

                {/* Timeline connector */}
                <div className="relative">
                    <div className="hidden md:block absolute top-[28%] left-0 w-full h-px bg-gradient-to-r from-emerald-500/20 via-blue-500/20 to-red-500/20" />

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
                        {STEPS.map((step, index) => (
                            <div key={index} className="relative">
                                <Card step={step} index={index} />

                                {/* Mobile arrow */}
                                {index < STEPS.length - 1 && (
                                    <div className="md:hidden flex justify-center my-5 text-slate-700">
                                        <ArrowRight className="w-6 h-6 rotate-90" />
                                    </div>
                                )}

                                {/* Desktop arrow */}
                                {index < STEPS.length - 1 && (
                                    <div className="hidden md:block absolute top-[25%] -right-5 text-slate-700 z-20">
                                        <ArrowRight className="w-6 h-6" />
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
    const isPurchased = getStorageValue('course_purchased', false);

    // Check actual unlock status from localStorage
    const isLocked = (() => {
        if (step.levelKey === 'noob') {
            return !getStorageValue('noob_level_unlocked', false);
        }
        if (step.levelKey === 'pro') {
            return !getStorageValue('pro_level_unlocked', false);
        }
        if (step.levelKey === 'expert') {
            return !getStorageValue('expert_level_unlocked', false);
        }
        return true;
    })();
    const Icon = step.Icon;

    // Check level completion
    const isLevelCompleted = (() => {
        if (!isPurchased) return false;
        const levelContent = COURSE_CONTENT_BY_LEVEL[step.levelKey];
        if (!levelContent) return false;
        const allLessons = Object.values(levelContent).flatMap(m => m.lessons);
        if (allLessons.length === 0) return false;
        let completedLessons = [];
        try {
            completedLessons = JSON.parse(localStorage.getItem('completed_lessons')) || [];
        } catch { completedLessons = []; }
        return allLessons.every(l => completedLessons.includes(l.id));
    })();

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.15 }}
            className={`relative h-full rounded-2xl border border-white/[0.06] overflow-hidden ${isLocked ? 'opacity-60' : 'group hover:-translate-y-1'} transition-all duration-300`}
        >
            {/* Card background with colored via */}
            <div className={`absolute inset-0 bg-gradient-to-br from-slate-900 ${step.bgVia} to-slate-900`} />

            {/* Top glow line */}
            <div className={`absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent ${step.gradient.replace('from-', 'via-').split(' ')[0]}/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

            {/* Hover glow */}
            <div className={`absolute inset-0 bg-gradient-to-br ${step.gradient} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500`} />

            <div className="relative z-10 p-7 flex flex-col justify-between h-full">
                <div>
                    {/* Header row */}
                    <div className="flex items-center justify-between mb-7">
                        <span className="px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-white/5 border border-white/10 text-slate-400">
                            {step.level}
                        </span>
                        <div className={`p-3 rounded-xl bg-gradient-to-br ${step.iconBg} shadow-lg ${step.shadow} ${isLocked ? 'grayscale opacity-40' : ''}`}>
                            <Icon className="w-7 h-7 text-white" />
                        </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl font-bold text-white mb-2">{step.title}</h3>
                    <p className={`text-sm font-semibold ${step.textAccent} mb-5`}>
                        {step.subtitle}
                    </p>

                    <p className="text-slate-500 mb-7 leading-relaxed text-sm">
                        {step.description}
                    </p>

                    {/* Topics */}
                    <div className="space-y-2.5 mb-8">
                        {step.topics.map((topic, i) => (
                            <div key={i} className="flex items-center text-sm text-slate-400">
                                <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${step.gradient} mr-3 flex-shrink-0`} />
                                {topic}
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA */}
                <div className="mt-auto">
                    {isLocked ? (
                        <div className="w-full py-3.5 rounded-xl font-semibold text-sm text-slate-600 bg-white/[0.03] flex items-center justify-center gap-2 border border-white/[0.06] cursor-not-allowed">
                            <Lock className="w-4 h-4" />
                            Complete Previous Phase
                        </div>
                    ) : !isPurchased ? (
                        <Link to="/enrollment-success" className={`w-full py-3.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 border ${step.borderAccent} ${step.textAccent} ${step.badgeBg} hover:opacity-90 transition-all cursor-pointer`}>
                            Unlock Course
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    ) : isLevelCompleted ? (
                        <div className={`w-full py-3.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 ${step.badgeBg} ${step.textAccent} border ${step.borderAccent}`}>
                            <CheckCircle className="w-4 h-4" />
                            Level Completed
                        </div>
                    ) : (
                        <Link to="/learn" className={`w-full py-3.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 bg-white/[0.04] border border-white/[0.08] text-slate-400 hover:text-white hover:border-white/15 transition-all`}>
                            <Clock className="w-4 h-4" />
                            Level Pending
                        </Link>
                    )}
                </div>
            </div>
        </motion.div>
    );
}
