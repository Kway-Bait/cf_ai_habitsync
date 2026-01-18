'use client';

import React, { useMemo } from 'react';
import { 
    XAxis, 
    YAxis, 
    Tooltip, 
    ResponsiveContainer, 
    AreaChart, 
    Area 
} from 'recharts';
import { Habit, Entry } from '@/app/libs/types';
import { format, subDays, startOfMonth, endOfMonth, eachDayOfInterval } from 'date-fns';

export default function StatsDashboard() {
    const habits: Habit[] = [];
    const entries: Entry[] = [];

    const isDark = document.documentElement.classList.contains('dark');

    // Weekly trend data
    const weeklyData = useMemo(() => {
        return Array.from({ length: 7 }).map((_, i) => {
            const date = subDays(new Date(), 6 - i);
            const dateStr = format(date, 'yyyy-MM-dd');
            const completedCount = entries.filter(e => e.date === dateStr && e.count > 0).length;
            return {
                name: format(date, 'EEE'),
                completed: completedCount,
            };
        });
    }, [entries]);

    // Heatmap data for current month
    const monthDays = useMemo(() => {
        const start = startOfMonth(new Date());
        const end = endOfMonth(new Date());
        return eachDayOfInterval({ start, end });
    }, []);

    const getCompletionIntensity = (date: Date) => {
        const dateStr = format(date, 'yyyy-MM-dd');
        const dayEntries = entries.filter(e => e.date === dateStr);
        if (dayEntries.length === 0) return isDark ? 'bg-slate-800' : 'bg-gray-100';

        const completedRatio = dayEntries.length / (habits.length || 1);
        if (completedRatio > 0.8) return 'bg-indigo-600';
        if (completedRatio > 0.5) return 'bg-indigo-500/70';
        if (completedRatio > 0.2) return 'bg-indigo-400/40';
        return isDark ? 'bg-slate-700' : 'bg-gray-200';
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Metrics Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: 'Habits Active', value: habits.length, color: 'text-indigo-600' },
                    { label: 'Check-ins', value: entries.length, color: 'text-emerald-500' },
                    { label: 'Success Rate', value: '84%', color: 'text-orange-500' },
                    { label: 'Longest Streak', value: '12d', color: 'text-purple-500' },
                ].map((stat, i) => (
                        <div key={i} className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-gray-100 dark:border-slate-800 shadow-sm">
                            <p className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-1">{stat.label}</p>
                            <p className={`text-4xl font-black ${stat.color}`}>{stat.value}</p>
                        </div>
                    ))}
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                {/* Activity Chart Card */}
                <div className="xl:col-span-2 bg-white dark:bg-slate-900 p-10 rounded-[2.5rem] border border-gray-100 dark:border-slate-800 shadow-sm">
                    <div className="flex items-center justify-between mb-10">
                        <h3 className="text-xl font-black text-gray-900 dark:text-white">Activity Flow</h3>
                        <div className="flex space-x-2">
                            <span className="w-3 h-3 rounded-full bg-indigo-500" />
                            <span className="text-xs font-bold text-gray-400">Past 7 Days</span>
                        </div>
                    </div>
                    <div className="h-72 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={weeklyData}>
                                <defs>
                                    <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <XAxis 
                                    dataKey="name" 
                                    axisLine={false} 
                                    tickLine={false} 
                                    tick={{fill: isDark ? '#475569' : '#94a3b8', fontSize: 11, fontWeight: 'bold'}} 
                                    dy={10}
                                />
                                <Tooltip 
                                    contentStyle={{ 
                                        backgroundColor: isDark ? '#0f172a' : '#fff', 
                                        borderRadius: '16px', 
                                        border: 'none', 
                                        boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                                        fontSize: '12px',
                                        fontWeight: 'bold',
                                        color: isDark ? '#fff' : '#000'
                                    }}
                                    cursor={{ stroke: '#6366f1', strokeWidth: 2, strokeDasharray: '4 4' }}
                                />
                                <Area 
                                    type="monotone" 
                                    dataKey="completed" 
                                    stroke="#6366f1" 
                                    strokeWidth={4}
                                    fillOpacity={1} 
                                    fill="url(#chartGradient)" 
                                    animationDuration={2000}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Heatmap Card */}
                <div className="bg-white dark:bg-slate-900 p-10 rounded-[2.5rem] border border-gray-100 dark:border-slate-800 shadow-sm">
                    <div className="flex flex-col mb-8">
                        <h3 className="text-xl font-black text-gray-900 dark:text-white">Consistency</h3>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">Monthly Heatmap</p>
                    </div>
                    <div className="grid grid-cols-7 gap-2.5">
                        {['Sn', 'M', 'Tu', 'W', 'Th', 'F', 'St'].map(d => (
                            <div key={d} className="text-center text-[10px] font-black text-gray-400 dark:text-gray-600 mb-2">{d}</div>
                        ))}
                        {monthDays.map((day, idx) => (
                            <div 
                                key={idx}
                                className={`aspect-square rounded-lg transition-all hover:scale-110 cursor-help ${getCompletionIntensity(day)} shadow-sm`}
                                title={format(day, 'MMMM dd')}
                            />
                        ))}
                    </div>
                    <div className="mt-10 pt-8 border-t border-gray-50 dark:border-slate-800 flex items-center justify-between text-[10px] font-black text-gray-400 uppercase tracking-widest">
                        <span>Progressive Build</span>
                        <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 bg-gray-100 dark:bg-slate-800 rounded-sm" />
                            <div className="w-3 h-3 bg-indigo-200/50 rounded-sm" />
                            <div className="w-3 h-3 bg-indigo-400/50 rounded-sm" />
                            <div className="w-3 h-3 bg-indigo-600 rounded-sm shadow-[0_0_8px_rgba(99,102,241,0.5)]" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
