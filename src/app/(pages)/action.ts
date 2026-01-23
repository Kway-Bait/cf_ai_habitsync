'use server';

import { User, Habit, Entry } from '@/app/libs/types';
import { dbGetHabits } from '@/app/libs/db/habit';
import { dbGetEntries } from '@/app/libs/db/entry';

export async function fetchHabits({ 
    userId
} : {
    userId: string
}): Promise<Habit[]> {
    return await dbGetHabits({ userId });
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
