'use client';

import React, { createContext, useContext } from 'react';
import { Habit, Entry, User } from '@/app/libs/types';

const HabitContext = createContext<{ 
    user: User,
    habits: Habit[],
    entries: Entry[],
} | null>(null);

export function HabitContextProvider({
    user,
    habits,
    entries,
    children,
} : {
    user: User,
    habits: Habit[],
    entries: Entry[],
    children: React.ReactNode,
}) {
    return (
        <HabitContext.Provider value={{ user, habits, entries }}>
            {children}
        </HabitContext.Provider>
    )
}

export function useHabitContext() {
    const ctx = useContext(HabitContext);
    if (!ctx) throw new Error('Must be used inside provider');
    return ctx
};
