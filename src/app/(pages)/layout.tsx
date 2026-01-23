import React from 'react';
import { HabitContextProvider } from '@/app/context/habit-context';
import NavBar from '@/app/components/layout/navbar';
import Unauthorized from '@/app/components/layout/unauthorize';
import { Habit, User, Entry } from '@/app/libs/types';
import { fetchHabits, fetchEntries } from './action';
import { auth } from '@/app/libs/auth';

export default async function Layout({ children }: { children: React.ReactNode }) {
    const session = await auth();
    console.log({ session })

    if (!session || !session.user) {
        return <Unauthorized />
    }

    const userId: string = '1';

    const habits: Habit[] = await fetchHabits({ userId });
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
