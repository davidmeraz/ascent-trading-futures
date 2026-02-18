import { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { motion } from 'framer-motion';
import { TrendingUp, Lock, ArrowRight } from 'lucide-react';
import { COURSE_CONTENT } from '../../../data/courseData';
import { useStorage, getStorageValue } from '../../../hooks/useStorage';
import QuizComponent from './QuizComponent';
import PrismaticImage from '../ui/PrismaticImage';

/**
 * Custom Markdown renderers — defined outside the component
 * to avoid recreating the object on every render.
 */
// Define theme colors for reference if needed, although mostly handled by Tailwind classes in theme object
const THEME_COLORS = {
    noob: { hex: '#34d399', rgb: '52, 211, 153', tw: 'emerald' },
    pro: { hex: '#60a5fa', rgb: '96, 165, 250', tw: 'blue' },
    expert: { hex: '#f87171', rgb: '248, 113, 113', tw: 'red' }
};

export default function LessonView({ currentLevel: propLevel }) {
    const { lessonId } = useParams();
    const [quizPassed, setQuizPassed] = useState(false);

    // Get current level from props or storage
    const storageLevel = getStorageValue('current_level', 'noob');
    const realCurrentLevel = propLevel || storageLevel;

    // State for the displayed level colors (delayed)
    const [renderLevel, setRenderLevel] = useState(realCurrentLevel);

    // Initial sync and delayed update
    useEffect(() => {
        // If it's the first time or mismatch, wait 0.61s before syncing (matches Layout center delay)
        if (realCurrentLevel !== renderLevel) {
            const timer = setTimeout(() => {
                setRenderLevel(realCurrentLevel);
            }, 612); // 0.61s delay

            return () => clearTimeout(timer);
        }
    }, [realCurrentLevel, renderLevel]);

    // Theme configuration based on RENDER level (delayed)
    const theme = useMemo(() => {
        const colors = {
            noob: {
                primary: 'text-emerald-400',
                gradient: 'from-emerald-400 to-emerald-600',
                border: 'border-emerald-500',
                bg: 'bg-emerald-500',
                bgSoft: 'bg-emerald-500/10',
                blockquoteBg: 'bg-emerald-500/5',
                button: 'bg-emerald-600 hover:bg-emerald-500',
                shadow: 'shadow-emerald-500/20 hover:shadow-emerald-500/40',
                icon: 'text-emerald-500',
            },
            pro: {
                primary: 'text-blue-400',
                gradient: 'from-blue-400 to-blue-600',
                border: 'border-blue-500',
                bg: 'bg-blue-500',
                bgSoft: 'bg-blue-500/10',
                blockquoteBg: 'bg-blue-500/5',
                button: 'bg-blue-600 hover:bg-blue-500',
                shadow: 'shadow-blue-500/20 hover:shadow-blue-500/40',
                icon: 'text-blue-500',
            },
            expert: {
                primary: 'text-red-400',
                gradient: 'from-red-400 to-red-600',
                border: 'border-red-500',
                bg: 'bg-red-500',
                bgSoft: 'bg-red-500/10',
                blockquoteBg: 'bg-red-500/5',
                button: 'bg-red-600 hover:bg-red-500',
                shadow: 'shadow-red-500/20 hover:shadow-red-500/40',
                icon: 'text-red-500',
            }
        };
        return colors[renderLevel] || colors.noob;
    }, [renderLevel]);

    // Dynamic Markdown Components
    const MarkdownComponents = useMemo(() => ({
        h1: ({ ...props }) => <h1 className={`text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${theme.gradient} mb-10 mt-2 tracking-tight`} {...props} />,
        h2: ({ ...props }) => <h2 className="text-2xl md:text-3xl font-semibold text-white mt-16 mb-8 border-b border-white/10 pb-4 flex items-center gap-3" {...props} />,
        h3: ({ ...props }) => <h3 className="text-xl md:text-2xl font-semibold text-white mt-10 mb-4" {...props} />,
        p: ({ ...props }) => <p className="text-lg text-slate-300 leading-8 mb-8 font-light" {...props} />,
        ul: ({ ...props }) => <ul className="list-disc list-outside ml-6 space-y-4 mb-8 text-slate-300 leading-7" {...props} />,
        ol: ({ ...props }) => <ol className="list-decimal list-outside ml-6 space-y-4 mb-8 text-slate-300 leading-7" {...props} />,
        li: ({ ...props }) => <li className="pl-2" {...props} />,
        blockquote: ({ children }) => (
            <div className={`border-l-4 ${theme.border} ${theme.blockquoteBg} p-8 my-10 rounded-r-2xl italic text-slate-200 text-lg shadow-sm font-medium`}>
                {children}
            </div>
        ),
        a: ({ ...props }) => <a className={`${theme.primary} hover:underline font-medium`} {...props} />,
        strong: ({ ...props }) => <strong className={`${theme.primary} font-bold`} {...props} />,
        img: ({ alt, src }) => <PrismaticImage src={src} alt={alt} level={renderLevel} />,
    }), [theme, renderLevel]);

    // Find lesson and navigation data
    const allLessons = useMemo(
        () => Object.values(COURSE_CONTENT).flatMap(m => m.lessons),
        []
    );
    const currentIndex = allLessons.findIndex(l => l.id === lessonId);

    let activeLesson = null;
    let activeModule = null;
    let nextLessonId = null;
    let previousLessonId = null;

    if (currentIndex !== -1) {
        activeLesson = allLessons[currentIndex];

        // Find module for the active lesson
        Object.values(COURSE_CONTENT).forEach(mod => {
            if (mod.lessons.find(l => l.id === lessonId)) {
                activeModule = mod;
            }
        });

        if (currentIndex > 0) {
            previousLessonId = allLessons[currentIndex - 1].id;
        }
        if (currentIndex < allLessons.length - 1) {
            nextLessonId = allLessons[currentIndex + 1].id;
        }
    }

    const [completedLessons, setCompletedLessons] = useStorage('completed_lessons', []);

    // Check if already completed on mount or when lesson changes
    useEffect(() => {
        setQuizPassed(completedLessons.includes(lessonId));
    }, [lessonId, completedLessons]);

    if (!activeLesson) {
        return <div className="text-center text-slate-400 mt-20">Lesson not found. Select one from the sidebar.</div>;
    }

    const handleQuizPass = () => {
        setQuizPassed(true);
        if (!completedLessons.includes(lessonId)) {
            setCompletedLessons([...completedLessons, lessonId]);
        }
    };

    const handleQuizFail = () => {
        setQuizPassed(false);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            key={lessonId}
            className="max-w-4xl mx-auto"
        >
            <div className={`mb-4 flex items-center gap-2 ${theme.primary} text-sm font-bold uppercase tracking-widest`}>
                <span className={`w-8 h-[1px] ${theme.bg}`}></span>
                {activeModule?.title || 'Course'}
            </div>

            <div className="prose prose-invert prose-lg max-w-none">
                <ReactMarkdown components={MarkdownComponents}>
                    {activeLesson.content}
                </ReactMarkdown>
            </div>

            {/* Quiz Section */}
            {activeLesson.quiz && (
                quizPassed ? (
                    <div className={`mt-16 p-8 ${theme.bgSoft} border ${theme.border}/20 rounded-2xl text-center`}>
                        <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full ${theme.bg}/20 mb-4`}>
                            <TrendingUp className={`w-6 h-6 ${theme.icon}`} />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2">Lesson Completed!</h3>
                        <p className="text-slate-400">You have already mastered this topic.</p>
                    </div>
                ) : (
                    <QuizComponent
                        lessonId={lessonId}
                        questions={activeLesson.quiz}
                        onPass={handleQuizPass}
                        onFail={handleQuizFail}
                        theme={theme}
                    />
                )
            )}

            {/* Navigation Footer */}
            <div className="mt-24 pt-10 border-t border-white/10 flex justify-between items-center">
                {previousLessonId ? (
                    <Link to={`/learn/${previousLessonId}`} className="px-6 py-3 rounded-lg border border-white/10 hover:bg-white/5 text-slate-400 hover:text-white transition-colors text-sm font-medium">
                        ← Previous Lesson
                    </Link>
                ) : (
                    <div></div>
                )}

                {nextLessonId ? (
                    activeLesson.quiz && !quizPassed ? (
                        <div className="flex items-center gap-3 text-slate-500 px-6 py-3 bg-white/5 rounded-lg border border-white/5 cursor-not-allowed select-none">
                            <Lock className="w-4 h-4" />
                            <span className="text-sm font-medium">Pass Quiz to Unlock Next</span>
                        </div>
                    ) : (
                        <Link to={`/learn/${nextLessonId}`} className={`group px-6 py-3 rounded-lg ${theme.button} text-white font-bold transition-all shadow-lg ${theme.shadow} flex items-center gap-2`}>
                            Next Lesson
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    )
                ) : (
                    <div className="text-slate-500 font-medium">End of Module</div>
                )}
            </div>
        </motion.div>
    );
}
