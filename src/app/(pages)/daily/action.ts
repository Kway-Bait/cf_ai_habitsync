'use server';

import { Habit, Entry, User } from '@/app/libs/types';
import { dbGetUserHabits } from '@/app/libs/db/habit';
import { dbGetEntries, dbCreateEntry, dbDeleteEntriesByDate } from '@/app/libs/db/entry';
import { format } from 'date-fns';
import { refresh } from 'next/cache';

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
