import { TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <footer className="relative bg-[#020617] border-t border-white/[0.04] pt-20 pb-10 overflow-hidden">
            {/* Subtle bg glow */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-emerald-500/[0.02] rounded-full blur-[150px]" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    {/* Brand */}
                    <div className="col-span-1 md:col-span-1">
                        <Link to="/" className="flex items-center gap-2.5 mb-5">
                            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/15">
                                <TrendingUp className="h-3.5 w-3.5 text-white" />
                            </div>
                            <span className="font-bold text-base tracking-tight text-white">
                                ASCENT <span className="text-emerald-400 font-light">TRADING</span>
                            </span>
                        </Link>
                        <p className="text-slate-600 text-sm leading-relaxed">
                            Professional education for the modern futures trader. Master the markets with institutional-grade strategies and risk management.
                        </p>
                    </div>

                    {/* Links columns */}
                    <div>
                        <h4 className="font-semibold text-white text-sm mb-4">Platform</h4>
                        <ul className="space-y-2.5 text-sm text-slate-500">
                            <li><Link to="/learn" className="hover:text-emerald-400 transition-colors">Courses</Link></li>
                            <li><Link to="/login" className="hover:text-emerald-400 transition-colors">Market Analysis</Link></li>
                            <li><Link to="/login" className="hover:text-emerald-400 transition-colors">Live Trading</Link></li>
                            <li><Link to="/login" className="hover:text-emerald-400 transition-colors">Mentorship</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold text-white text-sm mb-4">Resources</h4>
                        <ul className="space-y-2.5 text-sm text-slate-500">
                            <li><Link to="/login" className="hover:text-emerald-400 transition-colors">Blog</Link></li>
                            <li><Link to="/login" className="hover:text-emerald-400 transition-colors">Risk Calculator</Link></li>
                            <li><Link to="/login" className="hover:text-emerald-400 transition-colors">Economic Calendar</Link></li>
                            <li><Link to="/login" className="hover:text-emerald-400 transition-colors">Glossary</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold text-white text-sm mb-4">Legal</h4>
                        <ul className="space-y-2.5 text-sm text-slate-500">
                            <li><Link to="/login" className="hover:text-emerald-400 transition-colors">Terms of Service</Link></li>
                            <li><Link to="/login" className="hover:text-emerald-400 transition-colors">Privacy Policy</Link></li>
                            <li><Link to="/login" className="hover:text-emerald-400 transition-colors">Risk Disclosure</Link></li>
                        </ul>
                    </div>
                </div>

                {/* Divider + bottom */}
                <div className="border-t border-white/[0.04] pt-8">
                    <p className="text-[11px] text-slate-700 text-justify leading-relaxed mb-5">
                        <strong className="text-slate-600">RISK DISCLOSURE:</strong> Futures and forex trading contains substantial risk and is not for every investor. An investor could potentially lose all or more than the initial investment. Risk capital is money that can be lost without jeopardizing ones financial security or life style. Only risk capital should be used for trading and only those with sufficient risk capital should consider trading. Past performance is not necessarily indicative of future results.
                    </p>
                    <p className="text-center text-slate-700 text-xs">
                        &copy; {new Date().getFullYear()} Ascent Trading Futures. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
