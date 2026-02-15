import { TrendingUp, TrendingDown } from 'lucide-react';

const TICKER_ITEMS = [
    { symbol: 'ES', name: 'S&P 500', price: '4,785.50', change: '+12.50', percent: '+0.26%', up: true },
    { symbol: 'NQ', name: 'Nasdaq 100', price: '16,840.25', change: '+45.75', percent: '+0.27%', up: true },
    { symbol: 'RTY', name: 'Russell 2000', price: '2,015.10', change: '-5.30', percent: '-0.26%', up: false },
    { symbol: 'CL', name: 'Crude Oil', price: '72.45', change: '-0.85', percent: '-1.15%', up: false },
    { symbol: 'GC', name: 'Gold', price: '2,045.80', change: '+15.20', percent: '+0.75%', up: true },
    { symbol: 'SI', name: 'Silver', price: '23.15', change: '+0.45', percent: '+1.98%', up: true },
    { symbol: '6E', name: 'Euro FX', price: '1.0950', change: '-0.0020', percent: '-0.18%', up: false },
    { symbol: 'UB', name: 'Ultra Bond', price: '128.05', change: '+1.02', percent: '+0.80%', up: true },
];

export default function MarketTicker() {
    return (
        <div className="w-full bg-[#020617] border-y border-white/[0.04] overflow-hidden py-3.5 relative z-20">
            {/* Fade edges */}
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#020617] to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#020617] to-transparent z-10 pointer-events-none" />

            <div className="flex animate-scroll whitespace-nowrap">
                {[...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS].map((item, index) => (
                    <div key={index} className="inline-flex items-center gap-4 px-8 border-r border-white/[0.04] hover:bg-white/[0.02] transition-colors cursor-default">
                        <span className="font-bold text-emerald-400 text-sm">{item.symbol}</span>
                        <span className="text-slate-500 text-xs hidden sm:inline">{item.name}</span>
                        <span className="font-mono text-white text-sm">{item.price}</span>
                        <div className={`flex items-center text-xs font-medium ${item.up ? 'text-emerald-500' : 'text-rose-500'}`}>
                            {item.up ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
                            <span>{item.change} ({item.percent})</span>
                        </div>
                    </div>
                ))}
            </div>

            <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
        .animate-scroll {
          animation: scroll 40s linear infinite;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
        </div>
    );
}
