'use client';

import { useHabitContext } from '@/app/context/habit-context';
import Link from 'next/link';
import { Tab } from '@/app/libs/types';
import { startOfToday } from 'date-fns';
import { calculateHabitSummary } from '@/app/libs/utils/habit-utils';
import { 
    Flame, 
    Target, 
    Calendar, 
    ArrowRight, 
    Sparkles, 
    Quote, 
    UserPlus, 
    CheckCircle2,
    Trophy,
    MessageCircle,
    BarChart3
} from 'lucide-react';

export default function HomeView() {
    const { user, habits, entries } = useHabitContext();
    const { progress, completed, activeStreak } = calculateHabitSummary({ habits, entries, viewDate: startOfToday() });

    return (
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-6 duration-700 pb-12">
            <section className="relative overflow-hidden rounded-[3rem] bg-indigo-600 dark:bg-indigo-700 p-10 lg:p-16 text-white shadow-2xl">
                <div className="absolute top-0 right-0 w-1/3 h-full opacity-10 pointer-events-none">
                    <Target className="w-full h-full rotate-12 scale-150" />
                </div>
                <div className="relative z-10 max-w-2xl">
                    <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md mb-8">
                        <Sparkles className="w-4 h-4 text-indigo-100" />
                        <span className="text-xs font-black uppercase tracking-widest text-indigo-50">Operational Insight</span>
                    </div>
                    <h1 className="text-5xl lg:text-7xl font-black mb-6 leading-tight">
                        Welcome back, <br /><span className="text-indigo-200">{user.name}</span>
                    </h1>
                    <p className="text-lg text-indigo-50 mb-10 leading-relaxed font-medium">
                        You've maintained consistency for {activeStreak} days straight. Today's focus is your mindfulness routine.
                    </p>

                    <div className="flex flex-wrap gap-4">
                        <Link 
                            href={Tab.DAILY}
                            className="flex items-center space-x-3 bg-white text-indigo-600 px-8 py-4 rounded-2xl font-black transition-all hover:scale-105 shadow-xl shadow-indigo-900/20"
                        >
                            <CheckCircle2 className="w-5 h-5" />
                            <span>Continue Daily Log</span>
                        </Link>
                        <Link 
                            href={Tab.CHAT}
                            className="flex items-center space-x-3 bg-indigo-500/50 hover:bg-indigo-500 text-white border border-indigo-400/30 px-8 py-4 rounded-2xl font-black transition-all"
                        >
                            <MessageCircle className="w-5 h-5" />
                            <span>Coach Insights</span>
                        </Link>
                    </div>
                </div>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-slate-800 shadow-sm group hover:shadow-xl transition-all duration-300">
                    <div className="w-14 h-14 bg-orange-100 dark:bg-orange-900/30 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                        <Flame className="w-8 h-8 text-orange-600" />
                    </div>
                    <h3 className="text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-2">Active Streak</h3>
                    <p className="text-4xl font-black text-gray-900 dark:text-white">{activeStreak} Days</p>
                    <div className="mt-4 flex items-center text-xs font-bold text-orange-500">
                        <Trophy className="w-3 h-3 mr-1" /> Elite Level Performance
                    </div>
                </div>

                <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-slate-800 shadow-sm group hover:shadow-xl transition-all duration-300">
                    <div className="w-14 h-14 bg-emerald-100 dark:bg-emerald-900/30 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                        <CheckCircle2 className="w-8 h-8 text-emerald-600" />
                    </div>
                    <h3 className="text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-2">Today's Progress</h3>
                    <p className="text-4xl font-black text-gray-900 dark:text-white">{completed} / {habits.length}</p>
                    <div className="mt-4 h-1.5 w-full bg-gray-100 dark:bg-slate-800 rounded-full overflow-hidden">
                        <div 
                            className="h-full bg-emerald-500 transition-all duration-1000" 
                            style={{ width: `${(completed / (habits.length || 1)) * 100}%` }}
                        />
                    </div>
                </div>

                <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-slate-800 shadow-sm group hover:shadow-xl transition-all duration-300">
                    <div className="w-14 h-14 bg-indigo-100 dark:bg-indigo-900/30 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                        <Target className="w-8 h-8 text-indigo-600" />
                    </div>
                    <h3 className="text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-2">Overall Success</h3>
                    <p className="text-4xl font-black text-gray-900 dark:text-white">
                        {progress}%
                    </p>
                    <Link 
                        href="/review"
                        className="mt-4 flex items-center text-xs font-bold text-indigo-600 hover:text-indigo-700 transition-colors"
                    >
                        Analytics Dashboard <ArrowRight className="w-3 h-3 ml-1" />
                    </Link>
                </div>
            </section>

            <section className="bg-slate-100 dark:bg-slate-900/50 p-10 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 relative">
                <Quote className="absolute top-6 right-8 w-20 h-20 text-slate-200 dark:text-slate-800/50 pointer-events-none" />
                <div className="relative z-10">
                    <p className="text-2xl font-bold text-gray-800 dark:text-gray-200 italic mb-4 leading-relaxed">
                        "Your habits are a lagging measure of your systems. Focus on the system, not the goal."
                    </p>
                    <p className="text-sm font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">— Habit Coach AI</p>
                </div>
            </section>

            <section className="space-y-6">
                <h2 className="text-2xl font-black text-gray-900 dark:text-white px-2">Navigation</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                        { label: 'Today\'s Rituals', icon: Calendar, href: Tab.DAILY, color: 'bg-blue-50 text-blue-600 dark:bg-blue-900/20' },
                        { label: 'Weekly Review', icon: BarChart3, href: Tab.REVIEW, color: 'bg-purple-50 text-purple-600 dark:bg-purple-900/20' },
                        { label: 'Coach Sessions', icon: Sparkles, href: Tab.CHAT, color: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20' },
                        { label: 'Manage Habits', icon: UserPlus, href: Tab.MANAGE, color: 'bg-amber-50 text-amber-600 dark:bg-amber-900/20' },
                    ].map((action, i) => (
                            <Link
                                key={i}
                                href={action.href}
                                className="flex items-center p-6 bg-white dark:bg-slate-900 hover:brightness-125 rounded-[2rem] border border-gray-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-all group"
                            >
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mr-4 transition-transform group-hover:rotate-12 ${action.color}`}>
                                    <action.icon className="w-6 h-6" />
                                </div>
                                <span className="text-sm font-bold text-gray-700 dark:text-gray-200 text-left">{action.label}</span>
                            </Link>
                        ))}
                </div>
            </section>
        </div>
    );
};
