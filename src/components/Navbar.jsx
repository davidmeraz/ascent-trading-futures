import { TrendingUp, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="fixed w-full z-50 bg-[#020617]/80 backdrop-blur-md border-b border-white/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <div className="flex-shrink-0 flex items-center gap-2">
                            <TrendingUp className="h-8 w-8 text-emerald-500" />
                            <span className="font-bold text-xl tracking-tight text-white">
                                ASCENT <span className="text-emerald-500 font-light">TRADING</span>
                            </span>
                        </div>
                        <div className="hidden md:block">
                            <div className="ml-10 flex items-baseline space-x-4">
                                <a href="#" className="hover:bg-white/10 px-3 py-2 rounded-md text-sm font-medium transition-colors">Markets</a>
                                <a href="#" className="hover:bg-white/10 px-3 py-2 rounded-md text-sm font-medium transition-colors">Education</a>
                                <a href="#" className="hover:bg-white/10 px-3 py-2 rounded-md text-sm font-medium transition-colors">About</a>
                            </div>
                        </div>
                    </div>
                    <div className="hidden md:block">
                        <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
                            Start Learning Free
                        </button>
                    </div>
                    <div className="-mr-2 flex md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-white/10 focus:outline-none"
                        >
                            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {isOpen && (
                <div className="md:hidden bg-[#020617] border-b border-white/10">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <a href="#" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-white/10">Markets</a>
                        <a href="#" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-white/10">Education</a>
                        <a href="#" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-white/10">About</a>
                        <button className="w-full mt-4 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-md text-base font-medium transition-colors">
                            Start Learning Free
                        </button>
                    </div>
                </div>
            )}
        </nav>
    );
}
