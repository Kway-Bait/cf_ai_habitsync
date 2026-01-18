'use server';

import { Habit } from '@/app/libs/types';
import { getHabits } from '@/app/libs/db/habit';

export async function fetchHabits({ 
    date 
} : {
    date: any
}): Promise<Habit[]> {

    return [];
}
