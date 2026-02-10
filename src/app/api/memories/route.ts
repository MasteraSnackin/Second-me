import { NextResponse } from 'next/server';
import axios from 'axios';
import { cookies } from 'next/headers';

const MEMORIES_URL = 'https://app.mindos.com/gate/lab/api/secondme/user/softmemory';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const pageNo = searchParams.get('pageNo') || '1';
    const pageSize = searchParams.get('pageSize') || '20';
    const keyword = searchParams.get('keyword') || '';

    const cookieStore = await cookies();
    const accessToken = cookieStore.get('access_token')?.value;

    if (!accessToken) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const response = await axios.get(MEMORIES_URL, {
            headers: { 'Authorization': `Bearer ${accessToken}` },
            params: {
                pageNo,
                pageSize,
                keyword
            }
        });
        return NextResponse.json(response.data);
    } catch (error: any) {
        console.error('Memories API Error', error.response?.data || error.message);
        return NextResponse.json({ error: 'Failed to fetch memories' }, { status: 500 });
    }
}
