import { NextResponse } from 'next/server';
import crypto from 'crypto';

const CLIENT_ID = process.env.SECONDME_CLIENT_ID;
const REDIRECT_URI = process.env.REDIRECT_URI || 'http://localhost:3000/api/auth/callback';
const AUTH_URL = 'https://go.second.me/oauth/';

export async function GET() {
    const state = crypto.randomBytes(16).toString('hex');
    const params = new URLSearchParams({
        client_id: CLIENT_ID!,
        redirect_uri: REDIRECT_URI,
        response_type: 'code',
        state: state,
        scope: 'user.info chat',
    });

    return NextResponse.redirect(`${AUTH_URL}?${params.toString()}`);
}
