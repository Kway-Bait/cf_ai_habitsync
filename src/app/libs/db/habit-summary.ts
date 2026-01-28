'use server';

import { getCloudflareContext } from "@opennextjs/cloudflare";
import { Habit, HabitWeekSummary } from '@/app/libs/types';

export async function dbGetLatestHabitSummary({
    userId,
} : {
    userId: string,
}): Promise<HabitWeekSummary> {
    const { env } = getCloudflareContext();

    const result = await env.habitDB.prepare(`
        SELECT * FROM habit_summaries WHERE user_id = ?
        ORDER BY datetime(created_at) DESC
    `)
        .bind(userId)
        .first();

    const data: HabitWeekSummary = {
        periodStart: result?.period_start as string,
        periodEnd: result?.period_end as string,
        summary: result?.summary as string,
    };

    return data;
}

export async function dbGetHabitSummaries({
    userId,
} : {
    userId: string
}): Promise<HabitWeekSummary[]> {
    const { env } = getCloudflareContext();

    const { results } = await env.habitDB.prepare(`
        SELECT * FROM habit_summaries WHERE user_id = ?
        ORDER BY datetime(created_at) DESC
        LIMIT 3
    `)
        .bind(userId)
        .run();

    const data: HabitWeekSummary[] = results.map(result => ({
        periodStart: result.period_start as string,
        periodEnd: result.period_end as string,
        summary: result.summary as string,
    }));

    return data;
}

export async function dbCreateHabitSummary({
    userId,
    periodStart,
    periodEnd,
    summary,
} : { 
    userId: string,
    periodStart: string,
    periodEnd: string,
    summary: string,
}) {
    const { env } = getCloudflareContext();

    await env.habitDB.prepare(`
        INSERT INTO habit_summaries (user_id, period_start, period_end, summary)
        VALUES (?, ?, ?, ?)
    `)  
        .bind(userId, periodStart, periodEnd, summary)
        .run();
}
