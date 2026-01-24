'use client';

import HabitCard from './_components/habit-card';
import Link from 'next/link';
import { useHabitContext } from '@/app/context/habit-context';
import { Plus } from 'lucide-react';

export default function Page(){
    const { habits } = useHabitContext();

    return (
        <>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
                <div>
                    <p className="text-sm font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest mb-1">
                        Overview
                    </p>
                    <h2 className="text-3xl lg:text-4xl font-black text-gray-900 dark:text-white">
                        Your Habits
                    </h2>
                </div>
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <Link 
                            href="/manage/create"
                            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center shadow-lg shadow-indigo-100 dark:shadow-none"
                        >
                            <Plus className="w-4 h-4 mr-2" /> Add Habit
                        </Link>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {habits.map((habit, idx) => (
                    <HabitCard
                        key={idx}
                        habit={habit} 
                    />
                ))}
            </div>
        </>
    );
}
