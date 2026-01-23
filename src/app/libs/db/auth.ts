'use server';

import { getCloudflareContext } from '@opennextjs/cloudflare';
import { User } from '@/app/libs/types';

export async function dbGetUser({
    email,
} : {
    email: string,
}): Promise<User> {
    const { env } = getCloudflareContext();
    const result = await env.habitDB.prepare(
        "SELECT * FROM users WHERE email = ?"
    )
        .bind(email)
        .first();

    let data: User = {
        id: result?.id as string,
        name: result?.name as string,
        email: result?.email as string,
    }

    return data;
}

export async function dbCreateUser({
    user
} : {
    user: User
}): Promise<void> {
    const { env } = getCloudflareContext();
    await env.habitDB.prepare(`
        INSERT INTO users (id, name, email)
        VALUES (?, ?, ?)
    `)
        .bind(user.id, user.name, user.email)
        .run();
}
