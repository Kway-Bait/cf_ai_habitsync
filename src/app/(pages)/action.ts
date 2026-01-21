'use server';

import { User, Habit, Entry } from '@/app/libs/types';
import { dbGetUserHabits } from '@/app/libs/db/habit';
import { dbGetEntries } from '@/app/libs/db/entry';

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
