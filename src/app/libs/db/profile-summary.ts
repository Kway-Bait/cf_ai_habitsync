'use server';

import { getCloudflareContext } from "@opennextjs/cloudflare";
import { ProfileSummary } from '@/app/libs/types';

export async function dbGetProfileSummary({
    userId,
} : {
    userId: string,
}): Promise<ProfileSummary> {
    const { env } = getCloudflareContext();

    const result = await env.habitDB.prepare(`
        SELECT * FROM profile_summary WHERE user_id = ?
    `)
        .bind(userId)
        .first()

    const data: ProfileSummary = {
        summary: result?.summary as string,
        updatedAt: result?.updated_at as string,
    }

    return data;
}

export async function dbCreateProfileSummary({
    userId,
} : {
    userId: string,
}) {
    const { env } = getCloudflareContext();

    await env.habitDB.prepare(`
        INSERT INTO profile_summary (user_id, summary)
        VALUES (?, ?)
    `)
        .bind(userId, "")
        .run();
}

export async function dbUpdateProfileSummary({
    userId,
    summary,
} : {
    userId: string,
    summary: string,
}) {
    const { env } = getCloudflareContext();

    await env.habitDB.prepare(`
        UPDATE profile_summary
        SET summary = ?, updated_at = ?
        WHERE user_id = ?
    `)
        .bind(summary, Date().toString(), userId)
        .run();
}
