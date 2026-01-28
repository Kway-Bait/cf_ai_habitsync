'use server';

import { getCloudflareContext } from "@opennextjs/cloudflare";
import { Message } from '@/app/libs/types';

const modelName = "@cf/meta/llama-3-8b-instruct";

export async function chatWithAIService({
    userMessage,
    pastMessages,
    profileSummary,
    weekSummary,
    recentPerformance,
} : {
    userMessage: string,
    pastMessages: Message[],
    profileSummary: string,
    weekSummary: string,
    recentPerformance: string,
}): Promise<string> {
    const { env } = getCloudflareContext();
    const messages = [
        { 
            role: "system", 
            content: `
You are a supportive habit coach that tailors advice based on the user's habits. 
You will be provided with detailed habit data and past performance. 
Please analyze the following information and apply it to your advice and responses.

User long-term profile: 
${profileSummary}
${(weekSummary)? "\nPast weeks summary:" : ""}
${weekSummary}

${recentPerformance}

Rule: When responding, review the statistics provided and relate them to the messages as much as possible.
        `},
        ...pastMessages,
        { 
            role: "user",
            content: userMessage,
        }
    ];

    console.log({ messages });
    const response = await env.AI.run(modelName, { messages });

    console.log({ response });
    return response?.response as string;
}
