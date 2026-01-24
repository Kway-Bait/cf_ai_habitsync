'use server';

import { dbCreateEntry, dbDeleteEntriesByDate } from '@/app/libs/db/entry';
import { format } from 'date-fns';
import { refresh } from 'next/cache';

export async function createEntry({
    userId,
    habitId,
    date
} : {
    userId: string,
    habitId: string,
    date: string | Date
}) : Promise<void> {
    if (date instanceof Date) {
        date = format(date, 'yyyy-MM-dd');
    }
    dbCreateEntry({ userId, habitId, date });
    refresh();
}

export async function deleteEntriesByDate({
    userId,
    habitId,
    date,
} : {
    userId: string,
    habitId: string,
    date: string | Date
}) : Promise<void> {
    if (date instanceof Date) {
        date = format(date, 'yyyy-MM-dd');
    }
    dbDeleteEntriesByDate({ userId, habitId, date });
    refresh();
}
