import { useState, useEffect } from 'react';
import { CheckCircle, Clock, Lock, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function QuizComponent({ lessonId, questions, onPass, onFail }) {
    const [answers, setAnswers] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const [passed, setPassed] = useState(false);
    const [lockoutTime, setLockoutTime] = useState(null);
    const [timeLeft, setTimeLeft] = useState(0);

    // Per-lesson lockout key
    const lockoutKey = `quiz_lockout_${lessonId}`;

    // Initial check for existing lockout
    useEffect(() => {
        const storedLockout = localStorage.getItem(lockoutKey);
        if (storedLockout) {
            const expiry = parseInt(storedLockout, 10);
            if (Date.now() < expiry) {
                setLockoutTime(expiry);
            } else {
                localStorage.removeItem(lockoutKey);
            }
        }

        // Reset state when lesson changes
        setAnswers({});
        setSubmitted(false);
        setPassed(false);
    }, [lessonId, lockoutKey]);

    // Timer logic
    useEffect(() => {
        if (!lockoutTime) return;

        const interval = setInterval(() => {
            const remaining = Math.ceil((lockoutTime - Date.now()) / 1000);
            if (remaining <= 0) {
                setLockoutTime(null);
                setTimeLeft(0);
                localStorage.removeItem(lockoutKey);
                setSubmitted(false);
                setAnswers({});
            } else {
                setTimeLeft(remaining);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [lockoutTime, lockoutKey]);

    const handleSelect = (qIndex, optionIndex) => {
        if (submitted || lockoutTime) return;
        setAnswers(prev => ({
            ...prev,
            [qIndex]: optionIndex
        }));
    };

    const handleSubmit = () => {
        if (Object.keys(answers).length < questions.length) return; // Must answer all

        setSubmitted(true);

        let correctCount = 0;
        questions.forEach((q, index) => {
            if (answers[index] === q.correctAnswer) {
                correctCount++;
            }
        });

        if (correctCount === questions.length) {
            setPassed(true);
            onPass();
        } else {
            setPassed(false);
            // Per-lesson lockout: 5 minutes from now
            const lockUntil = Date.now() + (5 * 60 * 1000);
            setLockoutTime(lockUntil);
            localStorage.setItem(lockoutKey, lockUntil.toString());
            onFail();
        }
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    if (lockoutTime) {
        return (
            <div className="mt-12 p-8 bg-rose-500/10 border border-rose-500/20 rounded-2xl text-center">
                <Lock className="w-12 h-12 text-rose-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">Quiz Locked</h3>
                <p className="text-slate-400 mb-6">You failed the assessment. Review the material and try again.</p>
                <div className="inline-flex items-center gap-2 px-6 py-3 bg-rose-500/20 rounded-lg text-rose-400 font-mono text-xl font-bold">
                    <Clock className="w-5 h-5" />
                    {formatTime(timeLeft)}
                </div>
            </div>
        );
    }

    if (passed) {
        return (
            <div className="mt-12 p-8 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl text-center">
                <CheckCircle className="w-12 h-12 text-emerald-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">Assessment Passed!</h3>
                <p className="text-slate-400">You have unlocked the next lesson.</p>
            </div>
        );
    }

    return (
        <div className="mt-16 pt-10 border-t border-white/10">
            <h3 className="text-2xl font-bold text-white mb-8">Knowledge Check</h3>

            <div className="space-y-8">
                {questions.map((q, qIndex) => (
                    <div key={qIndex} className="bg-[#0B0F1C] p-6 rounded-xl border border-white/5">
                        <p className="text-lg font-medium text-white mb-4">{q.question}</p>
                        <div className="space-y-3">
                            {q.options.map((option, oIndex) => {
                                const isSelected = answers[qIndex] === oIndex;
                                return (
                                    <button
                                        key={oIndex}
                                        onClick={() => handleSelect(qIndex, oIndex)}
                                        className={`w-full text-left p-4 rounded-lg transition-all flex items-center justify-between border ${isSelected
                                            ? 'bg-emerald-500/20 border-emerald-500/50 text-white'
                                            : 'bg-white/5 border-white/5 text-slate-400 hover:bg-white/10'
                                            }`}
                                    >
                                        <span>{option}</span>
                                        {isSelected && <div className="w-3 h-3 rounded-full bg-emerald-500" />}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-8 flex justify-end">
                <button
                    onClick={handleSubmit}
                    disabled={Object.keys(answers).length < questions.length}
                    className={`px-8 py-4 rounded-lg font-bold text-white transition-all flex items-center gap-2 ${Object.keys(answers).length < questions.length
                        ? 'bg-slate-700 cursor-not-allowed opacity-50'
                        : 'bg-emerald-600 hover:bg-emerald-700 shadow-lg shadow-emerald-500/20'
                        }`}
                >
                    Submit Answers
                    <ArrowRight className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
}
