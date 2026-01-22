'use server';

import { getCloudflareContext } from '@opennextjs/cloudflare';
import { Habit, User, HabitCategory } from '@/app/libs/types';

export async function dbGetHabit({
    habitId,
} : {
    habitId: string,
}): Promise<Habit> {
    const { env } = getCloudflareContext();
    const { results } = await env.habitDB.prepare(
        "SELECT * FROM habits WHERE id = ? LIMIT 1"
    )
        .bind(habitId)
        .run();

    const result = results[0];

    let data: Habit = {
        id: (result.id as number).toString(),
        name: result.name as string,
        category: result.category as HabitCategory,
        goal: result.goal as number,
    };

    return data;
}

export async function dbGetHabits({
    user,
} : {
    user: User,
}): Promise<Habit[]> {
    const { env } = getCloudflareContext();
    const { results } = await env.habitDB.prepare(
        "SELECT * FROM habits WHERE user_id = ? AND archived_at IS NULL",
    )
        .bind(user.id)
        .run();

    // console.log("getUserHabits: ", { results });

    let data: Habit[] = results.map(result => ({
        id: (result.id as number).toString(),
        name: result.name as string,
        category: result.category as HabitCategory,
        goal: result.goal as number,
    }));

    // console.log("getUserHabits: ", { data });
    return data;
}

export async function dbCreateUserHabits({
    user,
    habit,
} : {
    user: User,
    habit: { name: string, category: string, goal: number },
}) {
    const { env } = getCloudflareContext();
    await env.habitDB.prepare(`
        INSERT INTO habits (user_id, name, category, goal)
        VALUES (?, ?, ?, ?)
    `)
        .bind(user.id, habit.name, habit.category, habit.goal)
        .run();
}
