'use client';

import { useState, useActionState } from 'react';
import { useHabitContext } from '@/app/context/habit-context';
import Link from 'next/link';
import { User, HabitCategory, Tab } from '@/app/libs/types';
import { CATEGORY_ICONS } from '@/app/libs/constants';
import { createHabit, State } from '../action';
import clsx from 'clsx';

export default function CreateForm() {
    const [habitCategory, setHabitCategory] = useState<HabitCategory>('Health');
    const { user } = useHabitContext();

    const initialState: State = { message: "", errors: {} };
    const createHabitAction = createHabit.bind(null, user.id);
    const [state, formAction] = useActionState(createHabitAction, initialState);

    return (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-50 flex items-center justify-center p-6">
            <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] w-full max-w-md p-10 shadow-2xl animate-in zoom-in-95 duration-200 border border-gray-100 dark:border-slate-800">
                <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-8">New Habit</h2>
                <form action={formAction} className="space-y-8">
                    <div>
                        <label className="block text-xs font-bold text-gray-400 dark:text-gray-500 mb-3 uppercase tracking-widest">What's the habit name?</label>
                        <input 
                            id="name"
                            name="name"
                            type="text" 
                            placeholder="e.g. Early Morning Run"
                            className="w-full bg-gray-50 dark:bg-slate-800 border-0 rounded-2xl p-5 focus:ring-2 focus:ring-indigo-500 font-medium text-gray-900 dark:text-white placeholder-gray-400"
                            autoFocus
                        />
                        <div id="name-error">
                            {state.errors?.name &&
                                state.errors.name.map((error: string) => (
                                    <p className="mt-2 text-sm text-red-500" key={error}>
                                        {error}
                                    </p>
                                ))
                            }
                        </div>
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-400 dark:text-gray-500 mb-3 uppercase tracking-widest">What's the goal?</label>
                        <input 
                            id="goal"
                            name="goal"
                            type="number" 
                            placeholder="e.g. 3 times per day"
                            className="w-full bg-gray-50 dark:bg-slate-800 border-0 rounded-2xl p-5 focus:ring-2 focus:ring-indigo-500 font-medium text-gray-900 dark:text-white placeholder-gray-400"
                        />
                        <div id="goal-error">
                            {state.errors?.goal &&
                                state.errors.goal.map((error: string) => (
                                    <p className="mt-2 text-sm text-red-500" key={error}>
                                        {error}
                                    </p>
                                ))
                            }
                        </div>
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-400 dark:text-gray-500 mb-3 uppercase tracking-widest">Choose Category</label>
                        <input 
                            id="category"
                            name="category" 
                            className="hidden" 
                            value={habitCategory} 
                            readOnly 
                        />
                        <div className="grid grid-cols-2 gap-3">
                            {(['Health', 'Productivity', 'Mindfulness', 'Personal', 'Social'] as HabitCategory[]).map(cat => {
                                const icon = CATEGORY_ICONS[cat];
                                const CategoryIcon = icon.icon;
                                return (
                                    <button
                                        key={cat}
                                        type="button"
                                        onClick={() => setHabitCategory(cat)}
                                        className={clsx("py-4 rounded-2xl text-sm font-bold transition-all border-2", 
                                            {
                                                'bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-100 dark:shadow-none': habitCategory === cat,
                                                'bg-transparent border-gray-100 dark:border-slate-800 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-slate-800': habitCategory !== cat,
                                            }
                                        )}
                                    >
                                        <div className="flex space-x-3 items-center pl-4">
                                            <CategoryIcon className={`${icon.color} size-6`} />
                                            <span>{cat}</span>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                    <div className="flex space-x-4 pt-4">
                        <Link 
                            href={Tab.MANAGE}
                            className="flex-1 text-center py-5 text-gray-500 dark:text-gray-400 font-bold hover:bg-gray-50 dark:hover:bg-slate-800 rounded-2xl transition-colors"
                        >
                            Discard
                        </Link>
                        <button 
                            type="submit"
                            className="flex-1 py-5 bg-indigo-600 text-white font-bold rounded-2xl shadow-xl shadow-indigo-100 dark:shadow-none hover:bg-indigo-700 transition-colors"
                        >
                            Create Habit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

