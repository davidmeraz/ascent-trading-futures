import { useState } from 'react';
import { Link, Outlet, useParams } from 'react-router-dom';
import { Book, Circle, Menu, X, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

// Mock data integration (in a real app this would come from the router or context)
const COURSE_CONTENT = {
    "module-1": {
        title: "Module 1: Market Mechanics",
        lessons: [
            { id: "futures-origin", title: "The Origin Story" },
            { id: "futures-contracts-types", title: "Contracts" },
        ]
    }
};

export default function CourseLayout() {
    // Basic implementation of the CourseLayout
    // This will render the sidebar and the main content area (Outlet)

    // Using simple state for mobile sidebar toggle
    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const { lessonId } = useParams(); // To highlight active link

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
                animate={{ x: isSidebarOpen ? 0 : -300 }} // Simple toggle animation
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className={`fixed md:relative z-40 w-72 h-full bg-[#0B0F1C] border-r border-white/5 flex flex-col shrink-0`}
            >
                {/* Sidebar Header */}
                <div className="p-6 border-b border-white/5">
                    <Link to="/" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-6 text-sm font-medium">
                        <ArrowLeft size={16} />
                        Back to Home
                    </Link>
                    <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-blue-500">
                        The Foundation
                    </h2>
                    <p className="text-xs text-slate-500 mt-2 uppercase tracking-wide font-semibold">Phase 1: Noob to Trader</p>
                </div>

                {/* Sidebar Content (Modules List) */}
                <div className="flex-1 overflow-y-auto p-4 space-y-8 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
                    {Object.entries(COURSE_CONTENT).map(([key, module]) => (
                        <div key={key}>
                            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 px-2">
                                {module.title}
                            </h3>
                            <div className="space-y-1">
                                {module.lessons.map((lesson) => {
                                    const isActive = lessonId === lesson.id;
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
                                            {isActive
                                                ? <Book size={16} className="text-emerald-400" />
                                                : <Circle size={16} className="opacity-30 group-hover:opacity-100 transition-opacity" />
                                            }
                                            {lesson.title}
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Sidebar Footer (User Status / Branding) */}
                <div className="p-4 border-t border-white/5 bg-[#050810]">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center text-xs font-bold">
                            ME
                        </div>
                        <div>
                            <p className="text-sm font-medium text-white">Student Account</p>
                            <p className="text-xs text-slate-500">Free Access</p>
                        </div>
                    </div>
                </div>
            </motion.aside>

            {/* Main Content Area */}
            <main className="flex-1 h-full overflow-y-auto relative scroll-smooth bg-[#020617]">
                <div className="max-w-4xl mx-auto px-6 md:px-12 py-16 min-h-full">
                    <Outlet /> {/* Renders the LessonView here */}
                </div>
            </main>
        </div>
    );
}
