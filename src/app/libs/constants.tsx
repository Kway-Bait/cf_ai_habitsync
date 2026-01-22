import { HabitCategory } from './types';
import { 
    Heart, 
    Zap, 
    Brain, 
    User, 
    Users, 
} from 'lucide-react';

export const CATEGORY_ICONS = {
    Health: { icon: Heart, color: "text-red-500" },
    Productivity: { icon: Zap, color: "text-yellow-500" },
    Mindfulness: { icon: Brain, color: "text-purple-500" },
    Personal: { icon: User, color: "text-blue-500" },
    Social: { icon: Users, color: "text-green-500" },
};

export const INITIAL_HABITS = [
    { 
        id: '1', 
        name: 'Drink 2L Water', 
        category: 'Health' as HabitCategory, 
        goal: 1, 
        streak: 5, 
        icon: 'Health', 
    },
    { 
        id: '2', 
        name: 'Meditate', 
        category: 'Mindfulness' as HabitCategory, 
        goal: 1, 
        streak: 3, 
        icon: 'Mindfulness', 
    },
    { 
        id: '3', 
        name: 'Read 20 Pages', 
        category: 'Personal' as HabitCategory, 
        goal: 1, 
        streak: 12, 
        icon: 'Personal', 
    },
    { 
        id: '4', 
        name: 'Deep Work Session', 
        category: 'Productivity' as HabitCategory, 
        goal: 2, 
        streak: 0, 
        icon: 'Productivity', 
    },
];
