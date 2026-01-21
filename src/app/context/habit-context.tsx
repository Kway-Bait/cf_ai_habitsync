'use client';

import React, { createContext, useContext } from 'react';
import { Habit, Entry } from '@/app/libs/types';

const HabitContext = createContext<{ 
    habits: Habit[],
    entries: Entry[],
} | null>(null);

export function HabitContextProvider({
    habits,
    entries,
    children,
} : {
    habits: Habit[],
    entries: Entry[],
    children: React.ReactNode,
}) {
    return (
        <HabitContext.Provider value={{ habits, entries }}>
            {children}
        </HabitContext.Provider>
    )
}

export function useHabitContext() {
    const ctx = useContext(HabitContext);
    if (!ctx) throw new Error('Must be used inside provider');
    return ctx
};
