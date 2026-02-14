import { useState, useEffect, useRef } from 'react';
import { Link, Outlet, useParams, useLocation } from 'react-router-dom';
import { Book, Circle, Menu, X, ArrowLeft, Lock, CheckCircle, Power } from 'lucide-react';
import { motion } from 'framer-motion';
import { COURSE_CONTENT } from '../../data/courseData';
import { useStorage } from '../../hooks/useStorage';
import CourseDashboard from './CourseDashboard';

export default function CourseLayout() {
    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const { lessonId } = useParams();
    const location = useLocation();
    const [completedLessons, setCompletedLessons] = useStorage('completed_lessons', []);
    const [hasStarted, setHasStarted] = useStorage('course_started', false);

    // Hold to start state
    const [startProgress, setStartProgress] = useState(0);
    const holdInterval = useRef(null);
    const startTime = useRef(null);

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

    // Circle config
    const radius = 18;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (progressPercentage / 100) * circumference;

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

    const startHold = () => {
        startTime.current = Date.now();
        clearInterval(holdInterval.current);

        holdInterval.current = setInterval(() => {
            const elapsedTime = Date.now() - startTime.current;
            const newProgress = Math.min((elapsedTime / 1500) * 100, 100); // 1.5 seconds to fill
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
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#020617] via-transparent to-[#020617]"></div>

                    {/* Floating Candlesticks Simulation */}
                    <motion.div
                        animate={{ y: [0, -20, 0], opacity: [0.3, 0.6, 0.3] }}
                        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute top-1/3 left-1/4 w-2 h-16 bg-emerald-500/20 blur-[1px]"
                    />
                    <motion.div
                        animate={{ y: [0, 30, 0], opacity: [0.2, 0.5, 0.2] }}
                        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                        className="absolute bottom-1/3 right-1/4 w-2 h-24 bg-red-500/20 blur-[1px]"
                    />
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0.1, 0.3, 0.1] }}
                        transition={{ duration: 4, repeat: Infinity }}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[100px]"
                    />
                </div>

                <div className="text-center z-10 p-12 bg-[#0B0F1C]/80 backdrop-blur-xl border border-white/5 rounded-3xl shadow-2xl relative overflow-hidden">
                    {/* Decorative Top Border */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent"></div>

                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
                            Trading Environment
                        </h1>
                        <p className="text-slate-400 text-lg mb-12 max-w-md mx-auto">
                            System secured. Initialize protocol to access market data.
                        </p>

                        {/* Hold to Initialize Interaction */}
                        <div className="flex justify-center py-4">
                            <div
                                className="relative w-32 h-32 cursor-pointer select-none group"
                                onMouseDown={startHold}
                                onMouseUp={endHold}
                                onMouseLeave={endHold}
                                onTouchStart={startHold}
                                onTouchEnd={endHold}
                            >
                                {/* Static Outer Rings with Glow */}
                                <div className="absolute inset-0 rounded-full border border-slate-700/50"></div>
                                <div className="absolute inset-2 rounded-full border border-slate-700/30 border-dashed animate-[spin_10s_linear_infinite]"></div>

                                {/* Dynamic Progress Ring */}
                                <svg className="absolute inset-0 w-full h-full transform -rotate-90 pointer-events-none">
                                    <circle
                                        cx="64"
                                        cy="64"
                                        r="58"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                        fill="transparent"
                                        className="text-emerald-500 transition-all duration-75 ease-linear drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]"
                                        strokeDasharray={2 * Math.PI * 58}
                                        strokeDashoffset={2 * Math.PI * 58 - (startProgress / 100) * (2 * Math.PI * 58)}
                                        strokeLinecap="round"
                                    />
                                </svg>

                                {/* Center Power Icon */}
                                <div className="absolute inset-6 rounded-full bg-slate-800/80 border border-white/10 flex items-center justify-center group-active:scale-95 transition-transform shadow-inner shadow-black/50">
                                    <Power className={`w-8 h-8 transition-colors duration-300 ${startProgress > 0 ? 'text-emerald-400 drop-shadow-[0_0_15px_rgba(52,211,153,0.8)]' : 'text-slate-500 group-hover:text-slate-300'}`} />
                                </div>

                                {/* Helper Text below */}
                                <div className="absolute -bottom-12 w-[200px] -left-[36px] text-center text-xs font-bold tracking-widest text-slate-500 uppercase">
                                    Hold to Initialize
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        );
    }


    return (
        <div className="flex h-screen bg-[#020617] text-white overflow-hidden font-sans">
            {/* Mobile Menu Toggle */}
            <div className="md:hidden fixed top-4 left-4 z-50">
                <button
                    onClick={() => setSidebarOpen(!isSidebarOpen)}
                    className="p-2 bg-slate-800 rounded-lg text-white shadow-lg"
                    aria-label="Toggle sidebar"
                >
                    {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
            </div>

            {/* Sidebar Navigation */}
            <motion.aside
                initial={{ x: -300 }}
                animate={{ x: isSidebarOpen ? 0 : -300 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className={`fixed md:relative z-40 w-72 h-full bg-[#0B0F1C] border-r border-white/5 flex flex-col shrink-0`}
            >
                {/* Sidebar Header with Progress */}
                <div className="p-6 border-b border-white/5">
                    <Link to="/" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-6 text-sm font-medium">
                        <ArrowLeft size={16} />
                        Back to Home
                    </Link>

                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-blue-500">
                                The Noob
                            </h2>
                            <p className="text-xs text-slate-500 mt-1 uppercase tracking-wide font-semibold">
                                {completedLessons.length} / {totalLessons} Completed
                            </p>
                        </div>

                        {/* Progress Circle */}
                        <div className="relative w-12 h-12 flex items-center justify-center">
                            <svg className="transform -rotate-90 w-12 h-12">
                                <circle
                                    cx="24"
                                    cy="24"
                                    r={radius}
                                    stroke="currentColor"
                                    strokeWidth="4"
                                    fill="transparent"
                                    className="text-slate-800"
                                />
                                <circle
                                    cx="24"
                                    cy="24"
                                    r={radius}
                                    stroke="currentColor"
                                    strokeWidth="4"
                                    fill="transparent"
                                    strokeDasharray={circumference}
                                    strokeDashoffset={strokeDashoffset}
                                    className="text-emerald-500 transition-all duration-1000 ease-out"
                                />
                            </svg>
                            <span className="absolute text-[10px] font-bold text-white">
                                {progressPercentage}%
                            </span>
                        </div>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-8 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent pb-20">
                    {Object.entries(COURSE_CONTENT).map(([key, module]) => (
                        <div key={key}>
                            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 px-2">
                                {module.title}
                            </h3>
                            <div className="space-y-1">
                                {module.lessons.map((lesson) => {
                                    const isActive = lessonId === lesson.id;
                                    const locked = isLessonLocked(lesson.id);
                                    const completed = isLessonCompleted(lesson.id);

                                    if (locked) {
                                        return (
                                            <div key={lesson.id} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-slate-500 cursor-not-allowed opacity-75">
                                                <Lock size={16} className="text-red-500" />
                                                {lesson.title}
                                            </div>
                                        );
                                    }

                                    return (
                                        <Link
                                            key={lesson.id}
                                            to={`/learn/${lesson.id}`}
                                            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200 group
                                                ${isActive
                                                    ? 'bg-emerald-500/10 text-emerald-400 font-medium'
                                                    : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'
                                                }`}
                                        >
                                            {completed ? (
                                                <CheckCircle size={16} className="text-emerald-500" />
                                            ) : isActive ? (
                                                <Book size={16} className="text-emerald-400" />
                                            ) : (
                                                <Circle size={16} className="opacity-30 group-hover:opacity-100 transition-opacity" />
                                            )}
                                            {lesson.title}
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </motion.aside>

            {/* Main Content Area */}
            <main className="flex-1 h-full overflow-y-auto relative scroll-smooth bg-[#020617] flex flex-col">
                {/* Top Header */}
                <header className="sticky top-0 z-30 flex items-center justify-between px-8 py-5 bg-[#020617]/80 backdrop-blur-md border-b border-white/5">
                    {/* Breadcrumbs (Dynamic) */}
                    <div className="text-sm text-slate-400 flex items-center gap-2">
                        <Link to="/learn" className="hover:text-white transition-colors font-medium">Course</Link>
                        {lessonId && (
                            <>
                                <span className="text-slate-600">/</span>
                                <span className="hover:text-white cursor-pointer transition-colors max-w-[100px] truncate md:max-w-none">{activeModuleTitle}</span>
                                <span className="text-slate-600">/</span>
                                <span className="text-white font-medium truncate">{activeLessonTitle}</span>
                            </>
                        )}
                        {!lessonId && (
                            <>
                                <span className="text-slate-600">/</span>
                                <span className="text-white font-medium">Dashboard</span>
                            </>
                        )}
                    </div>

                    {/* User Profile - Top Right */}
                    <div className="flex items-center gap-4">
                        <div className="text-right hidden sm:block">
                            <p className="text-sm font-bold text-white leading-none">Student Account</p>
                            <p className="text-[10px] text-emerald-400 font-medium uppercase tracking-wide mt-1">Free Plan</p>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-blue-600 flex items-center justify-center text-sm font-bold shadow-lg shadow-emerald-500/20 border border-white/10 cursor-pointer hover:scale-105 transition-transform">
                            ME
                        </div>
                    </div>
                </header>

                <div className="flex-1 max-w-5xl mx-auto w-full px-6 md:px-12 py-12">
                    {lessonId ? (
                        <Outlet />
                    ) : (
                        <CourseDashboard
                            completedLessons={completedLessons}
                            progressPercentage={progressPercentage}
                            isLessonLocked={isLessonLocked}
                            isLessonCompleted={isLessonCompleted}
                        />
                    )}
                </div>
            </main>
        </div>
    );
}
