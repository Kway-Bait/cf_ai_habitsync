'use server';

import { User, Habit, Entry } from '@/app/libs/types';
import { dbGetHabits } from '@/app/libs/db/habit';
import { dbGetEntries } from '@/app/libs/db/entry';

export async function fetchHabits({ 
    userId
} : {
    userId: string,
}): Promise<Habit[]> {
    return await dbGetHabits({ userId });
}

export async function fetchEntries({
    userId,
} : {
    userId: string,
}): Promise<Entry[]> {
    return await dbGetEntries({ userId });
}
