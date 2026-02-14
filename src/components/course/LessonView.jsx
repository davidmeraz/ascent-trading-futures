import { useState, useEffect } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { motion } from 'framer-motion';
import { AlertCircle, Lightbulb, TrendingUp, Lock, ArrowRight } from 'lucide-react';
import { COURSE_CONTENT } from '../../data/courseData';
import QuizComponent from './QuizComponent';

export default function LessonView() {
    const { module, lessonId } = useParams();
    const [quizPassed, setQuizPassed] = useState(false);

    // Find the lesson in our data based on URL params
    // Searching across all modules for simplicity in this MVP
    // Helper to find next and previous lesson
    let activeLesson = null;
    let activeModule = null;
    let nextLessonId = null;
    let previousLessonId = null;

    // Flatten all lessons to an array for easier navigation logic
    const allLessons = Object.values(COURSE_CONTENT).flatMap(m => m.lessons);
    const currentIndex = allLessons.findIndex(l => l.id === lessonId);

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

    // Check if already completed on mount
    useEffect(() => {
        const stored = localStorage.getItem('completed_lessons');
        if (stored) {
            const completed = JSON.parse(stored);
            if (completed.includes(lessonId)) {
                setQuizPassed(true);
            } else {
                setQuizPassed(false);
            }
        } else {
            setQuizPassed(false);
        }
    }, [lessonId]);

    // Check lock status
    const stored = localStorage.getItem('completed_lessons');
    const completed = stored ? JSON.parse(stored) : [];
    const isLocked = currentIndex > 0 && !completed.includes(allLessons[currentIndex - 1].id);

    if (!activeLesson) {
        return <div className="text-center text-slate-400 mt-20">Lesson not found. Select one from the sidebar.</div>;
    }



    const handleQuizPass = () => {
        setQuizPassed(true);

        // Save to localStorage so Sidebar unlocks next lesson
        const stored = localStorage.getItem('completed_lessons');
        const completed = stored ? JSON.parse(stored) : [];

        if (!completed.includes(lessonId)) {
            const updated = [...completed, lessonId];
            localStorage.setItem('completed_lessons', JSON.stringify(updated));

            // Dispatch a custom event so the Sidebar (in a different component) knows to re-render
            window.dispatchEvent(new Event('storage'));
        }
    };

    const handleQuizFail = () => {
        setQuizPassed(false);
    };

    // Custom Markdown Components for "Premium" feel
    const MarkdownComponents = {
        h1: ({ node, ...props }) => <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-blue-500 mb-10 mt-2 tracking-tight" {...props} />,
        h2: ({ node, ...props }) => <h2 className="text-2xl md:text-3xl font-semibold text-white mt-16 mb-8 border-b border-white/10 pb-4 flex items-center gap-3" {...props} />,
        p: ({ node, ...props }) => <p className="text-lg text-slate-300 leading-8 mb-8 font-light" {...props} />,
        ul: ({ node, ...props }) => <ul className="list-disc list-outside ml-6 space-y-4 mb-8 text-slate-300 leading-7" {...props} />,
        ol: ({ node, ...props }) => <ol className="list-decimal list-outside ml-6 space-y-4 mb-8 text-slate-300 leading-7" {...props} />,
        li: ({ node, ...props }) => <li className="pl-2" {...props} />,
        blockquote: ({ node, ...props }) => (
            <div className="border-l-4 border-emerald-500 bg-emerald-500/5 p-8 my-10 rounded-r-2xl italic text-slate-200 text-lg shadow-sm font-medium">
                {props.children}
            </div>
        ),
        img: ({ node, ...props }) => (
            <div className="my-10">
                <img
                    {...props}
                    className="rounded-2xl border border-white/10 shadow-2xl shadow-emerald-900/20 w-full object-cover max-h-[500px]"
                    loading="lazy"
                />
                {props.alt && (
                    <p className="text-center text-slate-500 text-sm mt-3 italic">{props.alt}</p>
                )}
            </div>
        ),
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            key={lessonId} // Triggers animation on route change
            className="max-w-4xl mx-auto"
        >
            <div className="mb-4 flex items-center gap-2 text-emerald-500 text-sm font-bold uppercase tracking-widest">
                <span className="w-8 h-[1px] bg-emerald-500/50"></span>
                {activeModule.title}
            </div>

            <div className="prose prose-invert prose-lg max-w-none">
                <ReactMarkdown components={MarkdownComponents}>
                    {activeLesson.content}
                </ReactMarkdown>
            </div>

            {/* Quiz Section */}
            {activeLesson.quiz && (
                quizPassed ? (
                    <div className="mt-16 p-8 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl text-center">
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-emerald-500/20 mb-4">
                            <TrendingUp className="w-6 h-6 text-emerald-500" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2">Lesson Completed!</h3>
                        <p className="text-slate-400">You have already mastered this topic.</p>
                    </div>
                ) : (
                    <QuizComponent
                        questions={activeLesson.quiz}
                        onPass={handleQuizPass}
                        onFail={handleQuizFail}
                    />
                )
            )}

            {/* Navigation Footer for the Lesson */}
            <div className="mt-24 pt-10 border-t border-white/10 flex justify-between items-center">
                {previousLessonId ? (
                    <Link to={`/learn/${previousLessonId}`} className="px-6 py-3 rounded-lg border border-white/10 hover:bg-white/5 text-slate-400 hover:text-white transition-colors text-sm font-medium">
                        ← Previous Lesson
                    </Link>
                ) : (
                    <div></div> /* Spacer */
                )}

                {nextLessonId ? (
                    activeLesson.quiz && !quizPassed ? (
                        <div className="flex items-center gap-3 text-slate-500 px-6 py-3 bg-white/5 rounded-lg border border-white/5 cursor-not-allowed select-none">
                            <Lock className="w-4 h-4" />
                            <span className="text-sm font-medium">Pass Quiz to Unlock Next</span>
                        </div>
                    ) : (
                        <Link to={`/learn/${nextLessonId}`} className="group px-6 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition-all shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 flex items-center gap-2">
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
