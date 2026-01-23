import { getServerSession } from "next-auth"
import GoogleProvider from 'next-auth/providers/google';
import { dbGetUser, dbCreateUser } from '@/app/libs/db/auth';

export const config = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_OAUTH_CLIENT_ID,
            clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
        })
    ],
    session: {
        strategy: "jwt"
    },
    jwt: {
        maxAge: 60 * 60 * 24 * 30,
    },
    callbacks: {
        async signIn({ user }) {
            try{
                if (!user.email) return false;

                const dbUser = await dbGetUser({ email: user.email });

                if (!dbUser.id) {
                    await dbCreateUser({ user: {
                        id: crypto.randomUUID(),
                        name: user.name,
                        email: user.email
                    }});
                }

                return true;
            } catch (error) {
                console.error('Error during signIn callback:', error);
                return false;
            }
        },

        async jwt({ token }) {
            const dbUser = await dbGetUser({ email: token.email });

            if (dbUser.id) {
                token.id = dbUser.id
            }

            return token;
        },

        async session({ session, token }) {
            session.user.id = token.id;
            return session;
        },
    }
};

export function auth() {
    return getServerSession(config);
}
