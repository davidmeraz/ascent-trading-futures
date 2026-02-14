import { TrendingUp, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const scrollTo = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setIsOpen(false);
        }
    };

    return (
        <nav className="fixed w-full z-50 bg-[#020617]/80 backdrop-blur-md border-b border-white/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/" className="flex-shrink-0 flex items-center gap-2">
                            <TrendingUp className="h-8 w-8 text-emerald-500" />
                            <span className="font-bold text-xl tracking-tight text-white">
                                ASCENT <span className="text-emerald-500 font-light">TRADING</span>
                            </span>
                        </Link>
                        <div className="hidden md:block">
                            <div className="ml-10 flex items-baseline space-x-4">
                                <button onClick={() => scrollTo('features')} className="hover:bg-white/10 px-3 py-2 rounded-md text-sm font-medium transition-colors text-white/80 hover:text-white">Markets</button>
                                <button onClick={() => scrollTo('learning-path')} className="hover:bg-white/10 px-3 py-2 rounded-md text-sm font-medium transition-colors text-white/80 hover:text-white">Education</button>
                            </div>
                        </div>
                    </div>
                    <div className="hidden md:flex items-center gap-4">
                        <Link to="/login" className="text-slate-300 hover:text-white font-medium text-sm transition-colors">
                            Log In
                        </Link>
                        <Link to="/register" className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-all shadow-lg shadow-emerald-900/20 hover:shadow-emerald-900/40">
                            Register
                        </Link>
                    </div>
                    <div className="-mr-2 flex md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-white/10 focus:outline-none"
                            aria-label="Toggle navigation menu"
                        >
                            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {isOpen && (
                <div className="md:hidden bg-[#020617] border-b border-white/10">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <div className="grid grid-cols-2 gap-3 mb-4 px-3">
                            <Link to="/login" className="text-center w-full bg-white/5 hover:bg-white/10 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors border border-white/5">
                                Log In
                            </Link>
                            <Link to="/register" className="text-center w-full bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors shadow-lg shadow-emerald-900/20">
                                Register
                            </Link>
                        </div>
                        <div className="border-t border-white/5 my-2 pt-2">
                            <button onClick={() => scrollTo('features')} className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-slate-400 hover:text-white hover:bg-white/5">Markets</button>
                            <button onClick={() => scrollTo('learning-path')} className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-slate-400 hover:text-white hover:bg-white/5">Education</button>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}
