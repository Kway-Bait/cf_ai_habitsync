import type { NextAuthOptions } from 'next-auth';
import NextAuth from 'next-auth';
import { config } from '@/app/libs/auth';

const handler = NextAuth(config as NextAuthOptions);

export { handler as GET, handler as POST }
