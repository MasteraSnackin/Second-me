import { NextResponse } from 'next/server';
import axios from 'axios';
import { cookies } from 'next/headers';

const TTS_URL = 'https://app.mindos.com/gate/lab/api/secondme/tts/generate';

export async function POST(request: Request) {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('access_token')?.value;

    if (!accessToken) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const body = await request.json();
        const { text, emotion = 'fluent' } = body;

        if (!text) {
            return NextResponse.json({ error: 'Text is required' }, { status: 400 });
        }

        const response = await axios.post(TTS_URL, {
            text,
            emotion
        }, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        });

        return NextResponse.json(response.data);
    } catch (error: any) {
        console.error('TTS API Error', error.response?.data || error.message);
        return NextResponse.json({ error: 'Failed to generate speech' }, { status: 500 });
    }
}
