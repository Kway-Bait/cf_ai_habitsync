'use server';

import { getCloudflareContext } from '@opennextjs/cloudflare';

const modelName = "@cf/meta/llama-3-8b-instruct";

export async function generateWeekSummary({
    recentPerformance,
} : {
    recentPerformance: string,
}): Promise<string> {
    const { env } = getCloudflareContext();

    const messages = [
        { role: "system", content: "You are a strict habit coach, but supportive on talking" },
        {
            role: "user",
            content: `
Summarize the user's habit behavior over the last week.

${recentPerformance}

Focus on:
- Trends
- Struggles
- Wins
- Actionable observations

Be concise (4–6 sentences).
`,
        }
    ];

    const response = await env.AI.run(modelName, { messages });

    return response?.response as string;
};

export async function generateProfileSummary({
    currentProfileSummary,
    weekSummary,
    recentPerformance,
} : {
    currentProfileSummary: string,
    weekSummary: string,
    recentPerformance: string,
}): Promise<string> {
    const { env } = getCloudflareContext();

    const messages = [
        { role: "system", content: "You are a strict habit coach, but supportive on talking" },
        {
            role: "user",
            content: `
You are updating a long-term profile of the user as a habit builder,

Existing profile:
${currentProfileSummary}

New observations:
${weekSummary}
${recentPerformance}

Task:
Rewrite the profile to reflect the user's current patterns.
Keep it under 8 sentences.
Focus on tendencies, struggles, motivators, and what helps.
Return the summary in single line.
`,
        }
    ];

    const response = await env.AI.run(modelName, { messages });

    return response?.response as string;
}
