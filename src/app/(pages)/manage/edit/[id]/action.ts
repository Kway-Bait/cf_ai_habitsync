'use server';

import { User, Habit } from '@/app/libs/types';
import { HabitSchema } from '@/app/libs/schemas/habit-schema';
import { dbCreateUserHabits, dbGetHabit } from '@/app/libs/db/habit';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const CreateHabit = HabitSchema.omit({ id: true });

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
    user: User,
    prevState: State, 
    formData: FormData
): Promise<State> {
    const validatedFields = CreateHabit.safeParse({
        name: formData.get('name'),
        category: formData.get('category'),
        goal: formData.get('goal'),
    });

    console.log({ formData, validatedFields });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Create Invoice.',
        }
    }

    const { name, category, goal } = validatedFields.data;

    try {
        await dbCreateUserHabits({ 
            user,
            habit: { name, category, goal }
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
