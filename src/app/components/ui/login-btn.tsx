'use client';

import { signIn, signOut } from 'next-auth/react';
import { LogIn } from 'lucide-react';

export default function LoginBtn({ session } : { session: any }) {
    console.log({ session });
    if (session) {
        return (
            <button
                onClick={() => signOut()}
                className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-full font-bold text-sm shadow-xl shadow-indigo-100 dark:shadow-none transition-all hover:scale-105 active:scale-95"
            >
                <LogIn className="w-4 h-4" />
                <span>Sign Out</span>
            </button>
        )
    } else {
        return (
            <button
                onClick={() => signIn()}
                className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-full font-bold text-sm shadow-xl shadow-indigo-100 dark:shadow-none transition-all hover:scale-105 active:scale-95"
            >
                <LogIn className="w-4 h-4" />
                <span>Sign In</span>
            </button>
        )
    }
}
