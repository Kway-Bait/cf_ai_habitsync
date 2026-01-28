'use client';

import React, { 
    useState, 
    useRef, 
    useEffect, 
    useOptimistic, 
    useTransition 
} from 'react';

import { useRouter } from 'next/navigation';
import { useHabitContext } from '@/app/context/habit-context';
import { Send, Bot, User, Sparkles, Command } from 'lucide-react';
import { Habit, Entry, Message } from '@/app/libs/types';
import { chatWithAI } from '../action';
import { format } from 'date-fns';
import clsx from 'clsx';

export default function ChatBox({
    userId,
    initialMessages,
} : {
    userId: string,
    initialMessages: Message[]
}) {
    const router = useRouter();

    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const [_, startTransition] = useTransition();
    const [messages, addOptimisticMessage] = useOptimistic<Message[], Message>(
        initialMessages,
        (state: Message[], msg: Message) => [...state, msg]
    )

    async function handleSend() {
        if (!input.trim() || isLoading) return;
        setInput('');

        startTransition(() => {
            addOptimisticMessage({
                role: 'user',
                content: input,
                timestamp: new Date(),
            });
        })

        setIsLoading(true)

        try {
            await chatWithAI({ userId, message: input, messages });

            setIsLoading(false)
            router.refresh()
        } catch (error) {
            console.error("Error in ChatWithAI:", error);
            setIsLoading(false);
        }
    }

    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTo({
                top: scrollRef.current.scrollHeight,
                behavior: 'smooth'
            });
        }
    }, [messages]);

    return (
        <div className="flex flex-col h-[calc(100vh-180px)] bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-xl shadow-indigo-100/20 dark:shadow-none border border-gray-100 dark:border-slate-800 overflow-hidden">
            <div className="p-8 border-b border-gray-50 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-200 dark:shadow-none">
                        <Bot className="text-white w-8 h-8" />
                    </div>
                    <div>
                        <h3 className="font-black text-xl text-gray-900 dark:text-white">Habit Coach</h3>
                        <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                            <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Active Insight</p>
                        </div>
                    </div>
                </div>
                <div className="hidden sm:flex items-center space-x-3 text-gray-400">
                    <Command className="w-4 h-4" />
                    <span className="text-[10px] font-bold uppercase tracking-tighter">Powered by Gemini 3</span>
                </div>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-8 space-y-8 scrollbar-hide">
                {messages.map((msg, i) => (
                    <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`flex max-w-[85%] sm:max-w-[70%] group ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                            <div className={clsx("flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center mt-1 shadow-sm",
                                {
                                    'ml-4 bg-gray-100 dark:bg-slate-800': msg.role === 'user',
                                    'mr-4 bg-indigo-50 dark:bg-indigo-900/30': msg.role !== 'user',
                                }
                            )}>
                                {msg.role === 'user' ? <User className="w-5 h-5 text-gray-500" /> : <Bot className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />}
                            </div>
                            <div>
                                <div className={clsx("p-5 rounded-[1.5rem] text-sm leading-relaxed shadow-sm transition-all duration-300",
                                    {
                                        'bg-indigo-600 text-white rounded-tr-none' :msg.role === 'user', 
                                        'bg-gray-50 dark:bg-slate-800/50 text-gray-800 dark:text-gray-200 rounded-tl-none border border-gray-100 dark:border-slate-800 group-hover:bg-gray-100 dark:group-hover:bg-slate-800':msg.role !== 'user' 
                                    }
                                )}>
                                    {msg.content}
                                </div>
                                <p className={`text-[10px] mt-2 font-bold text-gray-400 uppercase tracking-tighter ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
                                    {format(msg.timestamp, 'HH:mm')}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
                {isLoading && (
                    <div className="flex justify-start">
                        <div className="flex max-w-[70%] flex-row">
                            <div className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center mr-4 bg-indigo-50 dark:bg-indigo-900/30 animate-pulse">
                                <Sparkles className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                            </div>
                            <div className="p-5 bg-gray-50 dark:bg-slate-800/50 rounded-[1.5rem] rounded-tl-none border border-gray-100 dark:border-slate-800 animate-in fade-in duration-500">
                                <div className="flex space-x-1.5">
                                    <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                                    <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                                    <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" />
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Input */}
            <div className="p-8 bg-white dark:bg-slate-900 border-t border-gray-50 dark:border-slate-800">
                <div className="relative flex items-center group">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        placeholder="Tell me about your productivity goals..."
                        className="w-full pl-6 pr-16 py-5 bg-gray-50 dark:bg-slate-800 border border-transparent dark:border-slate-800 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:bg-white dark:focus:bg-slate-900 focus:border-indigo-500/50 transition-all text-gray-900 dark:text-white placeholder-gray-400 font-medium"
                    />
                    <button 
                        onClick={handleSend}
                        disabled={!input.trim() || isLoading}
                        className={clsx("absolute right-3 p-3 rounded-xl transition-all duration-300 transform active:scale-90", 
                            {
                                'bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-100 dark:shadow-none translate-x-0': input.trim() && !isLoading,
                                'bg-gray-200 dark:bg-slate-700 text-gray-400 cursor-not-allowed opacity-50': !(input.trim() && !isLoading),
                            }
                        )}>
                        <Send className="w-5 h-5" />
                    </button>
                </div>
                <p className="mt-3 text-center text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                    Enter to send • Shift + Enter for new line
                </p>
            </div>
        </div>
    )
}
