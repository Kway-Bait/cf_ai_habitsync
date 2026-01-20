'use server';

import { getCloudflareContext } from '@opennextjs/cloudflare';
import { Habit, User, HabitCategory } from '@/app/libs/types';

const { env } = getCloudflareContext();

export async function dbGetUserHabits({
    user,
} : {
    user: User,
}): Promise<Habit[]> {
    const { results } = await env.habitDB.prepare(
        "SELECT * FROM habits WHERE user_id = ? AND archived_at IS NULL",
    )
        .bind(user.id.toString())
        .run();

    // console.log("getUserHabits: ", { results });

    let data: Habit[] = results.map(result => ({
        id: (result.id as number).toString(),
        name: result.name as string,
        description: result.description as string,
        category: result.category as HabitCategory || 'Health',
        goal: result.goal as number,
        createdAt: result.created_at as string,
    }));

    // console.log("getUserHabits: ", { data });
    return data;
}
