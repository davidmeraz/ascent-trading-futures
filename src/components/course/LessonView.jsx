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
    let activeLesson = null;
    let activeModule = null;
    let nextLessonId = null;

    // Helper to find next lesson
    let foundCurrent = false;
    Object.values(COURSE_CONTENT).forEach(mod => {
        mod.lessons.forEach(l => {
            if (foundCurrent && !nextLessonId) {
                nextLessonId = l.id;
            }
            if (l.id === lessonId) {
                activeLesson = l;
                activeModule = mod;
                foundCurrent = true;
            }
        });
    });

    // Clean up state on lesson change
    useEffect(() => {
        setQuizPassed(false);
        // Check if already passed in history (optional feature for later)
    }, [lessonId]);

    if (!activeLesson) {
        return <div className="text-center text-slate-400 mt-20">Lesson not found. Select one from the sidebar.</div>;
    }

    const handleQuizPass = () => {
        setQuizPassed(true);
        // Could save to localStorage here: `passed_lessons`
    };

    const handleQuizFail = () => {
        setQuizPassed(false);
    };

    // Custom Markdown Components for "Premium" feel
    const MarkdownComponents = {
        h1: ({ node, ...props }) => <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-blue-500 mb-8 mt-2" {...props} />,
        h2: ({ node, ...props }) => <h2 className="text-2xl font-semibold text-white mt-12 mb-6 border-b border-white/10 pb-2" {...props} />,
        p: ({ node, ...props }) => <p className="text-lg text-slate-300 leading-relaxed mb-6" {...props} />,
        ul: ({ node, ...props }) => <ul className="list-disc list-outside ml-6 space-y-2 mb-6 text-slate-300" {...props} />,
        ol: ({ node, ...props }) => <ol className="list-decimal list-outside ml-6 space-y-2 mb-6 text-slate-300" {...props} />,
        blockquote: ({ node, ...props }) => (
            <div className="border-l-4 border-emerald-500 bg-emerald-500/5 p-6 my-8 rounded-r-xl italic text-slate-200">
                {props.children}
            </div>
        ),
        // Custom handling for Pro Tips and Warnings if we had a proper parser, 
        // for now we standard blockquotes or just text styling.
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            key={lessonId} // Triggers animation on route change
            className="prose prose-invert prose-lg max-w-none pb-32"
        >
            <span className="text-sm font-bold text-emerald-500 uppercase tracking-widest mb-2 block">
                {activeModule.title}
            </span>

            {/* We're using ReactMarkdown to render the content string safely and beautifully */}
            {/* Note: You'll need to install react-markdown: npm install react-markdown */}
            <ReactMarkdown components={MarkdownComponents}>
                {activeLesson.content}
            </ReactMarkdown>

            {/* Quiz Section */}
            {activeLesson.quiz && (
                <QuizComponent
                    questions={activeLesson.quiz}
                    onPass={handleQuizPass}
                    onFail={handleQuizFail}
                />
            )}

            {/* Navigation Footer for the Lesson */}
            <div className="mt-20 pt-10 border-t border-white/10 flex justify-between items-center">
                <button className="px-6 py-3 rounded-lg border border-white/10 hover:bg-white/5 text-slate-400 hover:text-white transition-colors">
                    Previous
                </button>

                {nextLessonId ? (
                    activeLesson.quiz && !quizPassed ? (
                        <div className="flex items-center gap-2 text-slate-500 px-6 py-3 bg-white/5 rounded-lg border border-white/5 cursor-not-allowed">
                            <Lock className="w-4 h-4" />
                            Complete Quiz to Unlock Next
                        </div>
                    ) : (
                        <Link to={`/learn/${nextLessonId}`} className="px-6 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-medium transition-colors shadow-lg shadow-emerald-500/20 flex items-center gap-2">
                            Next Lesson
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    )
                ) : (
                    <div className="text-slate-500">End of Module</div>
                )}
            </div>
        </motion.div>
    );
}
