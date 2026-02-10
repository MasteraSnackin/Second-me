import { NextResponse } from 'next/server';
import axios from 'axios';
import { cookies } from 'next/headers';

const ADD_MEMORY_URL = 'https://app.mindos.com/gate/lab/api/secondme/note/add';

export async function POST(request: Request) {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('access_token')?.value;

    if (!accessToken) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const body = await request.json();
        const { title, content } = body;

        if (!title || !content) {
            return NextResponse.json({ error: 'Title and Content are required' }, { status: 400 });
        }

        const response = await axios.post(ADD_MEMORY_URL, {
            title,
            content
        }, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        });

        return NextResponse.json(response.data);
    } catch (error: any) {
        console.error('Add Memory API Error', error.response?.data || error.message);
        return NextResponse.json({ error: 'Failed to add memory' }, { status: 500 });
    }
}
