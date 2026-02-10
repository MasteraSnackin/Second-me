import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const CHAT_URL = 'https://app.mindos.com/gate/lab/api/secondme/chat/stream';

export async function POST(request: Request) {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('access_token')?.value;

    if (!accessToken) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();

    try {
        const response = await fetch(CHAT_URL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Chat API Error:', errorText);
            return NextResponse.json({ error: 'Chat API failed', details: errorText }, { status: response.status });
        }

        // Proxy the stream directly
        return new NextResponse(response.body, {
            headers: {
                'Content-Type': 'text/event-stream',
                'Cache-Control': 'no-cache',
                'Connection': 'keep-alive',
            }
        });

    } catch (error: any) {
        console.error('Chat Error', error);
        return NextResponse.json({ error: 'Chat request failed' }, { status: 500 });
    }
}
