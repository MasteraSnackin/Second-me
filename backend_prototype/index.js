require('dotenv').config();
const express = require('express');
const axios = require('axios');
const crypto = require('crypto');
const querystring = require('querystring');

const app = express();
const PORT = process.env.PORT || 3000;

// Configuration
const CLIENT_ID = process.env.SECONDME_CLIENT_ID;
const CLIENT_SECRET = process.env.SECONDME_CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI || 'http://localhost:3000/callback';

// Endpoints
const AUTH_URL = 'https://go.second.me/oauth/';
const TOKEN_URL = 'https://app.mindos.com/gate/lab/api/oauth/token/code';
const USER_INFO_URL = 'https://app.mindos.com/gate/lab/api/secondme/user/info';
const CHAT_URL = 'https://app.mindos.com/gate/lab/api/secondme/chat/stream';

// Global variable to store access token (in-memory for demo purposes)
let globalAccessToken = null;

app.get('/', (req, res) => {
    if (globalAccessToken) {
        res.send('<h1>Logged In</h1><p>Access Token available.</p><ul><li><a href="/user-info">Get User Info</a></li><li><a href="/chat">Test Chat</a></li></ul>');
    } else {
        res.send('<h1>SecondMe API Demo</h1><a href="/login">Login with SecondMe</a>');
    }
});

// Step 1: Redirect to Authorization Page
app.get('/login', (req, res) => {
    const state = crypto.randomBytes(16).toString('hex');
    const params = new URLSearchParams({
        client_id: CLIENT_ID,
        redirect_uri: REDIRECT_URI,
        response_type: 'code',
        state: state,
        // Optional: scope
        scope: 'user.info chat' 
    });
    console.log('Redirecting to:', `${AUTH_URL}?${params.toString()}`);
    res.redirect(`${AUTH_URL}?${params.toString()}`);
});

// Step 2: Handle Callback and Exchange Code for Token
app.get('/callback', async (req, res) => {
    const { code, state } = req.query;

    if (!code) {
        return res.status(400).send('Authorization code missing');
    }

    try {
        console.log('Exchanging code for token...');
        const response = await axios.post(TOKEN_URL, querystring.stringify({
            grant_type: 'authorization_code',
            code: code,
            redirect_uri: REDIRECT_URI,
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET
        }), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        const data = response.data;
        if (data.code === 0 && data.data) {
            globalAccessToken = data.data.accessToken;
            console.log('Access Token received:', globalAccessToken);
            res.redirect('/');
        } else {
            console.error('Token exchange failed:', data);
            res.status(500).json(data);
        }
    } catch (error) {
        console.error('Error exchanging token:', error.response ? error.response.data : error.message);
        res.status(500).send('Authentication failed');
    }
});

// Step 3: Call User Info API
app.get('/user-info', async (req, res) => {
    if (!globalAccessToken) return res.redirect('/login');

    try {
        const response = await axios.get(USER_INFO_URL, {
            headers: { 'Authorization': `Bearer ${globalAccessToken}` }
        });
        res.json(response.data);
    } catch (error) {
        console.error('User Info Error:', error.response ? error.response.data : error.message);
        res.status(500).json({ error: 'Failed to fetch user info' });
    }
});

// Test Chat API (Non-streaming for simplicity in this demo endpoint)
app.get('/chat', async (req, res) => {
    if (!globalAccessToken) return res.redirect('/login');

    try {
        // Note: The documentation shows this is a streaming endpoint. 
        // For a simple GET request we'll just initiate it and show the raw stream response or handle it if it supports non-stream.
        // Usually stream endpoints return chunks. This is a basic test.
        console.log('Sending chat message...');
        const response = await axios.post(CHAT_URL, {
            message: "Hello, introduce yourself"
        }, {
            headers: { 
                'Authorization': `Bearer ${globalAccessToken}`,
                'Content-Type': 'application/json'
            },
            responseType: 'stream' 
        });

        res.setHeader('Content-Type', 'text/event-stream');
        response.data.pipe(res);
    } catch (error) {
        console.error('Chat Error:', error.response ? error.response.data : error.message); // response data might be a stream too
        res.status(500).send('Chat request failed');
    }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
