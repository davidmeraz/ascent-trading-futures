import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Bug,
    RotateCcw,
    CheckCheck,
    LayoutDashboard,
    RefreshCw,
    X,
    MessageCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStorage } from '../../hooks/useStorage';
import { COURSE_CONTENT, COURSE_CONTENT_BY_LEVEL } from '../../data/courseData';

export default function DebugMenu() {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const menuRef = useRef(null);

    // Storage hooks
    const [completedLessons, setCompletedLessons] = useStorage('completed_lessons', []);
    const [currentLevel, setCurrentLevel] = useStorage('current_level', 'noob');
    const [noobUnlocked, setNoobUnlocked] = useStorage('noob_level_unlocked', false);
    const [proUnlocked, setProUnlocked] = useStorage('pro_level_unlocked', false);
    const [expertUnlocked, setExpertUnlocked] = useStorage('expert_level_unlocked', false);

    // Close when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // 1. Restaurar Nivel (Reset current level progress)
    const handleResetLevel = () => {
        if (!currentLevel || currentLevel === 'none') return;

        const levelData = COURSE_CONTENT_BY_LEVEL[currentLevel];
        if (!levelData) return;

        // Get all lesson IDs for this level
        const levelLessonIds = Object.values(levelData)
            .flatMap(module => module.lessons.map(l => l.id));

        // Filter out these IDs from completed_lessons
        const newCompleted = completedLessons.filter(id => !levelLessonIds.includes(id));
        setCompletedLessons(newCompleted); // useStorage hook handles the event dispatch

        // Also ensure the level itself keeps its unlock status? 
        // "Restaurar nivel" usually implies resetting progress within it.
        // We don't lock the level itself, just the lessons.
        setIsOpen(false);
        window.location.reload(); // Refresh to ensure all states sync perfectly
    };

    // 2. Reiniciar Curso (Full Reset)
    const handleRestartCourse = () => {
        if (confirm('¿Estás seguro de que quieres reiniciar todo el progreso?')) {
            localStorage.clear();
            // We might want to keep some non-course settings? 
            // But "Reiniciar curso" implies a fresh start.
            // Let's explicitly reset known keys to be safe
            setCompletedLessons([]);
            setCurrentLevel('noob');
            setNoobUnlocked(true); // Noob is always unlocked? Check CourseLayout logic.
            setProUnlocked(false);
            setExpertUnlocked(false);

            navigate('/');
            window.location.reload();
        }
    };

    // 3. Completar Curso (Complete content only)
    const handleCompleteCourse = () => {
        const allLessonIds = Object.values(COURSE_CONTENT)
            .flatMap(module => module.lessons.map(l => l.id));

        setCompletedLessons(allLessonIds);
        // Do NOT unlock levels (pro/expert) automatically

        setIsOpen(false);
        window.location.reload();
    };

    // 4. Dashboard
    const handleDashboard = () => {
        navigate('/learn');
        setIsOpen(false);
    };

    return (
        <div className="fixed bottom-6 right-6 z-[100]" ref={menuRef}>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 20 }}
                        className="absolute bottom-16 right-0 w-64 bg-[#0B0F1C] border border-white/10 rounded-2xl shadow-2xl backdrop-blur-xl overflow-hidden"
                    >
                        <div className="p-4 border-b border-white/5 bg-white/5">
                            <h3 className="text-sm font-bold text-white flex items-center gap-2">
                                <Bug size={16} className="text-emerald-400" />
                                Menú de Pruebas
                            </h3>
                        </div>

                        <div className="p-2 space-y-1">
                            <button
                                onClick={handleResetLevel}
                                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-slate-300 hover:text-white hover:bg-white/5 transition-colors text-left"
                            >
                                <RefreshCw size={16} className="text-blue-400" />
                                Reiniciar Niveles
                            </button>

                            <button
                                onClick={handleRestartCourse}
                                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-slate-300 hover:text-white hover:bg-white/5 transition-colors text-left"
                            >
                                <RotateCcw size={16} className="text-red-400" />
                                Reiniciar Curso
                            </button>


                            <button
                                onClick={handleCompleteCourse}
                                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-slate-300 hover:text-white hover:bg-white/5 transition-colors text-left"
                            >
                                <CheckCheck size={16} className="text-emerald-400" />
                                Completar Curso
                            </button>

                            <div className="h-px bg-white/5 my-1" />

                            <div className="px-3 py-1 text-xs font-bold text-slate-500 uppercase tracking-wider">
                                Desbloqueos Rápidos
                            </div>

                            <button
                                onClick={() => setProUnlocked(!proUnlocked)}
                                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-slate-300 hover:text-white hover:bg-white/5 transition-colors text-left"
                            >
                                {proUnlocked ? (
                                    <CheckCheck size={16} className="text-blue-400" />
                                ) : (
                                    <X size={16} className="text-slate-500" />
                                )}
                                Nivel Pro {proUnlocked ? '(ON)' : '(OFF)'}
                            </button>

                            <button
                                onClick={() => setExpertUnlocked(!expertUnlocked)}
                                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-slate-300 hover:text-white hover:bg-white/5 transition-colors text-left"
                            >
                                {expertUnlocked ? (
                                    <CheckCheck size={16} className="text-red-400" />
                                ) : (
                                    <X size={16} className="text-slate-500" />
                                )}
                                Nivel Expert {expertUnlocked ? '(ON)' : '(OFF)'}
                            </button>

                            <div className="h-px bg-white/5 my-1" />

                            <div className="px-3 py-1 text-xs font-bold text-slate-500 uppercase tracking-wider">
                                Test Animaciones
                            </div>

                            <button
                                onClick={() => {
                                    import('canvas-confetti').then((confetti) => {
                                        confetti.default({
                                            particleCount: 100,
                                            spread: 70,
                                            origin: { y: 0.6 },
                                            colors: ['#34d399', '#60a5fa', '#f87171']
                                        });
                                    });
                                }}
                                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-slate-300 hover:text-white hover:bg-white/5 transition-colors text-left"
                            >
                                <span className="text-lg">🎉</span>
                                Confetti
                            </button>

                            <button
                                onClick={() => {
                                    // Trigger a rocket launch event that CourseLayout listens to?
                                    // Or just simulate the unlock callback if possible.
                                    // simpler: just re-trigger the state unlock for pro
                                    if (window.confirm('Esto simulará el desbloqueo del nivel PRO (Rocket). ¿Continuar?')) {
                                        setProUnlocked(false);
                                        setTimeout(() => {
                                            const rocketBtn = document.querySelector('button'); // A bit risky selectors
                                            // Better: Dispatch a custom event or just let the user use the Hold button after reset
                                            // For now, let's just do confetti as the main visual test
                                            import('canvas-confetti').then((confetti) => {
                                                const end = Date.now() + 1000;
                                                (function frame() {
                                                    confetti.default({
                                                        particleCount: 5,
                                                        angle: 60,
                                                        spread: 55,
                                                        origin: { x: 0 },
                                                        colors: ['#60a5fa']
                                                    });
                                                    confetti.default({
                                                        particleCount: 5,
                                                        angle: 120,
                                                        spread: 55,
                                                        origin: { x: 1 },
                                                        colors: ['#60a5fa']
                                                    });
                                                    if (Date.now() < end) {
                                                        requestAnimationFrame(frame);
                                                    }
                                                }());
                                            });
                                        }, 100);
                                    }
                                }}
                                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-slate-300 hover:text-white hover:bg-white/5 transition-colors text-left"
                            >
                                <span className="text-lg">🚀</span>
                                Efecto Cohete (Pro)
                            </button>

                            <div className="h-px bg-white/5 my-1" />

                            <button
                                onClick={handleDashboard}
                                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-slate-300 hover:text-white hover:bg-white/5 transition-colors text-left"
                            >
                                <LayoutDashboard size={16} className="text-amber-400" />
                                Ir al Dashboard
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`p-3.5 rounded-full shadow-lg border transition-all duration-300 ${isOpen
                    ? 'bg-red-500/20 border-red-500/50 text-red-400 rotate-90'
                    : 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400 hover:scale-110'
                    }`}
            >
                {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
            </button>
        </div >
    );
}
