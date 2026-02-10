# SecondMe API Integration

This project demonstrates how to integrate with the SecondMe API using Node.js and Express.

## Setup

1.  **Dependencies**: Install the required packages.
    ```bash
    npm install
    ```

2.  **Configuration**:
    -   Copy `.env.example` to `.env`.
    -   Open `.env` and fill in your `SECONDME_CLIENT_ID` and `SECONDME_CLIENT_SECRET`.
    -   **Important**: You must register your application in the [MindVerse Developer Console](https://app.mindos.com/) to get these credentials.
    -   Ensure your Redirect URI in the console is set to `http://localhost:3000/callback`.

3.  **Run**:
    ```bash
    npm start
    ```

4.  **Usage**:
    -   Open `http://localhost:3000` in your browser.
    -   Click "Login with SecondMe" to start the OAuth2 flow.
    -   Once authenticated, you can view your User Info or test the Chat API.

## Project Structure

-   `index.js`: Main application logic handling Auth and API calls.
-   `.env`: Configuration secrets (not committed).
