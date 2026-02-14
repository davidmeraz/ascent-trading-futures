import { useState, useEffect } from 'react';
import { Link, Outlet, useParams, useLocation, useNavigate } from 'react-router-dom';
import { Book, Circle, Menu, X, ArrowLeft, Lock, CheckCircle, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { COURSE_CONTENT } from '../../data/courseData';

export default function CourseLayout() {
    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const { lessonId } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const [completedLessons, setCompletedLessons] = useState([]);

    // Protect route - Check if purchased
    useEffect(() => {
        const hasPurchased = localStorage.getItem('course_purchased');
        if (!hasPurchased) {
            navigate('/enrollment-success');
        }
    }, [navigate]);

    // Load progress on mount and when route changes (in case a quiz was just passed)
    const loadProgress = () => {
        const stored = localStorage.getItem('completed_lessons');
        if (stored) {
            setCompletedLessons(JSON.parse(stored));
        }
    };

    useEffect(() => {
        loadProgress();
        // Listen for storage events (cross-tab or custom dispatch)
        window.addEventListener('storage', loadProgress);
        return () => window.removeEventListener('storage', loadProgress);
    }, [location.pathname]); // Re-check when navigating

    // Helper to check if a lesson is locked
    const isLessonLocked = (currentLessonId) => {
        // Flatten all lessons to find the index
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

    return (
        <div className="flex h-screen bg-[#020617] text-white overflow-hidden font-sans">
            {/* Mobile Menu Toggle */}
            <div className="md:hidden fixed top-4 left-4 z-50">
                <button
                    onClick={() => setSidebarOpen(!isSidebarOpen)}
                    className="p-2 bg-slate-800 rounded-lg text-white shadow-lg"
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
                                            <div key={lesson.id} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-slate-600 cursor-not-allowed opacity-50">
                                                <Lock size={16} />
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
                            {/* Shows the next incomplete lesson or the first one */}
                            <div className="space-y-4">
                                {Object.entries(COURSE_CONTENT).map(([key, module]) => (
                                    <div key={key} className="bg-slate-900/50 border border-white/5 rounded-xl p-6">
                                        <h3 className="text-emerald-400 font-bold mb-4 uppercase text-xs tracking-widest">{module.title}</h3>
                                        <div className="grid gap-3">
                                            {module.lessons.map(lesson => (
                                                <Link
                                                    key={lesson.id}
                                                    to={`/learn/${lesson.id}`}
                                                    className={`flex items-center justify-between p-4 rounded-lg border transition-all ${isLessonCompleted(lesson.id)
                                                        ? 'bg-emerald-500/5 border-emerald-500/20 text-slate-300'
                                                        : isLessonLocked(lesson.id)
                                                            ? 'bg-slate-800/50 border-white/5 text-slate-600 cursor-not-allowed'
                                                            : 'bg-slate-800 border-white/10 text-white hover:border-emerald-500/50 hover:bg-slate-800/80'
                                                        }`}
                                                >
                                                    <span className="flex items-center gap-3">
                                                        {isLessonCompleted(lesson.id) ? <CheckCircle size={18} className="text-emerald-500" /> : isLessonLocked(lesson.id) ? <Lock size={18} /> : <Circle size={18} className="text-slate-400" />}
                                                        {lesson.title}
                                                    </span>
                                                    {isLessonCompleted(lesson.id) && <span className="text-xs text-emerald-500 font-bold px-2 py-1 bg-emerald-500/10 rounded">COMPLETED</span>}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
