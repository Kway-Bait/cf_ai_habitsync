'use client';

import React from 'react';
import Link from 'next/link';
import { signIn } from 'next-auth/react';

export default function RedirectBtn({ 
    session,
    children,
} : { 
    session: any,
    children: React.ReactNode;
}) {
    if (session) {
        return (
            <Link href="/dashboard">
                {children}
            </Link>
        )
    } else {
        return (
            <button onClick={() => signIn()}>
                {children}
            </button>
        )
    }
}

