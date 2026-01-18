'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { format } from 'date-fns';
import { Habit, Entry } from '@/app/libs/types';
import { INITIAL_HABITS } from '@/app/libs/constants';
import HabitCard from '@/app/components/ui/habit-card';
import {
    Plus,
    ChevronLeft,
    ChevronRight,
    CalendarIcon,
} from 'lucide-react';

export default function Page() {
    const [currentDate, setCurrentDate] = useState(new Date()); // TODO: Use URL to keep track of date
    const [entries, setEntries] = useState<Entry[]>([]);

    const habits: Habit[] = INITIAL_HABITS;
    const dateStr = format(currentDate, 'yyyy-MM-dd');

    const toggleHabit = (habitId: string) => {
        const existingEntryIndex = entries.findIndex(e => e.habitId === habitId && e.date === dateStr);
        const habit = habits.find(h => h.id === habitId);
        if (!habit) return;

        if (existingEntryIndex >= 0) {
            const newEntries = [...entries];
            const currentCount = newEntries[existingEntryIndex].count;

            if (currentCount >= habit.goal) {
                newEntries[existingEntryIndex].count = 0;
            } else {
                newEntries[existingEntryIndex].count += 1;
            }
            setEntries(newEntries);
        } else {
            setEntries([...entries, { habitId, date: dateStr, count: 1 }]);
        }
    };

    const progressToday = useMemo(() => {
        const todayEntries = entries.filter(e => e.date === dateStr);
        if (habits.length === 0) return 0;
        const completed = habits.filter(h => {
            const entry = todayEntries.find(e => e.habitId === h.id);
            return (entry?.count ?? 0) >= h.goal;
        }).length;
        return Math.round((completed / habits.length) * 100);
    }, [entries, habits, dateStr]);

    return (
        <>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
                <div>
                    <p className="text-sm font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest mb-1">
                        Overview
                    </p>
                    <h2 className="text-3xl lg:text-4xl font-black text-gray-900 dark:text-white">
                        Today's Rituals
                    </h2>
                </div>

                <div className="flex items-center space-x-3 bg-white dark:bg-slate-900 p-2 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-800">
                    <button 
                        onClick={() => setCurrentDate(prev => new Date(prev.setDate(prev.getDate() - 1)))}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
                    >
                        <ChevronLeft className="w-5 h-5 text-gray-400" />
                    </button>
                    <div className="px-4 py-1 flex items-center space-x-2 text-sm font-bold text-gray-700 dark:text-gray-200">
                        <CalendarIcon className="w-4 h-4 text-indigo-500" />
                        <span>{format(currentDate, 'MMMM dd, yyyy')}</span>
                    </div>
                    <button 
                        onClick={() => setCurrentDate(prev => new Date(prev.setDate(prev.getDate() + 1)))}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
                    >
                        <ChevronRight className="w-5 h-5 text-gray-400" />
                    </button>
                </div>
            </div>
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-2 bg-indigo-600 dark:bg-indigo-700 rounded-[2rem] p-8 text-white shadow-xl shadow-indigo-100 dark:shadow-none flex flex-col justify-between">
                        <div>
                            <h3 className="text-xl font-bold mb-2">Daily Progress</h3>
                            <p className="text-indigo-100 mb-6">You've completed {habits.filter(h => entries.find(e => e.habitId === h.id && e.date === dateStr && e.count >= h.goal)).length} out of {habits.length} habits.</p>
                        </div>
                        <div className="space-y-4">
                            <div className="flex justify-between items-end">
                                <span className="text-4xl font-black">{progressToday}%</span>
                                <span className="text-sm font-bold text-indigo-200">Almost there!</span>
                            </div>
                            <div className="h-3 w-full bg-indigo-400/30 rounded-full overflow-hidden">
                                <div 
                                    className="h-full bg-white transition-all duration-1000 ease-out shadow-[0_0_15px_rgba(255,255,255,0.5)]" 
                                    style={{ width: `${progressToday}%` }}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="bg-white dark:bg-slate-900 rounded-[2rem] p-8 border border-gray-100 dark:border-slate-800 shadow-sm flex flex-col items-center justify-center text-center">
                        <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900/30 rounded-2xl flex items-center justify-center mb-4">
                            <span className="text-3xl">🔥</span>
                        </div>
                        <h4 className="text-sm font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-1">Current Streak</h4>
                        <p className="text-4xl font-black text-gray-900 dark:text-white">12 Days</p>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">Your Habits</h3>
                        <Link 
                            href="/daily/add"
                            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center shadow-lg shadow-indigo-100 dark:shadow-none"
                        >
                            <Plus className="w-4 h-4 mr-2" /> New Habit
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                        {habits.map(habit => (
                            <HabitCard 
                                key={habit.id} 
                                habit={habit} 
                                entry={entries.find(e => e.habitId === habit.id && e.date === dateStr)}
                                onToggle={toggleHabit}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};
