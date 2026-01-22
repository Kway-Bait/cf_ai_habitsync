import { z } from 'zod';

export const HabitSchema = z.object({
    id: z.string(),
    name: z.string().min(1, { error: "Please enter a name for the habit." }),
    category: z.enum(['Health', 'Productivity', 'Mindfulness', 'Personal', 'Social']),
    goal: z.coerce
        .number()
        .gt(0, { message: 'Please enter an amount greater than 0.' }),
});

