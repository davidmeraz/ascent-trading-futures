import { TrendingUp, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const scrollTo = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setIsOpen(false);
        }
    };

    return (
        <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled
            ? 'bg-[#020617]/90 backdrop-blur-xl border-b border-white/[0.06] shadow-2xl shadow-black/20'
            : 'bg-transparent border-b border-transparent'
            }`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex items-center">
                        <Link to="/" className="flex-shrink-0 flex items-center gap-2.5 group">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/20 group-hover:shadow-emerald-500/40 transition-shadow">
                                <TrendingUp className="h-4.5 w-4.5 text-white" />
                            </div>
                            <span className="font-bold text-lg tracking-tight text-white">
                                ASCENT <span className="text-emerald-400 font-light">TRADING</span>
                            </span>
                        </Link>

                        {/* Desktop nav */}
                        <div className="hidden md:block ml-10">
                            <div className="flex items-center gap-1">
                                <button onClick={() => scrollTo('features')} className="text-slate-400 hover:text-white px-3.5 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-white/5">
                                    Markets
                                </button>
                                <button onClick={() => scrollTo('learning-path')} className="text-slate-400 hover:text-white px-3.5 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-white/5">
                                    Education
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Desktop auth */}
                    <div className="hidden md:flex items-center gap-3">
                        <Link to="/login" className="text-slate-400 hover:text-white font-medium text-sm px-4 py-2 rounded-lg transition-colors hover:bg-white/5">
                            Log In
                        </Link>
                        <Link to="/register" className="bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-all shadow-lg shadow-emerald-500/15 hover:shadow-emerald-500/30 hover:-translate-y-px">
                            Get Started
                        </Link>
                    </div>

                    {/* Mobile menu button */}
                    <div className="flex md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-all"
                            aria-label="Toggle navigation menu"
                        >
                            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2, ease: 'easeInOut' }}
                        className="md:hidden bg-[#020617]/95 backdrop-blur-xl border-b border-white/[0.06] overflow-hidden"
                    >
                        <div className="px-4 pt-3 pb-5 space-y-3">
                            <div className="grid grid-cols-2 gap-3 mb-3">
                                <Link to="/login" className="text-center bg-white/5 hover:bg-white/10 text-white px-4 py-2.5 rounded-xl text-sm font-medium transition-colors border border-white/[0.06]">
                                    Log In
                                </Link>
                                <Link to="/register" className="text-center bg-gradient-to-r from-emerald-600 to-emerald-500 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors shadow-lg shadow-emerald-500/15">
                                    Get Started
                                </Link>
                            </div>
                            <div className="border-t border-white/[0.06] my-2 pt-3 space-y-1">
                                <button onClick={() => scrollTo('features')} className="block w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium text-slate-400 hover:text-white hover:bg-white/5 transition-colors">
                                    Markets
                                </button>
                                <button onClick={() => scrollTo('learning-path')} className="block w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium text-slate-400 hover:text-white hover:bg-white/5 transition-colors">
                                    Education
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
