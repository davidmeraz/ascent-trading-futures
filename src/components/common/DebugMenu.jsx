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

    // Terminal State
    const [input, setInput] = useState('');
    const [logs, setLogs] = useState(['> ROBCO INDUSTRIES (TM) TERMILINK PROTOCOL', '> ENTER PASSWORD NOW', '> **********', '> ACCESS GRANTED', '> WELCOME TO DEBUG CONSOLE']);
    const inputRef = useRef(null);

    const addLog = (msg) => {
        setLogs(prev => [...prev.slice(-10), `> ${msg}`]);
    };

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

    // Toggle with TAB key
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Tab') {
                e.preventDefault(); // Prevent focus switching
                setIsOpen(prev => !prev);
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, []);

    // 1. Restaurar Nivel (Reset current level progress)
    const handleResetLevel = () => {
        if (!currentLevel || currentLevel === 'none') {
            alert("No level selected to reset.");
            return;
        }

        const levelData = COURSE_CONTENT_BY_LEVEL[currentLevel];
        if (!levelData) return;

        // Get all lesson IDs for this level
        const levelLessonIds = Object.values(levelData)
            .flatMap(module => module.lessons.map(l => l.id));

        // Filter out these IDs from completed_lessons
        const newCompleted = completedLessons.filter(id => !levelLessonIds.includes(id));
        setCompletedLessons(newCompleted); // useStorage hook handles the event dispatch

        console.log(`[Debug] Reset level: ${currentLevel}`);
        setIsOpen(false);
        window.location.reload();
    };

    // 2. Reiniciar Curso (Full Reset)
    const handleRestartCourse = () => {
        if (confirm('¿Estás seguro de que quieres reiniciar todo el progreso?')) {
            localStorage.clear();
            setCompletedLessons([]);
            setCurrentLevel('noob');
            setNoobUnlocked(true);
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
        console.log("[Debug] All lessons marked completed.");
        setIsOpen(false);
        window.location.reload();
    };

    const handleCommand = (e) => {
        if (e.key === 'Enter') {
            const cmd = input.trim().toLowerCase();
            addLog(input);
            setInput('');

            switch (cmd) {
                case 'timer reset':
                    // Clear all quiz lockouts
                    let clearedCount = 0;
                    for (let i = 0; i < localStorage.length; i++) {
                        const key = localStorage.key(i);
                        if (key && key.startsWith('quiz_lockout_')) {
                            localStorage.removeItem(key);
                            clearedCount++;
                            i--; // Adjust index after removal
                        }
                    }
                    addLog(`CLEARED ${clearedCount} ACTIVE TIMER LOCKS.`);
                    // Dispatch custom event to update UI immediately
                    window.dispatchEvent(new Event('quizLockUpdate'));
                    window.dispatchEvent(new Event('storage'));

                    // Close terminal on success
                    setTimeout(() => setIsOpen(false), 500);
                    break;

                case cmd.match(/^timer set (\d+)$/)?.[0]:
                    const seconds = parseInt(cmd.split(' ')[2], 10);
                    if (!isNaN(seconds)) {
                        const allLessonIds = Object.values(COURSE_CONTENT)
                            .flatMap(module => module.lessons.map(l => l.id));

                        const lockUntil = Date.now() + (seconds * 1000);
                        allLessonIds.forEach(id => {
                            localStorage.setItem(`quiz_lockout_${id}`, lockUntil.toString());
                        });
                        addLog(`ALL QUIZZES LOCKED FOR ${seconds} SECONDS.`);
                        window.dispatchEvent(new Event('quizLockUpdate'));
                        window.dispatchEvent(new Event('storage'));

                        // Close terminal on success
                        setTimeout(() => setIsOpen(false), 500);
                    } else {
                        addLog('INVALID TIME FORMAT.');
                    }
                    break;

                case 'help':
                    addLog('AVAILABLE COMMANDS:');
                    addLog('  help       - Show list of commands');
                    addLog('  clear      - Clear terminal logs');
                    addLog('  reset level- Reset current level progress');
                    addLog('  timer reset- Remove all quiz timeout locks');
                    addLog('  timer set N- Lock all quizzes for N seconds');
                    addLog('  toggle pro - Toggle Pro Level');
                    addLog('  toggle exp - Toggle Expert Level');
                    addLog('  exit       - Close terminal');
                    break;
                case 'clear':
                    setLogs([]);
                    break;
                case 'exit':
                    setIsOpen(false);
                    break;
                case 'reset level':
                    handleResetLevel();
                    addLog('EXECUTING LEVEL RESET...');
                    break;
                case 'reset all':
                    handleRestartCourse();
                    addLog('INITIATING FACTORY RESET...');
                    break;
                case 'complete':
                    handleCompleteCourse();
                    addLog('OVERRIDING COMPLETION STATUS...');
                    break;
                case 'toggle pro':
                    setProUnlocked(!proUnlocked);
                    addLog(`PRO LEVEL STATUS: ${!proUnlocked ? 'UNLOCKED' : 'LOCKED'}`);
                    break;
                case 'toggle exp':
                    setExpertUnlocked(!expertUnlocked);
                    addLog(`EXPERT LEVEL STATUS: ${!expertUnlocked ? 'UNLOCKED' : 'LOCKED'}`);
                    break;
                case 'test confetti':
                    import('canvas-confetti').then((confetti) => {
                        confetti.default({
                            particleCount: 100,
                            spread: 70,
                            origin: { y: 0.6 },
                            colors: ['#34d399', '#60a5fa', '#f87171']
                        });
                    });
                    addLog('DISPENSING CONFETTI...');
                    break;
                default:
                    addLog(`UNKNOWN COMMAND: "${cmd}". TYPE "help".`);
            }
        }
    };

    // Auto-focus input when opened
    useEffect(() => {
        if (isOpen && inputRef.current) {
            setTimeout(() => inputRef.current.focus(), 100);
        }
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center pointer-events-none font-mono">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm pointer-events-auto"
                        onClick={() => setIsOpen(false)}
                    />

                    {/* Retro Terminal Window */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative w-[700px] h-[500px] bg-black border-2 border-emerald-500/50 rounded-lg shadow-[0_0_50px_rgba(16,185,129,0.2)] overflow-hidden pointer-events-auto flex flex-col"
                        onClick={() => inputRef.current?.focus()}
                    >
                        {/* CRT Scanline Overlay */}
                        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-20 bg-[length:100%_2px,3px_100%] pointer-events-none opacity-20" />

                        {/* Screen Flicker / Glow */}
                        <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.9)] z-10 pointer-events-none" />

                        {/* Content Area */}
                        <div className="relative z-0 p-6 flex flex-col h-full text-emerald-500 drop-shadow-[0_0_5px_rgba(16,185,129,0.8)]">
                            {/* Header */}
                            <div className="flex justify-between border-b-2 border-emerald-500/50 pb-2 mb-4 uppercase tracking-widest text-xs">
                                <span>ROBCO INDUSTRIES (TM) TERMILINK PROTOCOL</span>
                                <span>{(currentLevel || 'UNKNOWN').toUpperCase()} ACCESS</span>
                            </div>

                            {/* Logs Output */}
                            <div className="flex-1 overflow-y-auto space-y-1 mb-4 font-bold text-sm scrollbar-hide">
                                {logs.map((log, i) => (
                                    <div key={i} className="opacity-90">{log}</div>
                                ))}
                            </div>

                            {/* Input Area */}
                            <div className="flex items-center gap-2 border-t-2 border-emerald-500/30 pt-4 text-emerald-400">
                                <span className="animate-pulse">{'>'}</span>
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={handleCommand}
                                    className="bg-transparent border-none outline-none flex-1 font-bold uppercase placeholder-emerald-800"
                                    placeholder="ENTER COMMAND..."
                                    autoComplete="off"
                                    autoFocus
                                />
                                <div className="w-3 h-5 bg-emerald-500 animate-pulse" />
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
