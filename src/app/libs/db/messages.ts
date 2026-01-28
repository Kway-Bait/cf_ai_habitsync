'use server';

import { getCloudflareContext } from "@opennextjs/cloudflare";
import { Message } from '@/app/libs/types';

export async function dbGetMessages({
    userId,
    numberOfMessages = 5,
} : {
    userId: string,
    numberOfMessages: number,
}): Promise<Message[]> {
    const { env } = getCloudflareContext();

    const { results } = await env.habitDB.prepare(`
        SELECT * FROM (
            SELECT * FROM messages WHERE user_id = ?
            ORDER BY datetime(created_at) DESC
            LIMIT ?
        )
        ORDER BY datetime(created_at) ASC
    `)
        .bind(userId, numberOfMessages)
        .run()

    const data: Message[] = results.map(result => ({
        role: result.role as ('user' | 'assistant'),
        content: result.content as string,
        timestamp: result.created_at as Date,
    }));

    return data;
}

export async function dbCreateMessage({
    userId,
    role,
    content,
} : {
    userId: string,
    role: 'user' | 'assistant',
    content: string,
}) {
    const { env } = getCloudflareContext();

    await env.habitDB.prepare(`
        INSERT INTO messages (user_id, role, content)
        VALUES (?, ?, ?);
    `)
        .bind(userId, role, content)
        .run();
}
