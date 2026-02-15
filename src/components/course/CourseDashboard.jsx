import { useState } from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, Book, CheckCircle, Circle, Lock, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { COURSE_CONTENT } from '../../data/courseData';

/**
 * Circular progress indicator for each module in the dashboard.
 */
function DashboardProgressCircle({ percentage, size = 48, strokeWidth = 4 }) {
    const r = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * r;
    const offset = circumference - (percentage / 100) * circumference;
    const center = size / 2;

    const colorClass = percentage === 100
        ? 'text-emerald-400'
        : percentage >= 50
            ? 'text-blue-400'
            : 'text-amber-400';

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
export default function CourseDashboard({ completedLessons = [], progressPercentage = 0, isLessonLocked, isLessonCompleted, getModuleProgress }) {
    // Dashboard-specific collapse state — all collapsed by default
    const [collapsedModules, setCollapsedModules] = useState(() =>
        Object.keys(COURSE_CONTENT).reduce((acc, key) => ({ ...acc, [key]: true }), {})
    );

    const toggleModule = (key) => {
        setCollapsedModules(prev => ({ ...prev, [key]: !prev[key] }));
    };

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <h1 className="text-4xl font-bold text-white mb-2">Welcome back, Trader</h1>
            <p className="text-slate-400 mb-10 text-lg">Your journey to mastery continues.</p>

            {/* 3 Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                {/* Card 1: Level */}
                <div className="p-6 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 border border-white/5 relative overflow-hidden group hover:border-emerald-500/30 transition-colors">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <TrendingUp size={64} />
                    </div>
                    <h3 className="text-slate-400 text-sm font-medium uppercase tracking-wider mb-2">Current Level</h3>
                    <div className="text-3xl font-bold text-white mb-1">Noob Trader</div>
                    <div className="text-emerald-400 text-xs font-semibold">Phase 1 in progress</div>
                </div>

                {/* Card 2: Progress */}
                <div className="p-6 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 border border-white/5 relative overflow-hidden group hover:border-blue-500/30 transition-colors">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Book size={64} />
                    </div>
                    <h3 className="text-slate-400 text-sm font-medium uppercase tracking-wider mb-2">Course Progress</h3>
                    <div className="text-3xl font-bold text-white mb-1">{progressPercentage}%</div>
                    <div className="w-full bg-slate-700 h-1.5 rounded-full mt-2 overflow-hidden">
                        <div className="bg-blue-500 h-full rounded-full transition-all duration-1000" style={{ width: `${progressPercentage}%` }}></div>
                    </div>
                </div>

                {/* Card 3: XP / Quizzes */}
                <div className="p-6 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 border border-white/5 relative overflow-hidden group hover:border-purple-500/30 transition-colors">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <CheckCircle size={64} />
                    </div>
                    <h3 className="text-slate-400 text-sm font-medium uppercase tracking-wider mb-2">Lessons Mastered</h3>
                    <div className="text-3xl font-bold text-white mb-1">{completedLessons.length} XP</div>
                    <div className="text-purple-400 text-xs font-semibold">Keep pushing!</div>
                </div>
            </div>

            <h2 className="text-xl font-semibold text-white mb-6">Continue Learning</h2>
            {/* Shows lessons grouped by module — each collapsible */}
            <div className="space-y-4">
                {Object.entries(COURSE_CONTENT).map(([key, module]) => {
                    const isCollapsed = collapsedModules[key] === true;
                    const modProgress = getModuleProgress ? getModuleProgress(key) : { completed: 0, total: module.lessons.length, percentage: 0 };

                    return (
                        <div key={key} className="bg-slate-900/50 border border-white/5 rounded-xl overflow-hidden transition-all duration-300 hover:border-white/10">
                            {/* Module Header — clickable */}
                            <button
                                onClick={() => toggleModule(key)}
                                className="w-full flex items-center justify-between p-5 text-left group transition-colors hover:bg-white/[0.02]"
                            >
                                <div className="flex items-center gap-4 flex-1 min-w-0">
                                    {/* Chevron */}
                                    <motion.div
                                        animate={{ rotate: isCollapsed ? -90 : 0 }}
                                        transition={{ duration: 0.2 }}
                                        className="text-slate-500 shrink-0"
                                    >
                                        <ChevronDown size={18} />
                                    </motion.div>

                                    <div className="min-w-0 flex-1">
                                        <h3 className="text-emerald-400 font-bold uppercase text-xs tracking-widest group-hover:text-emerald-300 transition-colors">
                                            {module.title}
                                        </h3>
                                        {!isCollapsed && (
                                            <p className="text-slate-500 text-xs mt-1">
                                                {modProgress.completed} of {modProgress.total} lessons completed
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {/* Progress circle — only visible when collapsed */}
                                {isCollapsed && (
                                    <div className="shrink-0">
                                        <DashboardProgressCircle
                                            percentage={modProgress.percentage}
                                            size={52}
                                            strokeWidth={4}
                                        />
                                    </div>
                                )}
                            </button>

                            {/* Collapsible lesson list */}
                            <AnimatePresence initial={false}>
                                {!isCollapsed && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                                        className="overflow-hidden"
                                    >
                                        <div className="grid gap-3 px-5 pb-5">
                                            {module.lessons.map(lesson => (
                                                <Link
                                                    key={lesson.id}
                                                    to={`/learn/${lesson.id}`}
                                                    className={`flex items-center justify-between p-4 rounded-lg border transition-all ${isLessonCompleted(lesson.id)
                                                        ? 'bg-emerald-500/5 border-emerald-500/20 text-slate-300'
                                                        : isLessonLocked(lesson.id)
                                                            ? 'bg-red-500/5 border-red-500/10 text-slate-500 cursor-not-allowed pointer-events-none'
                                                            : 'bg-slate-800 border-white/10 text-white hover:border-emerald-500/50 hover:bg-slate-800/80'
                                                        }`}
                                                >
                                                    <span className="flex items-center gap-3">
                                                        {isLessonCompleted(lesson.id) ? (
                                                            <CheckCircle size={18} className="text-emerald-500" />
                                                        ) : isLessonLocked(lesson.id) ? (
                                                            <Lock size={18} className="text-red-500" />
                                                        ) : (
                                                            <Circle size={18} className="text-slate-400" />
                                                        )}
                                                        {lesson.title}
                                                    </span>
                                                    {isLessonCompleted(lesson.id) && <span className="text-xs text-emerald-500 font-bold px-2 py-1 bg-emerald-500/10 rounded">COMPLETED</span>}
                                                    {isLessonLocked(lesson.id) && <span className="text-xs text-red-500 font-bold px-2 py-1 bg-red-500/10 rounded">LOCKED</span>}
                                                </Link>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
