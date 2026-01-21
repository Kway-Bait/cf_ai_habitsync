'use client';

import { ThemeProvider as NextProvider } from 'next-themes';

export default function ThemeProvider({
	children,
}: Readonly<{
	children: React.ReactNode;
    }>) {
    return (
        <NextProvider
            defaultTheme='system'
            enableSystem={true}
            disableTransitionOnChange
        >
            {children}
        </NextProvider>
    );
}
