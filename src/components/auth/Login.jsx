import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function Login() {
    return (
        <div className="min-h-screen bg-[#020617] flex flex-col items-center justify-center p-4 text-white">
            <Link to="/" className="absolute top-8 left-8 flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
                <ArrowLeft size={20} />
                Back to Home
            </Link>

            <div className="text-center max-w-md">
                <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-blue-500 mb-4">
                    Login
                </h1>
                <p className="text-xl text-slate-400 mb-8">
                    This feature is currently under development. Check back soon!
                </p>
                <div className="p-6 rounded-xl bg-slate-900 border border-white/5">
                    <p className="text-sm text-slate-500">Authentication System</p>
                    <div className="w-full bg-slate-800 h-2 rounded-full mt-2 overflow-hidden">
                        <div className="bg-emerald-500 h-full w-1/3 animate-pulse"></div>
                    </div>
                    <p className="text-xs text-right mt-1 text-emerald-500">In Progress</p>
                </div>
            </div>
        </div>
    );
}
