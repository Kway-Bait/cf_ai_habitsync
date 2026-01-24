'use client';

import { useState } from 'react';
import { useHabitContext } from '@/app/context/habit-context';
import Link from 'next/link';
import { format, add, compareAsc, isSameDay, startOfToday } from 'date-fns';
import { calculateHabitSummary } from '@/app/libs/utils/habit-utils';
import HabitTable from './_components/habit-table';
import {
    Sun,
    Plus,
    ChevronLeft,
    CalendarIcon,
    ChevronRight,
} from 'lucide-react';
import clsx from 'clsx';

export default function Page() {
    const [viewDate, setViewDate] = useState<Date>(startOfToday());
    const { habits, entries } = useHabitContext();

    const { progress, completed, activeStreak } = calculateHabitSummary({ viewDate, habits, entries });

    return (
        <>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
                <div>
                    <p className="text-sm font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest mb-1">
                        Daily
                    </p>
                    <h2 className="text-3xl lg:text-4xl font-black text-gray-900 dark:text-white">
                        {(isSameDay(viewDate, startOfToday()))? "Today's" : "Past"} Rituals
                    </h2>
                </div>
                <div className="flex space-x-3">
                    <div className="flex items-center space-x-3 bg-white dark:bg-slate-900 p-2 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-800">
                        <button
                            onClick={() => setViewDate(startOfToday())}
                            className="px-4 py-1 flex items-center space-x-2 text-sm font-bold text-gray-700 dark:text-gray-200"
                        >
                            <Sun className="w-5 h-5 text-indigo-500" />
                            <span>Today</span>
                        </button>
                    </div>
                    <div className="flex items-center space-x-3 bg-white dark:bg-slate-900 p-2 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-800">
                        <button 
                            onClick={() => setViewDate(prev => add(prev, { days: -1 }))}
                            className="p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
                        >
                            <ChevronLeft className="w-5 h-5 text-gray-400" />
                        </button>
                        <div className="px-4 py-1 flex items-center space-x-2 text-sm font-bold text-gray-700 dark:text-gray-200">
                            <CalendarIcon className="w-4 h-4 text-indigo-500" />
                            <span>{format(viewDate, 'MMMM dd, yyyy')}</span>
                        </div>
                        <button 
                            onClick={() => setViewDate(prev => add(prev, { days: 1 }))}
                            className="p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
                            disabled={compareAsc(viewDate, startOfToday()) >= 0}
                        >
                            <ChevronRight className="w-5 h-5 text-gray-400" />
                        </button>
                    </div>
                </div>
            </div>
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-2 bg-indigo-600 dark:bg-indigo-700 rounded-[2rem] p-8 text-white shadow-xl shadow-indigo-100 dark:shadow-none flex flex-col justify-between">
                        <div>
                            <h3 className="text-xl font-bold mb-2">Daily Progress</h3>
                            <p className="text-indigo-100 mb-6">
                                You've completed {completed} out of {habits.length} habits.
                            </p>
                        </div>
                        <div className="space-y-4">
                            <div className="flex justify-between items-end">
                                <span className="text-4xl font-black">{progress}%</span>
                                <span className="text-sm font-bold text-indigo-200">Almost there!</span>
                            </div>
                            <div className="h-3 w-full bg-indigo-400/30 rounded-full overflow-hidden">
                                <div 
                                    className="h-full bg-white transition-all duration-1000 ease-out shadow-[0_0_15px_rgba(255,255,255,0.5)]" 
                                    style={{ width: `${progress}%` }}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="bg-white dark:bg-slate-900 rounded-[2rem] p-8 border border-gray-100 dark:border-slate-800 shadow-sm flex flex-col items-center justify-center text-center">
                        <div className={clsx(
                            "w-16 h-16 bg-orange-100 dark:bg-orange-900/30 rounded-2xl flex items-center justify-center mb-4 duration-500",
                            {
                                "grayscale": progress === 0 || activeStreak === 0,
                            }
                        )}>
                            <span className="text-3xl">🔥</span>
                        </div>
                        <h4 className="text-sm font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-1">Current Active Streak</h4>
                        <p className="text-sm text-gray-400 dark:text-gray-500 italic mb-1">You've been consistently logging at least one entry everyday for</p>
                        <p className={clsx(
                            "text-4xl font-black text-gray-900 dark:text-white duration-500",
                            {
                                "brightness-50": progress === 0,
                            }
                        )}>
                            {activeStreak} Days
                        </p>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">Your Habits</h3>
                        <Link 
                            href="/manage"
                            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center shadow-lg shadow-indigo-100 dark:shadow-none"
                        >
                            <Plus className="w-4 h-4 mr-2" /> Manage Habit
                        </Link>
                    </div>

                    <HabitTable viewDate={viewDate} />
                </div>
            </div>
        </>
    );
};
