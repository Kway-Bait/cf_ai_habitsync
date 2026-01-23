'use server';

import { getCloudflareContext } from '@opennextjs/cloudflare';
import { Habit, User, HabitCategory } from '@/app/libs/types';

export async function dbGetHabit({
    habitId,
} : {
    habitId: string,
}): Promise<Habit> {
    const { env } = getCloudflareContext();
    const result = await env.habitDB.prepare(
        "SELECT * FROM habits WHERE id = ?"
    )
        .bind(habitId)
        .first();

    let data: Habit = {
        id: (result?.id as number).toString(),
        name: result?.name as string,
        category: result?.category as HabitCategory,
        goal: result?.goal as number,
    };

    return data;
}

export async function dbGetHabits({
    userId,
} : {
    userId: string,
}): Promise<Habit[]> {
    const { env } = getCloudflareContext();
    const { results } = await env.habitDB.prepare(
        "SELECT * FROM habits WHERE user_id = ? AND archived_at IS NULL",
    )
        .bind(userId)
        .run();

    let data: Habit[] = results.map(result => ({
        id: (result.id as number).toString(),
        name: result.name as string,
        category: result.category as HabitCategory,
        goal: result.goal as number,
    }));

    return data;
}

export async function dbCreateHabit({
    userId,
    habit,
} : {
    userId: string,
    habit: { name: string, category: string, goal: number },
}) {
    const { env } = getCloudflareContext();
    await env.habitDB.prepare(`
        INSERT INTO habits (user_id, name, category, goal)
        VALUES (?, ?, ?, ?)
    `)
        .bind(userId, habit.name, habit.category, habit.goal)
        .run();
}

export async function dbDeleteHabit({
    habitId,
} : {
    habitId: string,
}) {
    const { env } = getCloudflareContext();
    await env.habitDB.prepare(
    "DELETE FROM habits WHERE id = ?"
    )
        .bind(habitId)
        .run();
}
