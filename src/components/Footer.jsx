import { TrendingUp } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-black border-t border-white/10 pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    <div className="col-span-1 md:col-span-1">
                        <div className="flex items-center gap-2 mb-4">
                            <TrendingUp className="h-6 w-6 text-emerald-500" />
                            <span className="font-bold text-lg tracking-tight text-white">
                                ASCENT <span className="text-emerald-500 font-light">TRADING</span>
                            </span>
                        </div>
                        <p className="text-slate-500 text-sm leading-relaxed">
                            Professional education for the modern futures trader. Master the markets with institutional-grade strategies and risk management.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-semibold text-white mb-4">Platform</h4>
                        <ul className="space-y-2 text-sm text-slate-400">
                            <li><a href="#" className="hover:text-emerald-400 transition-colors">Courses</a></li>
                            <li><a href="#" className="hover:text-emerald-400 transition-colors">Market Analysis</a></li>
                            <li><a href="#" className="hover:text-emerald-400 transition-colors">Live Trading</a></li>
                            <li><a href="#" className="hover:text-emerald-400 transition-colors">Mentorship</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold text-white mb-4">Resources</h4>
                        <ul className="space-y-2 text-sm text-slate-400">
                            <li><a href="#" className="hover:text-emerald-400 transition-colors">Blog</a></li>
                            <li><a href="#" className="hover:text-emerald-400 transition-colors">Risk Calculator</a></li>
                            <li><a href="#" className="hover:text-emerald-400 transition-colors">Economic Calendar</a></li>
                            <li><a href="#" className="hover:text-emerald-400 transition-colors">Glossary</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold text-white mb-4">Legal</h4>
                        <ul className="space-y-2 text-sm text-slate-400">
                            <li><a href="#" className="hover:text-emerald-400 transition-colors">Terms of Service</a></li>
                            <li><a href="#" className="hover:text-emerald-400 transition-colors">Privacy Policy</a></li>
                            <li><a href="#" className="hover:text-emerald-400 transition-colors">Risk Disclosure</a></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-8 mt-8">
                    <p className="text-xs text-slate-600 text-justify leading-relaxed mb-4">
                        <strong>RISK DISCLOSURE:</strong> Futures and forex trading contains substantial risk and is not for every investor. An investor could potentially lose all or more than the initial investment. Risk capital is money that can be lost without jeopardizing ones financial security or life style. Only risk capital should be used for trading and only those with sufficient risk capital should consider trading. Past performance is not necessarily indicative of future results.
                    </p>
                    <p className="text-center text-slate-600 text-sm">
                        &copy; {new Date().getFullYear()} Ascent Trading Futures. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
