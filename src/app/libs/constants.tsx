import React from 'react';

import { 
    Heart, 
    Zap, 
    Brain, 
    User, 
    Users, 
} from 'lucide-react';
import { HabitCategory } from './types';

export const CATEGORY_ICONS: Record<HabitCategory, React.ReactNode> = {
    Health: <Heart className="w-5 h-5 text-red-500" />,
    Productivity: <Zap className="w-5 h-5 text-yellow-500" />,
    Mindfulness: <Brain className="w-5 h-5 text-purple-500" />,
    Personal: <User className="w-5 h-5 text-blue-500" />,
    Social: <Users className="w-5 h-5 text-green-500" />
};

export const INITIAL_HABITS = [
    { 
        id: '1', 
        name: 'Drink 2L Water', 
        description: '',
        category: 'Health' as const, 
        goal: 1, 
        streak: 5, 
        icon: 'Health', 
        createdAt: '2023-01-01' 
    },
    { 
        id: '2', 
        name: 'Meditate', 
        description: 'Uninterupted for 15 minutes',
        category: 'Mindfulness' as const, 
        goal: 1, 
        streak: 3, 
        icon: 'Mindfulness', 
        createdAt: '2023-01-01' 
    },
    { 
        id: '3', 
        name: 'Read 20 Pages', 
        description: '',
        category: 'Personal' as const, 
        goal: 1, 
        streak: 12, 
        icon: 'Personal', 
        createdAt: '2023-01-01' 
    },
    { 
        id: '4', 
        name: 'Deep Work Session', 
        description: '2 hours session',
        category: 'Productivity' as const, 
        goal: 2, 
        streak: 0, 
        icon: 'Productivity', 
        createdAt: '2023-01-01' 
    },
];
