import { useState, useEffect, useRef } from 'react';
import { Link, Outlet, useParams, useLocation } from 'react-router-dom';
import { Book, Circle, Menu, X, Lock, CheckCircle, Power, LayoutDashboard, Home, PanelLeftClose, PanelLeft, ChevronDown, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { COURSE_CONTENT } from '../../data/courseData';
import { useStorage } from '../../hooks/useStorage';
import CourseDashboard from './CourseDashboard';

// Small reusable progress circle component
function ModuleProgressCircle({ percentage, size = 32, strokeWidth = 3, fontSize = '8px' }) {
    const r = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * r;
    const offset = circumference - (percentage / 100) * circumference;
    const center = size / 2;

    // Color based on progress
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
                    className="text-slate-700/50"
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
            <span className={`absolute font-bold ${colorClass}`} style={{ fontSize }}>
                {percentage}%
            </span>
        </div>
    );
}

export default function CourseLayout() {
    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const { lessonId } = useParams();
    const location = useLocation();
    const [completedLessons, setCompletedLessons] = useStorage('completed_lessons', []);
    const [hasStarted, setHasStarted] = useStorage('course_started', false);

    // Collapsible module state for sidebar — all collapsed by default
    const [collapsedModules, setCollapsedModules] = useState(() =>
        Object.keys(COURSE_CONTENT).reduce((acc, key) => ({ ...acc, [key]: true }), {})
    );

    // Hold to start state
    const [startProgress, setStartProgress] = useState(0);
    const holdInterval = useRef(null);
    const startTime = useRef(null);

    // ─── TEST: Mark ALL lessons as completed on first load ───
    useEffect(() => {
        const allLessons = Object.values(COURSE_CONTENT).flatMap(m => m.lessons);
        const allIds = allLessons.map(l => l.id);
        const stored = localStorage.getItem('completed_lessons');
        let current = [];
        try { current = stored ? JSON.parse(stored) : []; } catch { current = []; }
        const missing = allIds.filter(id => !current.includes(id));
        if (missing.length > 0) {
            const updated = [...new Set([...current, ...allIds])];
            localStorage.setItem('completed_lessons', JSON.stringify(updated));
            setCompletedLessons(updated);
        }
    }, []);
    // ─────────────────────────────────────────────────────────

    // Auto-expand the module containing the active lesson
    useEffect(() => {
        if (lessonId) {
            for (const [key, mod] of Object.entries(COURSE_CONTENT)) {
                if (mod.lessons.some(l => l.id === lessonId)) {
                    setCollapsedModules(prev => ({ ...prev, [key]: false }));
                    break;
                }
            }
        }
    }, [lessonId]);

    // Cleanup interval on unmount to prevent memory leaks
    useEffect(() => {
        return () => clearInterval(holdInterval.current);
    }, []);

    // Reload from storage when route changes (quiz completion triggers storage event)
    useEffect(() => {
        const stored = localStorage.getItem('completed_lessons');
        if (stored) {
            try {
                setCompletedLessons(JSON.parse(stored));
            } catch {
                // corrupted data — ignore
            }
        }
    }, [location.pathname]);

    // Helper to check if a lesson is locked
    const isLessonLocked = (currentLessonId) => {
        const allLessons = Object.values(COURSE_CONTENT).flatMap(m => m.lessons);
        const currentIndex = allLessons.findIndex(l => l.id === currentLessonId);

        if (currentIndex === 0) return false; // First lesson always open

        const previousLessonId = allLessons[currentIndex - 1].id;
        return !completedLessons.includes(previousLessonId);
    };

    const isLessonCompleted = (id) => completedLessons.includes(id);

    // Calculate progress
    const allLessons = Object.values(COURSE_CONTENT).flatMap(m => m.lessons);
    const totalLessons = allLessons.length;
    const progressPercentage = Math.round((completedLessons.length / totalLessons) * 100);

    // Circle config for overall progress
    const radius = 18;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (progressPercentage / 100) * circumference;

    // Module-level progress calculator
    const getModuleProgress = (moduleKey) => {
        const mod = COURSE_CONTENT[moduleKey];
        if (!mod) return { completed: 0, total: 0, percentage: 0 };
        const total = mod.lessons.length;
        const completed = mod.lessons.filter(l => completedLessons.includes(l.id)).length;
        return { completed, total, percentage: total === 0 ? 0 : Math.round((completed / total) * 100) };
    };

    // Toggle sidebar module collapse
    const toggleSidebarModule = (key) => {
        setCollapsedModules(prev => ({ ...prev, [key]: !prev[key] }));
    };

    // Find active lesson title for Breadcrumbs
    let activeLessonTitle = "Select a Lesson";
    let activeModuleTitle = "Course";

    if (lessonId) {
        const allModules = Object.values(COURSE_CONTENT);
        for (const mod of allModules) {
            const found = mod.lessons.find(l => l.id === lessonId);
            if (found) {
                activeLessonTitle = found.title;
                activeModuleTitle = mod.title;
                break;
            }
        }
    }

    // Check if we're on the dashboard (no lessonId)
    const isDashboard = !lessonId;

    const startHold = () => {
        startTime.current = Date.now();
        clearInterval(holdInterval.current);

        holdInterval.current = setInterval(() => {
            const elapsedTime = Date.now() - startTime.current;
            const newProgress = Math.min((elapsedTime / 1500) * 100, 100);
            setStartProgress(newProgress);

            if (newProgress >= 100) {
                clearInterval(holdInterval.current);
                handleStart();
            }
        }, 16);
    };

    const endHold = () => {
        clearInterval(holdInterval.current);
        setStartProgress(0);
    };

    const handleStart = () => {
        setHasStarted(true);
    };

    if (!hasStarted && !lessonId) {
        return (
            <div className="flex h-screen items-center justify-center bg-[#020617] text-white relative overflow-hidden">
                {/* Background Effects */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-3xl"></div>
                </div>

                <div className="z-10 text-center max-w-md px-6">
                    <div className="mb-8">
                        <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-emerald-500 to-blue-600 flex items-center justify-center shadow-2xl shadow-emerald-500/20 mb-6">
                            <Power size={36} />
                        </div>
                        <h1 className="text-3xl font-bold mb-3">Ready to Begin?</h1>
                        <p className="text-slate-400">Hold the button below to power up your trading journey.</p>
                    </div>

                    <div className="relative">
                        <button
                            onMouseDown={startHold}
                            onMouseUp={endHold}
                            onMouseLeave={endHold}
                            onTouchStart={startHold}
                            onTouchEnd={endHold}
                            className="relative w-48 h-14 rounded-2xl bg-emerald-600 font-bold text-white overflow-hidden select-none group hover:shadow-lg hover:shadow-emerald-500/30 transition-shadow"
                        >
                            <div
                                className="absolute inset-0 bg-emerald-400 transition-none"
                                style={{ width: `${startProgress}%` }}
                            />
                            <span className="relative z-10 flex items-center justify-center gap-2">
                                <Power size={18} />
                                {startProgress > 0 ? `${Math.round(startProgress)}%` : 'Hold to Start'}
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex h-screen bg-[#020617] text-white overflow-hidden font-sans">
            {/* Sidebar Toggle Button (visible when sidebar is collapsed) */}
            {!isSidebarOpen && (
                <button
                    onClick={() => setSidebarOpen(true)}
                    className="fixed top-[22px] left-5 z-50 p-2.5 bg-[#0B0F1C] border border-white/10 rounded-xl text-slate-400 hover:text-white hover:border-emerald-500/30 hover:shadow-lg hover:shadow-emerald-500/10 transition-all duration-300"
                    aria-label="Open sidebar"
                >
                    <PanelLeft size={20} />
                </button>
            )}

            {/* Sidebar Navigation */}
            <motion.aside
                initial={{ x: -414 }}
                animate={{ x: isSidebarOpen ? 0 : -414 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className={`${isSidebarOpen ? 'fixed md:relative' : 'fixed'} z-40 w-[414px] h-full bg-[#0B0F1C] border-r border-white/5 flex flex-col shrink-0`}
            >
                {/* Sidebar Header with Progress + Toggle */}
                <div className="px-6 py-7 border-b border-white/5">
                    <div className="flex items-center justify-between mb-5">
                        <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-blue-500">
                            The Noob
                        </h2>

                        {/* Collapse Sidebar Button */}
                        <button
                            onClick={() => setSidebarOpen(false)}
                            className="p-2 rounded-lg text-slate-500 hover:text-white hover:bg-white/5 transition-all duration-200"
                            aria-label="Collapse sidebar"
                        >
                            <PanelLeftClose size={20} />
                        </button>
                    </div>

                    <div className="flex items-center justify-between">
                        <p className="text-sm text-slate-500 uppercase tracking-wide font-semibold">
                            {completedLessons.length} / {totalLessons} Completed
                        </p>

                        {/* Progress Circle */}
                        <div className="relative w-14 h-14 flex items-center justify-center">
                            <svg className="transform -rotate-90 w-14 h-14">
                                <circle
                                    cx="28"
                                    cy="28"
                                    r="22"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                    fill="transparent"
                                    className="text-slate-800"
                                />
                                <circle
                                    cx="28"
                                    cy="28"
                                    r="22"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                    fill="transparent"
                                    strokeDasharray={2 * Math.PI * 22}
                                    strokeDashoffset={2 * Math.PI * 22 - (progressPercentage / 100) * 2 * Math.PI * 22}
                                    strokeLinecap="round"
                                    className="text-emerald-500 transition-all duration-1000 ease-out"
                                />
                            </svg>
                            <span className="absolute text-xs font-bold text-white">
                                {progressPercentage}%
                            </span>
                        </div>
                    </div>
                </div>

                {/* Module List with Collapsible Sections */}
                <div className="flex-1 overflow-y-auto p-5 space-y-2 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent pb-28">
                    {Object.entries(COURSE_CONTENT).map(([key, module]) => {
                        const isCollapsed = collapsedModules[key] === true;
                        const modProgress = getModuleProgress(key);
                        const hasActiveLesson = module.lessons.some(l => l.id === lessonId);

                        return (
                            <div key={key} className="rounded-xl overflow-hidden">
                                {/* Module Header — clickable for collapse */}
                                <button
                                    onClick={() => toggleSidebarModule(key)}
                                    className={`w-full flex items-center gap-3 px-4 py-3.5 text-left rounded-xl transition-all duration-200 group
                                        ${hasActiveLesson
                                            ? 'bg-emerald-500/5 border border-emerald-500/15'
                                            : 'hover:bg-white/5 border border-transparent'
                                        }`}
                                >
                                    {/* Chevron */}
                                    <motion.div
                                        animate={{ rotate: isCollapsed ? 0 : 90 }}
                                        transition={{ duration: 0.2 }}
                                        className="text-slate-500 shrink-0"
                                    >
                                        <ChevronRight size={16} />
                                    </motion.div>

                                    {/* Module title — "Module X:" in green, rest in white */}
                                    <span className="text-sm font-semibold flex-1 truncate transition-colors">
                                        {(() => {
                                            const colonIndex = module.title.indexOf(':');
                                            if (colonIndex === -1) return <span className="text-emerald-400">{module.title}</span>;
                                            return (
                                                <>
                                                    <span className="text-emerald-400">{module.title.slice(0, colonIndex + 1)}</span>
                                                    <span className="text-slate-200 group-hover:text-white">{module.title.slice(colonIndex + 1)}</span>
                                                </>
                                            );
                                        })()}
                                    </span>

                                    {/* Completed count */}
                                    <span className="text-xs text-slate-500 font-medium tabular-nums shrink-0">
                                        {modProgress.completed}/{modProgress.total}
                                    </span>
                                </button>

                                {/* Expandable lesson list */}
                                <AnimatePresence initial={false}>
                                    {!isCollapsed && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.25, ease: 'easeInOut' }}
                                            className="overflow-hidden"
                                        >
                                            <div className="space-y-1 pt-1.5 pb-3 pl-4">
                                                {module.lessons.map((lesson) => {
                                                    const isActive = lessonId === lesson.id;
                                                    const locked = isLessonLocked(lesson.id);
                                                    const completed = isLessonCompleted(lesson.id);

                                                    if (locked) {
                                                        return (
                                                            <div key={lesson.id} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13.5px] text-slate-500 cursor-not-allowed opacity-75">
                                                                <Lock size={17} className="text-red-500 shrink-0" />
                                                                {lesson.title}
                                                            </div>
                                                        );
                                                    }

                                                    return (
                                                        <Link
                                                            key={lesson.id}
                                                            to={`/learn/${lesson.id}`}
                                                            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13.5px] transition-all duration-200 group
                                                                ${isActive
                                                                    ? 'bg-emerald-500/10 text-emerald-400 font-medium'
                                                                    : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'
                                                                }`}
                                                        >
                                                            {completed ? (
                                                                <CheckCircle size={17} className="text-emerald-500 shrink-0" />
                                                            ) : isActive ? (
                                                                <Book size={17} className="text-emerald-400 shrink-0" />
                                                            ) : (
                                                                <Circle size={17} className="opacity-30 group-hover:opacity-100 transition-opacity shrink-0" />
                                                            )}
                                                            {lesson.title}
                                                        </Link>
                                                    );
                                                })}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        );
                    })}
                </div>

                {/* Bottom Navbar */}
                <div className="absolute bottom-0 left-0 right-0 bg-[#0B0F1C]/95 backdrop-blur-xl border-t border-white/5">
                    {/* Gradient accent line at top */}
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent" />

                    <div className="flex items-center gap-2 p-4">
                        <Link
                            to="/learn"
                            className={`flex-1 flex items-center justify-center gap-2.5 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300
                                ${isDashboard
                                    ? 'bg-emerald-500/15 text-emerald-400 shadow-lg shadow-emerald-500/10 border border-emerald-500/20'
                                    : 'text-slate-500 hover:text-slate-200 hover:bg-white/5 border border-transparent'
                                }`}
                        >
                            <LayoutDashboard size={18} />
                            Dashboard
                        </Link>
                        <Link
                            to="/"
                            className="flex-1 flex items-center justify-center gap-2.5 px-4 py-3 rounded-xl text-sm font-semibold text-slate-500 hover:text-slate-200 hover:bg-white/5 border border-transparent transition-all duration-300"
                        >
                            <Home size={18} />
                            Home
                        </Link>
                    </div>
                </div>
            </motion.aside>

            {/* Main Content Area */}
            <main className="flex-1 h-full overflow-y-auto relative scroll-smooth bg-[#020617] flex flex-col">
                {/* Top Header */}
                <header className={`sticky top-0 z-30 flex items-center justify-between py-5 bg-[#020617]/80 backdrop-blur-md border-b border-white/5 transition-all duration-300 ${isSidebarOpen ? 'px-10' : 'pl-[72px] pr-10'}`}>
                    {/* Breadcrumbs */}
                    <div className="text-[15px] text-slate-400 flex items-center gap-2.5">
                        <Link to="/learn" className="hover:text-white transition-colors font-medium">Dashboard</Link>
                        {lessonId && (
                            <>
                                <span className="text-slate-600">/</span>
                                <span className="text-white font-medium truncate">{activeLessonTitle}</span>
                            </>
                        )}
                    </div>

                    {/* User Profile - Top Right */}
                    <div className="flex items-center gap-5">
                        <div className="text-right hidden sm:block">
                            <p className="text-[15px] font-bold text-white leading-none">Student Account</p>
                            <p className="text-xs text-emerald-400 font-medium uppercase tracking-wide mt-1.5">Free Plan</p>
                        </div>
                        <div className="w-11 h-11 rounded-full bg-gradient-to-br from-emerald-500 to-blue-600 flex items-center justify-center text-sm font-bold shadow-lg shadow-emerald-500/20 border border-white/10 cursor-pointer hover:scale-105 transition-transform">
                            ME
                        </div>
                    </div>
                </header>

                <div className="flex-1 max-w-6xl mx-auto w-full px-8 md:px-16 py-14">
                    {lessonId ? (
                        <Outlet />
                    ) : (
                        <CourseDashboard
                            completedLessons={completedLessons}
                            progressPercentage={progressPercentage}
                            isLessonLocked={isLessonLocked}
                            isLessonCompleted={isLessonCompleted}
                            getModuleProgress={getModuleProgress}
                        />
                    )}
                </div>
            </main>
        </div>
    );
}
