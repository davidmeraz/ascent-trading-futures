import { useState, useRef, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, Book, CheckCircle, Circle, Lock, ChevronDown, Rocket, Sparkles, Sprout, Crown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Circular progress indicator for each module in the dashboard.
 */
function DashboardProgressCircle({ percentage, size = 48, strokeWidth = 4, colorClass: propColorClass }) {
    const r = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * r;
    const offset = circumference - (percentage / 100) * circumference;
    const center = size / 2;

    const colorClass = propColorClass || (percentage === 100
        ? 'text-emerald-400'
        : percentage >= 50
            ? 'text-blue-400'
            : 'text-amber-400');

    return (
        <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
            <svg className="transform -rotate-90" width={size} height={size}>
                <circle
                    cx={center}
                    cy={center}
                    r={r}
                    stroke="currentColor"
                    strokeWidth={strokeWidth}
                    fill="transparent"
                    className="text-slate-700/40"
                />
                <circle
                    cx={center}
                    cy={center}
                    r={r}
                    stroke="currentColor"
                    strokeWidth={strokeWidth}
                    fill="transparent"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                    className={`${colorClass} transition-all duration-700 ease-out`}
                />
            </svg>
            <span className={`absolute text-xs font-bold ${colorClass}`}>
                {percentage}%
            </span>
        </div>
    );
}

/**
 * Dashboard view shown at /learn (index route).
 * Extracted from CourseLayout to keep components focused.
 */
export default function CourseDashboard({ completedLessons = [], progressPercentage = 0, isLessonLocked, isLessonCompleted, getModuleProgress, onProUnlock, onExpertUnlock, onNoobUnlock, currentLevel = 'noob', levelContent = {} }) {
    // Dashboard-specific collapse state — all collapsed by default
    const [collapsedModules, setCollapsedModules] = useState(() =>
        levelContent ? Object.keys(levelContent).reduce((acc, key) => ({ ...acc, [key]: true }), {}) : {}
    );
    const [selectedModule, setSelectedModule] = useState(null);

    if (!levelContent || Object.keys(levelContent).length === 0) {
        return <div className="flex h-full items-center justify-center text-slate-500">Loading modules for level: {currentLevel}...</div>;
    }

    // Hold to unlock state
    const [unlockProgress, setUnlockProgress] = useState(0);
    const [proUnlocked, setProUnlocked] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem('pro_level_unlocked')) || false;
        } catch { return false; }
    });
    const holdInterval = useRef(null);
    const startTime = useRef(null);

    const rocketRef = useRef(null);



    // Expert Hold State
    const [expertUnlockProgress, setExpertUnlockProgress] = useState(0);
    const [expertUnlocked, setExpertUnlocked] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem('expert_level_unlocked')) || false;
        } catch { return false; }
    });
    const expertHoldInterval = useRef(null);
    const expertStartTime = useRef(null);
    const crownRef = useRef(null);

    // Cleanup on unmount
    useEffect(() => {
        return () => clearInterval(holdInterval.current);
    }, []);

    // Check if all Noob lessons are completed (used for unlock section)
    const allLessons = Object.values(levelContent).flatMap(m => m.lessons);
    const allCompleted = allLessons.length > 0 && allLessons.every(l => completedLessons.includes(l.id));

    const toggleModule = (key) => {
        setCollapsedModules(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const startHold = () => {
        startTime.current = Date.now();
        clearInterval(holdInterval.current);

        holdInterval.current = setInterval(() => {
            const elapsedTime = Date.now() - startTime.current;
            const newProgress = Math.min((elapsedTime / 2000) * 100, 100);
            setUnlockProgress(newProgress);

            if (newProgress >= 100) {
                clearInterval(holdInterval.current);
                handleUnlock();
            }
        }, 16);
    };

    const endHold = () => {
        clearInterval(holdInterval.current);
        setUnlockProgress(0);
    };

    const handleUnlock = () => {
        setProUnlocked(true);
        localStorage.setItem('pro_level_unlocked', JSON.stringify(true));

        // Get rocket position and pass it up for the fly animation
        if (rocketRef.current && onProUnlock) {
            const rect = rocketRef.current.getBoundingClientRect();
            onProUnlock({
                x: rect.left + rect.width / 2,
                y: rect.top + rect.height / 2,
            });
        }
    };



    // Expert Hold Handlers
    const startExpertHold = () => {
        expertStartTime.current = Date.now();
        clearInterval(expertHoldInterval.current);

        expertHoldInterval.current = setInterval(() => {
            const elapsedTime = Date.now() - expertStartTime.current;
            const newProgress = Math.min((elapsedTime / 2000) * 100, 100);
            setExpertUnlockProgress(newProgress);

            if (newProgress >= 100) {
                clearInterval(expertHoldInterval.current);
                handleExpertUnlock();
            }
        }, 16);
    };

    const endExpertHold = () => {
        clearInterval(expertHoldInterval.current);
        setExpertUnlockProgress(0);
    };

    const handleExpertUnlock = () => {
        setExpertUnlocked(true);
        localStorage.setItem('expert_level_unlocked', JSON.stringify(true));

        if (crownRef.current && onExpertUnlock) {
            const rect = crownRef.current.getBoundingClientRect();
            onExpertUnlock({
                x: rect.left + rect.width / 2,
                y: rect.top + rect.height / 2,
            });
        }
    };

    // Theme configuration
    const theme = (() => {
        const colors = {
            none: {
                primary: 'text-slate-400',
                borderHover: 'hover:border-slate-500/30',
                progressBar: 'bg-slate-500',
                progressBarBg: 'bg-slate-500/20',
                icon: 'text-slate-500',
                badgeBg: 'bg-slate-500/10',
                badgeText: 'text-slate-500',
                lockedIcon: 'text-slate-600',
                lockedText: 'text-slate-600',
                shimmer: 'from-slate-500/5',
            },
            noob: {
                primary: 'text-emerald-400',
                borderHover: 'hover:border-emerald-500/30',
                progressBar: 'bg-emerald-500',
                progressBarBg: 'bg-emerald-500/20',
                icon: 'text-emerald-500',
                badgeBg: 'bg-emerald-500/10',
                badgeText: 'text-emerald-500',
                lockedIcon: 'text-slate-600',
                lockedText: 'text-slate-600',
                shimmer: 'from-emerald-500/5',
            },
            pro: {
                primary: 'text-blue-400',
                borderHover: 'hover:border-blue-500/30',
                progressBar: 'bg-blue-500',
                progressBarBg: 'bg-blue-500/20',
                icon: 'text-blue-500',
                badgeBg: 'bg-blue-500/10',
                badgeText: 'text-blue-500',
                lockedIcon: 'text-slate-500',
                lockedText: 'text-slate-500',
                shimmer: 'from-blue-500/5',
            },
            expert: {
                primary: 'text-red-400',
                borderHover: 'hover:border-red-500/30',
                progressBar: 'bg-red-500',
                progressBarBg: 'bg-red-500/20',
                icon: 'text-red-500',
                badgeBg: 'bg-red-500/10',
                badgeText: 'text-red-500',
                lockedIcon: 'text-slate-500',
                lockedText: 'text-slate-500',
                shimmer: 'from-red-500/5',
            }
        };
        return colors[currentLevel] || colors.none || colors.noob;
    })();

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 h-full">
            {/* Dashboard Content */}
            <>

                {/* 3 Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    {/* Card 1: Level */}
                    <div className={`p-6 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 border border-white/5 relative overflow-hidden group ${theme.borderHover} transition-all duration-500 hover:shadow-lg hover:shadow-black/20 hover:-translate-y-1`}>
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity duration-500">
                            <TrendingUp size={64} />
                        </div>
                        <h3 className="text-slate-400 text-sm font-medium uppercase tracking-wider mb-2 transition-colors group-hover:text-slate-300">Current Level</h3>
                        <div className="text-3xl font-bold text-white mb-1">{currentLevel === 'pro' ? 'Pro Trader' : currentLevel === 'expert' ? 'Expert Trader' : currentLevel === 'none' ? 'Unranked' : 'Noob Trader'}</div>
                        <div className={`${theme.primary} text-xs font-semibold`}>
                            {currentLevel === 'pro' ? 'Phase 2 Unlocked!' : currentLevel === 'expert' ? 'Mastery Achieved' : currentLevel === 'none' ? 'Get Started' : 'Phase 1 in progress'}
                        </div>
                    </div>

                    {/* Card 2: Progress */}
                    <div className={`p-6 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 border border-white/5 relative overflow-hidden group ${theme.borderHover} transition-all duration-500 hover:shadow-lg hover:shadow-black/20 hover:-translate-y-1`}>
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity duration-500">
                            <Book size={64} />
                        </div>
                        <h3 className="text-slate-400 text-sm font-medium uppercase tracking-wider mb-2 transition-colors group-hover:text-slate-300">Course Progress</h3>
                        <div className="text-3xl font-bold text-white mb-1">{progressPercentage}%</div>
                        <div className="w-full bg-slate-700/50 h-1.5 rounded-full mt-2 overflow-hidden">
                            <div className={`${theme.progressBar} h-full rounded-full transition-all duration-1000 ease-out`} style={{ width: `${progressPercentage}%` }}></div>
                        </div>
                    </div>

                    {/* Card 3: XP / Quizzes */}
                    <div className={`p-6 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 border border-white/5 relative overflow-hidden group ${theme.borderHover} transition-all duration-500 hover:shadow-lg hover:shadow-black/20 hover:-translate-y-1`}>
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity duration-500">
                            <CheckCircle size={64} />
                        </div>
                        <h3 className="text-slate-400 text-sm font-medium uppercase tracking-wider mb-2 transition-colors group-hover:text-slate-300">Lessons Mastered</h3>
                        <div className="text-3xl font-bold text-white mb-1">{completedLessons.length} XP</div>
                        <div className={`${theme.primary} text-xs font-semibold`}>Keep pushing!</div>
                    </div>
                </div>

                <h2 className="text-xl font-semibold text-white mb-6">Continue Learning</h2>
                {/* Shows lessons grouped by module — each collapsible */}
                {/* Grid layout for modules */}
                {/* Grid layout for modules */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                    {Object.entries(levelContent).map(([key, module]) => {
                        const modProgress = getModuleProgress ? getModuleProgress(key) : { completed: 0, total: module.lessons.length, percentage: 0 };

                        return (
                            <div key={key} className={`flex flex-col bg-slate-900/40 border border-white/5 rounded-2xl overflow-hidden transition-all duration-300 ${theme.borderHover} group`}>

                                {/* Module Card Header (Always Visible) - Now opens modal */}
                                <div
                                    onClick={() => setSelectedModule(key)}
                                    className="p-6 cursor-pointer relative overflow-hidden flex-1 flex flex-col justify-between"
                                >
                                    {/* Background decorative gradient */}
                                    <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${theme.shimmer} blur-2xl rounded-full -translate-y-1/2 translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                                    <div className="flex items-start justify-between relative z-10 mb-4">
                                        <div className="flex-1 pr-4">
                                            <div className="flex items-center gap-2 mb-3">
                                                <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-md border ${theme.badgeBg} ${theme.badgeText} border-white/5`}>
                                                    Module {key.split('-').pop()}
                                                </span>
                                                {modProgress.percentage === 100 && (
                                                    <span className={`${theme.badgeText} ${theme.badgeBg} px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wide flex items-center gap-1`}>
                                                        <CheckCircle size={10} className={theme.badgeText} /> Completed
                                                    </span>
                                                )}
                                            </div>

                                            <h3 className="text-xl font-bold text-white mb-2 leading-tight group-hover:text-slate-100 transition-colors">
                                                {module.title}
                                            </h3>
                                        </div>

                                        {/* Progress Circle visual */}
                                        <div className="shrink-0 pt-1">
                                            <DashboardProgressCircle
                                                percentage={modProgress.percentage}
                                                size={60}
                                                strokeWidth={5}
                                                colorClass={theme.primary}
                                            />
                                        </div>
                                    </div>

                                    <div className="relative z-10 mt-auto">
                                        <div className="flex items-center gap-2 text-xs text-slate-400 font-medium mb-3">
                                            <Book size={14} className={theme.icon} />
                                            {modProgress.completed}/{modProgress.total} Lessons
                                        </div>

                                        <button className={`w-full py-2.5 rounded-lg bg-white/5 border border-white/5 text-xs text-slate-300 font-bold uppercase tracking-wider transition-all hover:bg-white/10 group-active:scale-[0.98] flex items-center justify-center gap-2`}>
                                            Explore Module <ChevronDown size={14} className="-rotate-90" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Sub-menu Modal for Lessons Grid */}
                <AnimatePresence>
                    {selectedModule && levelContent[selectedModule] && (
                        <>
                            {/* Backdrop */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setSelectedModule(null)}
                                className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50"
                            />

                            {/* Modal Content */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                                className="fixed inset-0 z-50 flex items-center justify-center p-4"
                                onClick={(e) => {
                                    if (e.target === e.currentTarget) setSelectedModule(null);
                                }}
                            >
                                <div className="bg-[#0B0F1C] border border-white/10 w-full max-w-4xl max-h-[85vh] rounded-2xl shadow-2xl flex flex-col relative overflow-hidden">

                                    {/* Modal Header */}
                                    <div className="p-6 border-b border-white/5 flex items-start justify-between bg-slate-900/50">
                                        <div>
                                            <h2 className="text-2xl font-bold text-white mb-1">
                                                {levelContent[selectedModule].title}
                                            </h2>
                                            <p className="text-slate-400 text-sm">Select a lesson to begin learning.</p>
                                        </div>
                                        <button
                                            onClick={() => setSelectedModule(null)}
                                            className="p-2 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                                        </button>
                                    </div>

                                    {/* Modal Body - Grid of Lessons */}
                                    <div className="p-6 overflow-y-auto">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                            {levelContent[selectedModule].lessons.map((lesson, index) => (
                                                <Link
                                                    key={lesson.id}
                                                    to={`/learn/${lesson.id}`}
                                                    onClick={() => setSelectedModule(null)} // Close on select? or keep open? Usually close.
                                                    className={`
                                                        relative group flex flex-col p-5 rounded-xl border transition-all duration-300 h-full
                                                        ${isLessonCompleted(lesson.id)
                                                            ? `${theme.badgeBg} ${theme.completedBorder} hover:border-${theme.accent}-500/40`
                                                            : isLessonLocked(lesson.id)
                                                                ? 'bg-slate-900/20 border-white/5 opacity-50 cursor-not-allowed grayscale'
                                                                : `bg-slate-800/40 border-white/10 ${theme.borderHover} hover:bg-slate-800 hover:-translate-y-1 hover:shadow-xl`
                                                        }
                                                    `}
                                                    style={isLessonLocked(lesson.id) ? { pointerEvents: 'none' } : {}}
                                                >
                                                    {/* Top status line */}
                                                    <div className="flex items-center justify-between mb-4">
                                                        <span className={`text-xs font-bold uppercase tracking-wider opacity-60 ${isLessonCompleted(lesson.id) ? theme.primary : 'text-slate-400'}`}>
                                                            Lesson {index + 1}
                                                        </span>
                                                        {isLessonCompleted(lesson.id) ? (
                                                            <div className={`${theme.badgeBg} p-1.5 rounded-full`}>
                                                                <CheckCircle size={14} className={theme.primary} />
                                                            </div>
                                                        ) : isLessonLocked(lesson.id) ? (
                                                            <Lock size={14} className="text-slate-600" />
                                                        ) : (
                                                            <div className={`p-1.5 rounded-full bg-white/5 text-slate-400 group-hover:${theme.primary} transition-colors`}>
                                                                <Circle size={14} />
                                                            </div>
                                                        )}
                                                    </div>

                                                    {/* Title */}
                                                    <h3 className={`text-sm font-bold mb-2 leading-snug flex-1 ${isLessonCompleted(lesson.id) ? theme.light :
                                                        isLessonLocked(lesson.id) ? 'text-slate-500' : 'text-slate-200 group-hover:text-white'
                                                        }`}>
                                                        {lesson.title}
                                                    </h3>

                                                    {/* Action Line (only active/completed) */}
                                                    {!isLessonLocked(lesson.id) && (
                                                        <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between text-xs font-medium">
                                                            <span className={isLessonCompleted(lesson.id) ? theme.primary : 'text-slate-400 group-hover:text-white transition-colors'}>
                                                                {isLessonCompleted(lesson.id) ? 'Review Lesson' : 'Start Lesson'}
                                                            </span>
                                                            <ChevronDown size={14} className={`-rotate-90 transition-transform duration-300 group-hover:translate-x-1 ${isLessonCompleted(lesson.id) ? theme.primary : theme.primary}`} />
                                                        </div>
                                                    )}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>

                {/* ═══════════════════════════════════════════════════════
            HOLD TO UNLOCK PRO — appears when all Noob lessons are completed
            ═══════════════════════════════════════════════════════ */}
                {currentLevel === 'noob' && allCompleted && (
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                        className="mt-16 mb-8"
                    >
                        <div className={`relative rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900/90 via-slate-900/50 to-slate-900/90 overflow-hidden group ${theme.borderHover} transition-all duration-500`}>
                            {/* Animated background glow - Page Style Match (Emerald) */}
                            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-3xl animate-pulse" />
                                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />
                                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/10 to-transparent" />
                            </div>

                            <div className="relative z-10 flex flex-col items-center text-center py-12 px-8">
                                {/* Badge / Achievement */}
                                <motion.div
                                    ref={rocketRef}
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.3 }}
                                    className="mb-8"
                                >
                                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-emerald-900/50 to-slate-900 border border-emerald-500/30 flex items-center justify-center shadow-[0_0_30px_-10px_rgba(16,185,129,0.3)] relative group-hover:shadow-[0_0_50px_-10px_rgba(16,185,129,0.5)] transition-shadow duration-500">
                                        <div className="absolute inset-0 rounded-full border border-emerald-400/20 animate-[spin_10s_linear_infinite]" />
                                        <Rocket size={40} className="text-emerald-400 drop-shadow-lg" />
                                    </div>
                                </motion.div>

                                {/* Hold to Unlock button or Unlocked state */}
                                {proUnlocked ? (
                                    <motion.div
                                        initial={{ scale: 0.8, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        className="text-center"
                                    >
                                        <div className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-bold text-lg shadow-lg shadow-emerald-500/5">
                                            <CheckCircle size={24} />
                                            Pro Level Unlocked!
                                        </div>
                                        <p className="text-slate-500 text-sm mt-4">Welcome to the professional.</p>
                                    </motion.div>
                                ) : (
                                    <div className="relative">
                                        {/* Outer glow ring */}
                                        <div className={`absolute -inset-1 rounded-2xl transition-all duration-300 ${unlockProgress > 0
                                            ? 'bg-gradient-to-r from-emerald-500/50 to-blue-500/50 blur-md'
                                            : 'bg-transparent'
                                            }`} />

                                        <button
                                            onMouseDown={startHold}
                                            onMouseUp={endHold}
                                            onMouseLeave={endHold}
                                            onTouchStart={startHold}
                                            onTouchEnd={endHold}
                                            className="relative w-72 h-14 rounded-xl bg-[#0B1221] border border-emerald-500/30 font-bold text-white overflow-hidden select-none group hover:border-emerald-400/50 transition-colors cursor-pointer"
                                        >
                                            {/* Progress fill - Gradient to Next Level (Blue) */}
                                            <div
                                                className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-blue-600 transition-none opacity-90"
                                                style={{ width: `${unlockProgress}%` }}
                                            />

                                            <span className="relative z-10 flex items-center justify-center gap-3 text-[15px] tracking-wide uppercase">
                                                <Rocket size={18} className={`${unlockProgress > 0 ? 'animate-bounce text-white' : 'text-emerald-500'}`} />
                                                <span className={unlockProgress > 0 ? 'text-white' : 'text-slate-200'}>
                                                    {unlockProgress > 0 ? `${Math.round(unlockProgress)}%` : 'Hold to Unlock Pro'}
                                                </span>
                                            </span>
                                        </button>

                                        {/* Helper text */}
                                        <p className="text-slate-500 text-xs mt-4 text-center font-medium opacity-60">
                                            Hold button for 2 seconds
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* ═══════════════════════════════════════════════════════
            HOLD TO UNLOCK EXPERT — appears when all Pro lessons are completed
            ═══════════════════════════════════════════════════════ */}
                {currentLevel === 'pro' && allCompleted && (
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                        className="mt-16 mb-8"
                    >
                        <div className={`relative rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900/90 via-slate-900/50 to-slate-900/90 overflow-hidden group ${theme.borderHover} transition-all duration-500`}>
                            {/* Animated background glow - Page Style Match (Blue) */}
                            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-3xl animate-pulse" />
                                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
                                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/10 to-transparent" />
                            </div>

                            <div className="relative z-10 flex flex-col items-center text-center py-12 px-8">
                                {/* Badge / Achievement */}
                                <motion.div
                                    ref={crownRef}
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.3 }}
                                    className="mb-8"
                                >
                                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-900/50 to-slate-900 border border-blue-500/30 flex items-center justify-center shadow-[0_0_30px_-10px_rgba(59,130,246,0.3)] relative group-hover:shadow-[0_0_50px_-10px_rgba(59,130,246,0.5)] transition-shadow duration-500">
                                        <div className="absolute inset-0 rounded-full border border-blue-400/20 animate-[spin_10s_linear_infinite]" />
                                        <Crown size={40} className="text-blue-400 drop-shadow-lg" />
                                    </div>
                                </motion.div>

                                {/* Hold to Unlock button or Unlocked state */}
                                {expertUnlocked ? (
                                    <motion.div
                                        initial={{ scale: 0.8, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        className="text-center"
                                    >
                                        <div className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 font-bold text-lg shadow-lg shadow-blue-500/5">
                                            <CheckCircle size={24} />
                                            Expert Level Unlocked!
                                        </div>
                                        <p className="text-slate-500 text-sm mt-4">Welcome to the elite.</p>
                                    </motion.div>
                                ) : (
                                    <div className="relative">
                                        {/* Outer glow ring */}
                                        <div className={`absolute -inset-1 rounded-2xl transition-all duration-300 ${expertUnlockProgress > 0
                                            ? 'bg-gradient-to-r from-blue-500/50 to-red-500/50 blur-md'
                                            : 'bg-transparent'
                                            }`} />

                                        <button
                                            onMouseDown={startExpertHold}
                                            onMouseUp={endExpertHold}
                                            onMouseLeave={endExpertHold}
                                            onTouchStart={startExpertHold}
                                            onTouchEnd={endExpertHold}
                                            className="relative w-72 h-14 rounded-xl bg-[#0B1221] border border-blue-500/30 font-bold text-white overflow-hidden select-none group hover:border-blue-400/50 transition-colors cursor-pointer"
                                        >
                                            {/* Progress fill - Gradient to Next Level (Red) */}
                                            <div
                                                className="absolute inset-0 bg-gradient-to-r from-blue-600 to-red-600 transition-none opacity-90"
                                                style={{ width: `${expertUnlockProgress}%` }}
                                            />

                                            <span className="relative z-10 flex items-center justify-center gap-3 text-[15px] tracking-wide uppercase">
                                                <Crown size={18} className={`${expertUnlockProgress > 0 ? 'animate-bounce text-white' : 'text-blue-500'}`} />
                                                <span className={expertUnlockProgress > 0 ? 'text-white' : 'text-slate-200'}>
                                                    {expertUnlockProgress > 0 ? `${Math.round(expertUnlockProgress)}%` : 'Hold to Unlock Expert'}
                                                </span>
                                            </span>
                                        </button>

                                        {/* Helper text */}
                                        <p className="text-slate-500 text-xs mt-4 text-center font-medium opacity-60">
                                            Hold button for 2 seconds
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </>
        </div>
    );
}
