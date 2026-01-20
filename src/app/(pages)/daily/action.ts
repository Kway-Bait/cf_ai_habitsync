'use server';

import { Habit, Entry, User } from '@/app/libs/types';
import { dbGetUserHabits } from '@/app/libs/db/habit';
import { dbGetEntries, dbCreateEntry, dbDeleteEntriesByDate } from '@/app/libs/db/entry';
import { format } from 'date-fns';
import { refresh } from 'next/cache';

export async function fetchHabits({ 
    user
} : {
    user: User
}): Promise<Habit[]> {
    return await dbGetUserHabits({ user: user });
}

export async function fetchEntries({
    habits
} : {
    habits: Habit[]
}): Promise<Entry[]> {
    const results = await Promise.all(habits.map(async (habit) => {
        const result = await dbGetEntries({ habitId: habit.id });
        return result;
    }));

    return results.flat();
}

export async function createEntry({
    habitId,
    date
} : {
    habitId: string
    date: string | Date
}) : Promise<void> {
    if (date instanceof Date) {
        date = format(date, 'yyyy-MM-dd');
    }
    dbCreateEntry({ habitId: habitId, date: date });
    refresh();
}

export async function deleteEntriesByDate({
    habitId,
    date,
} : {
    habitId: string
    date: string | Date
}) : Promise<void> {
    if (date instanceof Date) {
        date = format(date, 'yyyy-MM-dd');
    }
    dbDeleteEntriesByDate({ habitId: habitId, date: date });
    refresh();
}
