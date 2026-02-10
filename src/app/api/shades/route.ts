import { NextResponse } from 'next/server';
import axios from 'axios';
import { cookies } from 'next/headers';

const SHADES_URL = 'https://app.mindos.com/gate/lab/api/secondme/user/shades';

export async function GET() {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('access_token')?.value;

    if (!accessToken) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const response = await axios.get(SHADES_URL, {
            headers: { 'Authorization': `Bearer ${accessToken}` }
        });
        return NextResponse.json(response.data);
    } catch (error: any) {
        console.error('Shades API Error', error.response?.data || error.message);
        return NextResponse.json({ error: 'Failed to fetch shades' }, { status: 500 });
    }
}
