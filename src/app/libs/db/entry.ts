'use server';

import { getCloudflareContext } from '@opennextjs/cloudflare';
import { Entry } from '@/app/libs/types';

export async function dbGetEntries({
    userId,
} : {
    userId: string,
}): Promise<Entry[]> {
    const { env } = getCloudflareContext();
    const { results } = await env.habitDB.prepare(`
        SELECT e.habit_id, COUNT(*) AS [count], e.completed_on, e.created_at
        FROM entries e
        JOIN habits h ON h.id = e.habit_id
        WHERE h.user_id = ?
        GROUP BY e.completed_on;
    `)
        .bind(userId)
        .run();

    let data: Entry[] = results.map((result) => ({
            habitId: (result.habit_id as number).toString(),
            date: result.completed_on as string,
            count: result.count as number,
    }));

    return data;
}

export async function dbCreateEntry({
    userId,
    habitId,
    date,
} : {
    userId: string,
    habitId: string,
    date: string,
}): Promise<void> {
    const { env } = getCloudflareContext();

    const result = env.habitDB.prepare(`
        SELECT * FROM habits WHERE user_id = ?
    `)
        .bind(userId)
        .first();

    if (!result) {
        throw new Error('Habit doesn\'t belong to user');
    }

    await env.habitDB.prepare(`
        INSERT INTO entries (habit_id, completed_on)
        VALUES (?, ?)
    `)
        .bind(habitId, date)
        .run();
}

export async function dbDeleteEntriesByDate({
    userId,
    habitId,
    date,
} : {
    userId: string,
    habitId: string,
    date: string,
}) : Promise<void> {
    const { env } = getCloudflareContext();

    const result = env.habitDB.prepare(`
        SELECT * FROM habits WHERE user_id = ?
    `)
        .bind(userId)
        .first();

    if (!result) {
        throw new Error('Habit doesn\'t belong to user');
    }

    await env.habitDB.prepare(`
        DELETE FROM entries
        WHERE habit_id = ? AND completed_on = ?
    `)
        .bind(habitId, date)
        .run();
}
