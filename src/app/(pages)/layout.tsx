import React from 'react';
import { HabitContextProvider } from '@/app/context/habit-context';
import NavBar from '@/app/components/layout/navbar';
import Unauthorized from '@/app/components/layout/unauthorize';
import { Habit, Entry, User } from '@/app/libs/types';
import { fetchHabits, fetchEntries } from './action';
import { auth } from '@/app/libs/auth';

export default async function Layout({ children }: { children: React.ReactNode }) {
    const session = await auth();

    if (!session || !session.user) {
        return <Unauthorized />
    } else {
        const user: User = session.user as User;
        const habits: Habit[] = await fetchHabits({ userId: user.id! });
        const entries: Entry[] = await fetchEntries({ habits });

        return (
            <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
                <NavBar name={user.name}/>
                <main className="flex-1 lg:ml-72 min-h-screen relative p-6 lg:p-12 pt-24 lg:pt-12">
                    <HabitContextProvider user={user} habits={habits} entries={entries}>
                        {children}
                    </HabitContextProvider>
                </main>
            </div>
        );
    }
};
