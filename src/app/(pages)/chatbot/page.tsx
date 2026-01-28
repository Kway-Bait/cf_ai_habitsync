import ChatBox from './_components/chat-box';
import { auth } from '@/app/libs/auth';
import { fetchMessages } from './action';

export default async function Page(){
    const session = await auth();
    const user = session?.user;

    if (!user) throw new Error("User is not logged in");

    const messages = await fetchMessages({ userId: user.id });

    return (
        <main>
            <ChatBox userId={user.id} initialMessages={messages} />
        </main>
    );
};
