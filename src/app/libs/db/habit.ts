'use server';

import { Habit } from '@/app/libs/types';

export async function getHabits({
    date
} : {
    date: any
}): Promise<Habit[]> {
    return [];
}
