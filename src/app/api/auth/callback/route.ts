import { NextResponse } from 'next/server';
import axios from 'axios';
import querystring from 'querystring';

const CLIENT_ID = process.env.SECONDME_CLIENT_ID;
const CLIENT_SECRET = process.env.SECONDME_CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI || 'http://localhost:3000/api/auth/callback';
const TOKEN_URL = 'https://app.mindos.com/gate/lab/api/oauth/token/code';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');
    const state = searchParams.get('state');

    if (!code) {
        return NextResponse.json({ error: 'Authorization code missing' }, { status: 400 });
    }

    try {
        const response = await axios.post(
            TOKEN_URL,
            querystring.stringify({
                grant_type: 'authorization_code',
                code: code,
                redirect_uri: REDIRECT_URI,
                client_id: CLIENT_ID,
                client_secret: CLIENT_SECRET,
            }),
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            }
        );

        const data = response.data;
        if (data.code === 0 && data.data) {
            const accessToken = data.data.accessToken;

            // In a real app, store this securely (e.g., HTTP-only cookie, session)
            // For this demo, we'll set it as a cookie
            const res = NextResponse.redirect(new URL('/', request.url));
            res.cookies.set('access_token', accessToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                path: '/',
                maxAge: 7200, // 2 hours
            });
            return res;
        } else {
            return NextResponse.json(data, { status: 500 });
        }
    } catch (error: any) {
        console.error('Token exchange failed', error.response?.data || error.message);
        return NextResponse.json({ error: 'Authentication failed' }, { status: 500 });
    }
}
