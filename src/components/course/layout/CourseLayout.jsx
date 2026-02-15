import { useState, useEffect, useRef, useCallback } from 'react';
import { Link, Outlet, useParams, useLocation, useNavigate, useMatch } from 'react-router-dom';
import { Book, Circle, Menu, X, Lock, CheckCircle, Power, LayoutDashboard, Home, PanelLeftClose, PanelLeft, ChevronDown, ChevronRight, Rocket, Sprout, Crown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { COURSE_CONTENT, COURSE_CONTENT_BY_LEVEL } from '../../../data/courseData';
import { useStorage } from '../../../hooks/useStorage';
import CourseDashboard from '../dashboard/CourseDashboard';

// ═══════════════════════════════════════════
// Level definitions
// ═══════════════════════════════════════════
const LEVELS = {
    none: {
        key: 'none',
        name: 'Unranked',
        label: 'None',
        Icon: Circle,
        color: 'slate',
        gradient: 'from-slate-500 to-slate-600',
        shadow: 'shadow-slate-500/25',
        borderActive: 'border-slate-400/20',
        textColor: 'text-slate-400',
        headerGradient: 'from-slate-400 to-slate-500',
        activeBg: 'bg-slate-500/5',
        activeBorder: 'border-slate-500/15',
        activeText: 'text-slate-400',
        activeItemBg: 'bg-slate-500/10',
        completedIcon: 'text-slate-500',
        progressCircle: 'text-slate-500',
        navbarAccent: 'via-slate-500/30',
        navbarActiveBg: 'bg-slate-500/15',
        navbarActiveText: 'text-slate-400',
        navbarActiveBorder: 'border-slate-500/20',
        navbarActiveShadow: 'shadow-slate-500/10',
    },
    noob: {
        key: 'noob',
        name: 'The Noob',
        label: 'Noob',
        Icon: Sprout,
        color: 'emerald',
        gradient: 'from-emerald-500 to-emerald-600',
        shadow: 'shadow-emerald-500/25',
        borderActive: 'border-emerald-400/20',
        textColor: 'text-emerald-400',
        headerGradient: 'from-emerald-400 to-emerald-500',
        // Sidebar accent colors
        activeBg: 'bg-emerald-500/5',
        activeBorder: 'border-emerald-500/15',
        activeText: 'text-emerald-400',
        activeItemBg: 'bg-emerald-500/10',
        completedIcon: 'text-emerald-500',
        progressCircle: 'text-emerald-500',
        navbarAccent: 'via-emerald-500/30',
        navbarActiveBg: 'bg-emerald-500/15',
        navbarActiveText: 'text-emerald-400',
        navbarActiveBorder: 'border-emerald-500/20',
        navbarActiveShadow: 'shadow-emerald-500/10',
    },
    pro: {
        key: 'pro',
        name: 'The Pro',
        label: 'Pro',
        Icon: Rocket,
        color: 'blue',
        gradient: 'from-blue-500 to-blue-600',
        shadow: 'shadow-blue-500/25',
        borderActive: 'border-blue-400/20',
        textColor: 'text-blue-400',
        headerGradient: 'from-blue-400 to-blue-500',
        // Sidebar accent colors
        activeBg: 'bg-blue-500/5',
        activeBorder: 'border-blue-500/15',
        activeText: 'text-blue-400',
        activeItemBg: 'bg-blue-500/10',
        completedIcon: 'text-blue-500',
        progressCircle: 'text-blue-500',
        navbarAccent: 'via-blue-500/30',
        navbarActiveBg: 'bg-blue-500/15',
        navbarActiveText: 'text-blue-400',
        navbarActiveBorder: 'border-blue-500/20',
        navbarActiveShadow: 'shadow-blue-500/10',
    },
    expert: {
        key: 'expert',
        name: 'The Expert',
        label: 'Expert',
        Icon: Crown,
        color: 'red',
        gradient: 'from-red-500 to-red-600',
        shadow: 'shadow-red-500/25',
        borderActive: 'border-red-400/20',
        textColor: 'text-red-400',
        headerGradient: 'from-red-400 to-red-500',
        // Sidebar accent colors
        activeBg: 'bg-red-500/5',
        activeBorder: 'border-red-500/15',
        activeText: 'text-red-400',
        activeItemBg: 'bg-red-500/10',
        completedIcon: 'text-red-500',
        progressCircle: 'text-red-500',
        navbarAccent: 'via-red-500/30',
        navbarActiveBg: 'bg-red-500/15',
        navbarActiveText: 'text-red-400',
        navbarActiveBorder: 'border-red-500/20',
        navbarActiveShadow: 'shadow-red-500/10',
    },
};

const LEVEL_ORDER = ['none', 'noob', 'pro', 'expert'];

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
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    // Check if we are on a lesson route
    const lessonMatch = useMatch("/learn/:lessonId");
    const lessonId = lessonMatch?.params?.lessonId;

    const location = useLocation();
    const navigate = useNavigate();
    const [completedLessons, setCompletedLessons] = useStorage('completed_lessons', []);

    // Close sidebar on mobile when route changes
    useEffect(() => {
        if (window.innerWidth < 768) {
            setSidebarOpen(false);
        }
    }, [location.pathname]);


    // Collapsible module state for sidebar — all collapsed by default
    const [collapsedModules, setCollapsedModules] = useState(() =>
        Object.keys(COURSE_CONTENT).reduce((acc, key) => ({ ...acc, [key]: true }), {})
    );

    // Hold to start state
    const headerRef = useRef(null);
    const levelSwitcherRef = useRef(null);
    const [explosions, setExplosions] = useState([]);

    const triggerExplosion = (levelKey, origin) => {
        let x = window.innerWidth / 2;
        let y = window.innerHeight / 2;

        if (origin) {
            x = origin.x;
            y = origin.y;
        } else if (levelSwitcherRef.current) {
            const rect = levelSwitcherRef.current.getBoundingClientRect();
            x = rect.left + rect.width / 2;
            y = rect.top + rect.height / 2;
        }

        const newExplosion = {
            id: Date.now() + Math.random(),
            x,
            y,
            color: LEVELS[levelKey].color
        };

        setExplosions(prev => [...prev, newExplosion]);
    };

    const handleExplosionComplete = (id) => {
        setExplosions(prev => prev.filter(e => e.id !== id));
    };

    // Flying object animation state
    const [flyingObject, setFlyingObject] = useState(null);
    const [rocketLanded, setRocketLanded] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem('pro_level_unlocked')) || false;
        } catch { return false; }
    });

    const [noobUnlocked, setNoobUnlocked] = useStorage('noob_level_unlocked', false);
    const [expertUnlocked, setExpertUnlocked] = useStorage('expert_level_unlocked', false);

    // Level switcher state
    const [currentLevel, setCurrentLevel] = useStorage('current_level', 'noob');

    // Safety check: if stuck in 'none' or invalid level, force update to 'noob'
    useEffect(() => {
        if (!currentLevel || currentLevel === 'none' || !LEVELS[currentLevel]) {
            console.warn('Invalid level detected, resetting to noob:', currentLevel);
            setCurrentLevel('noob');
        }
    }, [currentLevel, setCurrentLevel]);

    const [levelSwitcherOpen, setLevelSwitcherOpen] = useState(false);
    const [coursePurchased] = useStorage('course_purchased', false);
    // location is already defined above

    // Determine which levels are unlocked
    const unlockedLevels = {
        noob: true,
        pro: rocketLanded,
        expert: expertUnlocked,
    };

    // Close level switcher when clicking outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (levelSwitcherRef.current && !levelSwitcherRef.current.contains(e.target)) {
                setLevelSwitcherOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Content filtered by current level. Safety fallback to empty object if data missing.
    const levelContent = (currentLevel === 'none' ? {} : COURSE_CONTENT_BY_LEVEL[currentLevel]) || COURSE_CONTENT_BY_LEVEL.noob || {};

    const activeLevel = LEVELS[currentLevel] || LEVELS.noob || LEVELS.none;
    const otherLevels = (LEVEL_ORDER || []).filter(k => k !== currentLevel && k !== 'none').map(k => LEVELS[k]);

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
            for (const [key, mod] of Object.entries(levelContent)) {
                if (mod.lessons.some(l => l.id === lessonId)) {
                    setCollapsedModules(prev => ({ ...prev, [key]: false }));
                    break;
                }
            }
        }
    }, [lessonId]);

    // Cleanup interval on unmount to prevent memory leaks
    useEffect(() => {
        // No intervals to clear related to start screen
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
    const allLessons = Object.values(levelContent).flatMap(m => m.lessons);
    const totalLessons = allLessons.length;
    const levelCompletedLessons = completedLessons.filter(id => allLessons.some(l => l.id === id));
    const progressPercentage = totalLessons === 0 ? 0 : Math.round((levelCompletedLessons.length / totalLessons) * 100);

    // Circle config for overall progress
    const radius = 18;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (progressPercentage / 100) * circumference;

    // Module-level progress calculator
    const getModuleProgress = (moduleKey) => {
        const mod = levelContent[moduleKey];
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
        const allModules = Object.values(levelContent);
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

    // Handle Pro unlock — trigger flying rocket + switcher animation sequence
    const handleProUnlock = useCallback((rocketPos) => {
        if (!headerRef.current) return;
        const headerRect = headerRef.current.getBoundingClientRect();
        const endX = headerRect.left + headerRect.width / 2;
        const endY = headerRect.top + headerRect.height / 2;

        setFlyingObject({
            type: 'rocket',
            startX: rocketPos.x,
            startY: rocketPos.y,
            endX,
            endY,
        });

        // Step 1: Rocket lands → mark Pro as unlocked
        setTimeout(() => {
            setFlyingObject(null);
            setRocketLanded(true);
        }, 1200);

        // Step 2: Open switcher to show unlocked level
        setTimeout(() => {
            setLevelSwitcherOpen(true);
        }, 1400);

        // Step 3: Trigger explosion and switch level quickly
        setTimeout(() => {
            triggerExplosion('pro');
            // Keep menu open for a split second during explosion for better visual continuity
            setTimeout(() => setLevelSwitcherOpen(false), 300);

            setTimeout(() => {
                setCurrentLevel('pro');
                navigate('/learn');
            }, 600);
        }, 2200);

    }, []);

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
        setSidebarOpen(false);
    };



    // Trigger welcome animation if passed via navigation state (from EnrollmentSuccess)
    useEffect(() => {
        if (location.state?.showWelcomeAnimation) {
            // Wait for component to mount and switcher button to appear
            setTimeout(() => {
                let origin = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
                if (levelSwitcherRef.current) {
                    const rect = levelSwitcherRef.current.getBoundingClientRect();
                    origin = {
                        x: rect.left + rect.width / 2,
                        y: rect.top + rect.height / 2
                    };
                }
                triggerExplosion('noob', origin);
            }, 500);

            // Clear state to prevent re-triggering (optional, but good practice if using history replace)
            window.history.replaceState({}, document.title);
        }
    }, [location]);

    const handleExpertUnlock = useCallback((startPos) => {
        if (!headerRef.current) return;
        const headerRect = headerRef.current.getBoundingClientRect();
        const endX = headerRect.left + headerRect.width / 2;
        const endY = headerRect.top + headerRect.height / 2;

        setFlyingObject({
            type: 'crown',
            startX: startPos.x,
            startY: startPos.y,
            endX,
            endY,
        });

        // Step 1: Crown lands → mark Expert as unlocked
        setTimeout(() => {
            setFlyingObject(null);
            setExpertUnlocked(true);
        }, 1200);

        // Step 2: Open switcher to show unlocked level
        setTimeout(() => {
            setLevelSwitcherOpen(true);
        }, 1400);

        // Step 3: Trigger explosion and switch level quickly
        setTimeout(() => {
            triggerExplosion('expert');
            // Keep menu open for a split second during explosion for better visual continuity
            setTimeout(() => setLevelSwitcherOpen(false), 300);

            setTimeout(() => {
                setCurrentLevel('expert');
                navigate('/learn');
            }, 600);
        }, 2200);

    }, []);



    const mainRef = useRef(null);

    // Scroll to top when lesson or level changes
    useEffect(() => {
        if (mainRef.current) {
            mainRef.current.style.scrollBehavior = 'auto';
            mainRef.current.scrollTop = 0;
        }
    }, [lessonId, currentLevel]);

    return (
        <div className="flex h-screen bg-[#020617] text-white overflow-hidden font-sans">
            {/* Sidebar Toggle Button (visible when sidebar is collapsed) */}
            {!isSidebarOpen && (
                <button
                    onClick={() => setSidebarOpen(true)}
                    className={`fixed md:top-5 left-5 z-50 p-2.5 bg-[#0B0F1C] border border-white/10 rounded-xl text-slate-400 hover:text-white hover:border-emerald-500/30 hover:shadow-lg hover:shadow-emerald-500/10 transition-all duration-300 ${isDashboard ? 'top-[18px]' : 'top-[22px]'}`}
                    aria-label="Open sidebar"
                >
                    <PanelLeft size={20} />
                </button>
            )}

            {/* Sidebar Navigation */}
            <motion.aside
                initial={{ x: -352 }}
                animate={{ x: isSidebarOpen ? 0 : -352 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className={`${isSidebarOpen ? 'fixed md:relative' : 'fixed'} z-40 w-[352px] h-full bg-[#0B0F1C] border-r border-white/5 flex flex-col shrink-0`}
            >
                {/* Sidebar Header with Progress + Toggle */}
                <div className="px-6 py-7 border-b border-white/5">
                    <div className="flex items-center justify-between mb-5">
                        <h2 className={`text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${activeLevel.headerGradient}`}>
                            {activeLevel.name}
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
                            {levelCompletedLessons.length} / {totalLessons} Completed
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
                                    className={`${activeLevel.progressCircle} transition-all duration-1000 ease-out`}
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
                    {Object.keys(levelContent).length === 0 ? (
                        <div className="h-full flex items-center justify-center opacity-30">
                            <Sprout size={48} className="text-slate-600" />
                        </div>
                    ) : (
                        Object.entries(levelContent).map(([key, module]) => {
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
                                                ? `${activeLevel.activeBg} border ${activeLevel.activeBorder}`
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
                                        <span className="text-sm font-semibold flex-1 truncate transition-colors text-slate-200 group-hover:text-white">
                                            {(() => {
                                                const colonIndex = module.title.indexOf(':');
                                                if (colonIndex === -1) return module.title;
                                                return module.title.slice(colonIndex + 1).trim();
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
                                                                        ? `${activeLevel.activeItemBg} ${activeLevel.activeText} font-medium`
                                                                        : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'
                                                                    }`}
                                                            >
                                                                {completed ? (
                                                                    <CheckCircle size={17} className={`${activeLevel.completedIcon} shrink-0`} />
                                                                ) : isActive ? (
                                                                    <Book size={17} className={`${activeLevel.activeText} shrink-0`} />
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
                        }))}
                </div>

                {/* Bottom Navbar */}
                <div className="absolute bottom-0 left-0 right-0 bg-[#0B0F1C]/95 backdrop-blur-xl border-t border-white/5">
                    {/* Gradient accent line at top */}
                    <div className={`absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent ${activeLevel.navbarAccent} to-transparent`} />

                    <div className="flex items-center gap-2 p-4">
                        <Link
                            to="/learn"
                            className={`flex-1 flex items-center justify-center gap-2.5 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300
                                ${isDashboard
                                    ? `${activeLevel.navbarActiveBg} ${activeLevel.navbarActiveText} shadow-lg ${activeLevel.navbarActiveShadow} border ${activeLevel.navbarActiveBorder}`
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
            <main ref={mainRef} className="flex-1 h-full overflow-y-auto relative bg-[#020617] flex flex-col">
                {/* Top Header */}
                <header ref={headerRef} className={`sticky top-0 z-30 flex items-center justify-between md:py-5 bg-[#020617]/80 backdrop-blur-md border-b border-white/5 transition-all duration-300 ${isDashboard ? 'py-5' : 'py-8'} ${isSidebarOpen ? 'px-10' : `pl-[72px] ${isDashboard ? 'pr-4 md:pr-10' : 'pr-10'}`}`}>
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



                    {/* User Profile - Top Right - Hidden on mobile when in lesson OR when sidebar is open */}
                    <div className={`items-center gap-5 ${isSidebarOpen ? 'hidden sm:flex' : (lessonId ? 'hidden sm:flex' : 'flex')} ${isDashboard ? '-mt-1 md:mt-0' : ''}`}>
                        <div className="text-right hidden sm:block">
                            <p className="text-[15px] font-bold text-white leading-none">Student Account</p>
                            <p className={`text-xs ${activeLevel.textColor} font-medium uppercase tracking-wide mt-1.5`}>
                                {currentLevel === 'pro' ? 'Pro Plan' : currentLevel === 'expert' ? 'Expert Plan' : 'Free Plan'}
                            </p>
                        </div>
                        <div className={`w-11 h-11 rounded-full bg-gradient-to-br ${activeLevel.gradient} flex items-center justify-center text-sm font-bold shadow-lg ${activeLevel.shadow} border border-white/10 cursor-pointer hover:scale-105 transition-transform`}>
                            ME
                        </div>
                    </div>
                </header>

                <div className={`flex-1 max-w-6xl mx-auto w-full px-8 md:px-16 ${lessonId ? 'pt-10 pb-14 md:py-14' : 'py-14'}`}>
                    {lessonId ? (
                        <Outlet />
                    ) : (
                        <CourseDashboard
                            completedLessons={completedLessons}
                            progressPercentage={progressPercentage}
                            isLessonLocked={isLessonLocked}
                            isLessonCompleted={isLessonCompleted}
                            getModuleProgress={getModuleProgress}
                            onProUnlock={handleProUnlock}
                            onExpertUnlock={handleExpertUnlock}

                            currentLevel={currentLevel}
                            levelContent={levelContent}
                        />
                    )}
                </div>
            </main>

            {/* ══════════════════════════════════════════════════════════
                FLYING ROCKET OVERLAY — animated from dashboard to header
                ══════════════════════════════════════════════════════════ */}
            {/* ═══ Global Level Switcher (Fixed on top of everything) ═══ */}
            <div className={`fixed top-0 z-[50] flex justify-center md:pt-[18px] pointer-events-none transition-all duration-300 ${isDashboard ? 'pt-[18px]' : 'pt-[22px]'} ${isSidebarOpen ? 'md:left-[352px] md:right-0 left-0 right-0 opacity-0 md:opacity-100' : 'left-0 right-0'}`}>
                <div className="flex flex-col items-center pointer-events-auto">
                    {/* Active level icon — Always visible */}
                    <AnimatePresence>
                        {!lessonId && (
                            <motion.button
                                ref={levelSwitcherRef}
                                key="level-switcher-btn"
                                initial={{ opacity: 0, scale: 0, rotate: -180 }}
                                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                                exit={{ opacity: 0, scale: 0, rotate: 180 }}
                                transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                                onClick={() => setLevelSwitcherOpen(prev => !prev)}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                className={`w-11 h-11 rounded-xl bg-gradient-to-br ${activeLevel.gradient} flex items-center justify-center shadow-lg ${activeLevel.shadow} border ${activeLevel.borderActive} cursor-pointer transition-shadow`}
                            >
                                <activeLevel.Icon size={20} className="text-white" />
                            </motion.button>
                        )}
                    </AnimatePresence>

                    {/* Dropdown with other levels */}
                    <AnimatePresence>
                        {levelSwitcherOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: -8, scale: 0.9 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: -8, scale: 0.9 }}
                                transition={{ duration: 0.2, ease: 'easeOut' }}
                                className="mt-3 flex items-center gap-5 px-3 py-2.5 rounded-2xl bg-[#0B0F1C]/95 backdrop-blur-md border border-white/10 shadow-2xl shadow-black/40"
                            >

                                {otherLevels.map((level) => {
                                    const isUnlocked = unlockedLevels[level.key];
                                    if (!isUnlocked) return null; // Hide locked levels to avoid spoilers
                                    return (
                                        <motion.button
                                            key={level.key}
                                            whileHover={isUnlocked ? { scale: 1.1 } : {}}
                                            whileTap={isUnlocked ? { scale: 0.95 } : {}}
                                            onClick={() => {
                                                if (isUnlocked) {
                                                    // Trigger explosion if switching to a new level
                                                    if (level.key !== currentLevel) {
                                                        triggerExplosion(level.key);
                                                    }
                                                    setCurrentLevel(level.key);
                                                    setLevelSwitcherOpen(false);
                                                    navigate('/learn');
                                                }
                                            }}
                                            className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-all relative ${isUnlocked
                                                ? `bg-gradient-to-br ${level.gradient} ${level.shadow} shadow-lg ${level.borderActive} cursor-pointer`
                                                : 'bg-slate-800/60 border-white/5 opacity-40 cursor-not-allowed'
                                                }`}
                                            title={isUnlocked ? level.label : `${level.label} (Locked)`}
                                        >
                                            <level.Icon size={18} className={isUnlocked ? 'text-white' : 'text-slate-500'} />
                                            {!isUnlocked && (
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <Lock size={10} className="text-slate-400" />
                                                </div>
                                            )}
                                        </motion.button>
                                    );
                                })}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            <AnimatePresence>
                {flyingObject && (
                    <>
                        {/* The flying object */}
                        <motion.div
                            key="flying-object"
                            style={{
                                position: 'fixed',
                                zIndex: 9999,
                            }}
                            initial={{
                                left: flyingObject.startX - 40,
                                top: flyingObject.startY - 40,
                                width: 80,
                                height: 80,
                                scale: 1,
                                opacity: 1,
                            }}
                            animate={{
                                left: flyingObject.endX - 20,
                                top: flyingObject.endY - 20,
                                width: 40,
                                height: 40,
                                scale: [1, 1.3, 0.6],
                                opacity: [1, 1, 0],
                                rotate: [0, -15, -30],
                            }}
                            transition={{
                                duration: 1.3,
                                ease: [0.22, 1, 0.36, 1],
                            }}
                            className="pointer-events-none"
                        >
                            <div className={`w-full h-full rounded-2xl bg-gradient-to-br ${flyingObject.type === 'crown' ? 'from-red-500 to-amber-600 shadow-red-500/50' : 'from-emerald-500 to-blue-600 shadow-emerald-500/50'} flex items-center justify-center shadow-2xl border border-white/20`}>
                                {flyingObject.type === 'crown' ? <Crown size={24} className="text-white" /> : <Rocket size={24} className="text-white" />}
                            </div>
                        </motion.div>

                        {/* Trail particles */}
                        {[...Array(8)].map((_, i) => (
                            <motion.div
                                key={`particle-${i}`}
                                style={{
                                    position: 'fixed',
                                    zIndex: 9998,
                                    filter: 'blur(1px)',
                                }}
                                initial={{
                                    left: flyingObject.startX,
                                    top: flyingObject.startY,
                                    width: 6 + Math.random() * 6,
                                    height: 6 + Math.random() * 6,
                                    opacity: 0.8,
                                    scale: 1,
                                }}
                                animate={{
                                    left: flyingObject.startX + (Math.random() - 0.5) * 200,
                                    top: flyingObject.startY + Math.random() * 150 + 50,
                                    opacity: 0,
                                    scale: 0,
                                }}
                                transition={{
                                    duration: 0.8 + Math.random() * 0.5,
                                    delay: i * 0.05,
                                    ease: 'easeOut',
                                }}
                                className={`pointer-events-none rounded-full ${flyingObject.type === 'crown' ? 'bg-red-400' : 'bg-emerald-400'}`}
                            />
                        ))}

                        {/* Screen flash on launch */}
                        <motion.div
                            key="screen-flash"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: [0, 0.08, 0] }}
                            transition={{ duration: 0.6, times: [0, 0.1, 1] }}
                            className={`fixed inset-0 ${flyingObject.type === 'crown' ? 'bg-red-400' : 'bg-emerald-400'} pointer-events-none`}
                            style={{ zIndex: 9997 }}
                        />
                    </>
                )}
            </AnimatePresence>

            {/* Shockwave Effect Overlay - Multi-instance Ripples */}
            <AnimatePresence>
                {explosions.map((explosion) => (
                    <div
                        key={explosion.id}
                        className="fixed inset-0 z-[45] pointer-events-none overflow-hidden"
                    >
                        {/* Container positioned at origin (the icon) */}
                        <div
                            className="absolute"
                            style={{
                                left: explosion.x,
                                top: explosion.y,
                            }}
                        >
                            {/* Ripple 1: Main heavy wave */}
                            <motion.div
                                initial={{ width: 0, height: 0, opacity: 0.8, borderWidth: 22 }}
                                animate={{ width: '250vmax', height: '250vmax', opacity: 0, borderWidth: 0 }}
                                transition={{ duration: 2, ease: "easeOut" }}
                                className={`absolute rounded-full border border-${explosion.color}-500/50 backdrop-blur-[2px] -translate-x-1/2 -translate-y-1/2`}
                            />

                            {/* Ripple 2: Secondary wave */}
                            <motion.div
                                initial={{ width: 0, height: 0, opacity: 0.6, borderWidth: 15 }}
                                animate={{ width: '250vmax', height: '250vmax', opacity: 0, borderWidth: 0 }}
                                transition={{ duration: 2, ease: "easeOut", delay: 0.2 }}
                                className={`absolute rounded-full border border-${explosion.color}-500/30 -translate-x-1/2 -translate-y-1/2`}
                            />

                            {/* Ripple 3: Outer light wave */}
                            <motion.div
                                initial={{ width: 0, height: 0, opacity: 0.4, borderWidth: 8 }}
                                animate={{ width: '250vmax', height: '250vmax', opacity: 0, borderWidth: 0 }}
                                transition={{ duration: 2, ease: "easeOut", delay: 0.4 }}
                                onAnimationComplete={() => handleExplosionComplete(explosion.id)}
                                className={`absolute rounded-full border border-${explosion.color}-400/20 -translate-x-1/2 -translate-y-1/2`}
                            />
                        </div>

                        {/* Screen Flash */}
                        <motion.div
                            initial={{ opacity: 0.3 }}
                            animate={{ opacity: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className={`absolute inset-0 bg-${explosion.color}-500/10 mix-blend-screen`}
                        />
                    </div>
                ))}
            </AnimatePresence>
        </div>
    );
}
