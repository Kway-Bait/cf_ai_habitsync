import React from 'react';
import { HabitContextProvider } from '@/app/context/habit-context';
import NavBar from '@/app/components/layout/navbar';
import { Habit, User, Entry } from '@/app/libs/types';
import { fetchHabits, fetchEntries } from './action';

export default async function Layout({ children }: { children: React.ReactNode }) {
    const user: User = { id: '1' }; // Sample User

    const habits: Habit[] = await fetchHabits({ user });
    const entries: Entry[] = await fetchEntries({ habits });

    return (
            <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
                <NavBar />
                <main className="flex-1 lg:ml-72 min-h-screen relative p-6 lg:p-12 pt-24 lg:pt-12">
                    <HabitContextProvider habits={habits} entries={entries}>
                        {children}
                    </HabitContextProvider>
                </main>
            </div>
    );
};
