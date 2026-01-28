'use server';

import { User, Habit } from '@/app/libs/types';
import { HabitSchema } from '@/app/libs/schemas/habit-schema';
import { dbUpdateHabit, dbGetHabit, dbDeleteHabit } from '@/app/libs/db/habit';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const UpdateHabit = HabitSchema;

export type State = {
    errors?: {
        name?: string[];
        category?: string[];
        goal?: string[];
    };
    message?: string | null;
};

export async function fetchHabit({
    habitId,
} : {
    habitId: string,
}): Promise<Habit> {
    const result = await dbGetHabit({ habitId });
    return result;
}

export async function updateHabit(
    userId: string,
    prevState: State, 
    formData: FormData
): Promise<State> {
    const validatedFields = UpdateHabit.safeParse({
        id: formData.get('id'),
        name: formData.get('name'),
        category: formData.get('category'),
        goal: formData.get('goal'),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Create Invoice.',
        }
    }

    const { id, name, category, goal } = validatedFields.data;

    try {
        await dbUpdateHabit({ 
            userId,
            habit: { id, name, category, goal }
        });
    } catch (error) {
        console.error(error);
        return {
            message: 'Database Error: Failed to Update Invoice.'
        };
    }

    revalidatePath('/manage');
    redirect('/manage');
}

export async function deleteHabit({
    userId,
    habitId,
} : {
    userId: string,
    habitId: string,
}): Promise<void> {
    await dbDeleteHabit({ userId, habitId });

    revalidatePath('/manage');
    redirect('/manage');
}
