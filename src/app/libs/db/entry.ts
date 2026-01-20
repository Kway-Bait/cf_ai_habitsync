'use server';

import { getCloudflareContext } from '@opennextjs/cloudflare';
import { Habit, Entry } from '@/app/libs/types';

const { env } = getCloudflareContext();

export async function dbGetEntries({
    habitId,
} : {
    habitId: string,
}): Promise<Entry[]> {
    const { results } = await env.habitDB.prepare(`
        SELECT habit_id, COUNT(*) AS [count], completed_on, created_at
        FROM entries
        WHERE habit_id = ?
        GROUP BY completed_on
    `)
        .bind(habitId)
        .run();

    // console.log("getEntries: ", { results });

    let data: Entry[] = results.map((result) => ({
            habitId: (result.habit_id as number).toString(),
            date: result.completed_on as string,
            count: result.count as number,
    }));

    return data;
}

export async function dbCreateEntry({
    habitId,
    date,
} : {
    habitId: string,
    date: string,
}): Promise<void> {
    await env.habitDB.prepare(`
        INSERT INTO entries (habit_id, completed_on)
        VALUES (?, ?)
    `)
        .bind(habitId, date)
        .run();
}

export async function dbDeleteEntriesByDate({
    habitId,
    date,
} : {
    habitId: string,
    date: string,
}) : Promise<void> {
    await env.habitDB.prepare(`
        DELETE FROM entries
        WHERE habit_id = ? AND completed_on = ?
    `)
        .bind(habitId, date)
        .run();
}
