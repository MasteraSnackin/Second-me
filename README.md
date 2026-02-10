# SecondMe Avatar Client

A futuristic Next.js client for managing and interacting with your personalised SecondMe AI avatar.

***






***

## Description

SecondMe Avatar Client is a glassmorphism-styled web application that acts as the main interface for your SecondMe AI avatar, integrating chat, memory management, and personality visualisation in a single dashboard. It is designed for developers, power users, and AI enthusiasts who want a rich, customisable front end on top of the SecondMe API. The project solves the challenge of managing conversational context, avatar personality, and long-term memories through an opinionated, production-ready Next.js 16 client.

***

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture Overview](#architecture-overview)
- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [Screenshots / Demo](#screenshots--demo)
- [API / CLI Reference](#api--cli-reference)
- [Tests](#tests)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)
- [Contact / Support](#contact--support)

***

## Features

- Glassmorphism-inspired dashboard with a modular bento-style layout for quick access to key avatar functions.
- Chat interface for real-time interaction with your SecondMe avatar via the proxied SecondMe API.
- Personality "Shades" view to visualise traits, confidence levels, and high-level behavioural profile.
- Active Memory management, including viewing soft memories and manually adding new facts to the avatar.
- Text-to-speech output so the avatar can speak responses directly in the browser (when configured).
- Responsive design optimised for desktop and modern mobile browsers.
- Ready for Vercel one-click deployment with environment-based configuration.

***

## Tech Stack

- Framework: **Next.js 16** with the App Router and TypeScript.
- Styling: **Tailwind CSS**, Framer Motion animations, Lucide React icon set.
- API Integration: **SecondMe API** consumed via Next.js API routes (server-side proxy).
- Tooling: ESLint, TypeScript configuration, and modern npm-based workflow.

***

## Architecture Overview

```mermaid
flowchart LR
  User[User Browser] --> UI[SecondMe Avatar Client (Next.js 16)]
  UI --> API[Next.js API Routes]
  API --> SecondMeAPI[SecondMe API Service]
  API --> DB[(Optional App DB)]
  SecondMeAPI --> ExternalLLM[External LLM / AI Provider]
```

The **User Browser** communicates with the SecondMe Avatar Client built on Next.js, which renders the UI and routes interactions. UI requests that require data or avatar actions go through Next.js API routes, which proxy calls to the external SecondMe API and optionally a backing database, while the SecondMe platform can in turn call underlying LLM and AI services.

***

## Installation

- Prerequisites:
  - Node.js `>= 18.x` (LTS recommended).
  - npm `>= 9.x`.
  - A valid SecondMe API client ID and secret (from your SecondMe account).

- Steps:

  1. Clone the repository:
     ```bash
     git clone https://github.com/MasteraSnackin/Second-me.git
     cd Second-me
     ```
  2. Install dependencies:
     ```bash
     npm install
     ```
  3. Create an environment file `.env.local` in the project root:
     ```bash
     SECONDME_CLIENT_ID=<YOUR_SECONDME_CLIENT_ID>
     SECONDME_CLIENT_SECRET=<YOUR_SECONDME_CLIENT_SECRET>
     NEXT_PUBLIC_APP_URL=http://localhost:3000
     ```
  4. (Optional) Add any extra configuration values required by your SecondMe workspace:
     ```bash
     # Example placeholders
     SECONDME_WORKSPACE_ID=<ADD_WORKSPACE_ID_HERE>
     SECONDME_AVATAR_ID=<ADD_AVATAR_ID_HERE>
     ```

***

## Usage

- Start the development server:

  ```bash
  npm run dev
  ```

- Open the app in your browser:

  ```text
  http://localhost:3000
  ```

- Typical workflow:

  - Sign in or connect using your SecondMe credentials or configured auth flow (if enabled).  
  - Open the **Chat** panel to talk to your avatar and observe responses and TTS output.  
  - Navigate to **Shades** to inspect and tweak personality traits and confidence levels.
  - Use the **Memory** tools to review soft memories and add new structured facts about yourself.

- Practical example (calling a local API route from client code):

  ```ts
  // Example: send a chat message to the avatar
  const res = await fetch("/api/secondme/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: "Hello, who are you?" }),
  });

  const data = await res.json();
  console.log("Avatar reply:", data.reply);
  ```

***

## Configuration

- Environment variables (typical):

  - `SECONDME_CLIENT_ID` – OAuth or API client identifier for the SecondMe platform.
  - `SECONDME_CLIENT_SECRET` – Secret associated with the client ID; keep this server-side only.
  - `NEXT_PUBLIC_APP_URL` – Public URL of the client (used for redirects and links).  
  - `SECONDME_WORKSPACE_ID` – <ADD OPTIONAL WORKSPACE ID CONFIG EXPLANATION HERE>.  
  - `SECONDME_AVATAR_ID` – <ADD OPTIONAL AVATAR ID CONFIG EXPLANATION HERE>.  

- Config files:

  - `next.config.ts` – Next.js configuration and any custom rewrites or headers.
  - `tsconfig.json` – TypeScript compiler options.
  - `eslint.config.mjs` – Linting rules and project standards.

Update the placeholders above to match your actual SecondMe environment setup.

***

## Screenshots / Demo

- Dashboard preview (design reference):

  <ADD SCREENSHOT HERE>

- Personality "Shades" view:

  <ADD SCREENSHOT HERE>

- Live demo:

  - Deployed instance: https://second-me-psi.vercel.app/ (subject to availability).

Replace the placeholder screenshots with real captures from your running deployment.

***

## API / CLI Reference

This project primarily exposes a browser-based UI, backed by internal Next.js API routes that proxy the SecondMe API.

- Example internal API route (conceptual):

  ```http
  POST /api/secondme/chat
  Content-Type: application/json

  {
    "message": "Tell me about my current goals."
  }
  ```

  Response shape (example):

  ```json
  {
    "reply": "You told me you are focusing on health, career growth, and learning TypeScript.",
    "meta": {
      "source": "active_memory",
      "confidence": 0.92
    }
  }
  ```

- Additional routes (placeholders, adjust to match implementation):

  - `POST /api/secondme/memory` – Add or update a soft memory entry.  
  - `GET /api/secondme/shades` – Retrieve current personality trait distribution.  

If you introduce a CLI wrapper for these APIs in future, document those commands in this section.

***

## Tests

- Test framework: <ADD TEST FRAMEWORK HERE, E.G. VITEST / JEST / PLAYWRIGHT>.  

- Local test commands (suggested):

  ```bash
  # Unit / integration tests
  npm test

  # Linting
  npm run lint
  ```

If no tests are currently implemented, you can keep the commands as placeholders and wire them up once a test suite is added.

***

## Roadmap

- Add full test coverage for chat flows, memory management, and personality views.  
- Implement richer analytics on avatar interactions and memory usage.  
- Introduce role-based access and multi-avatar workspace support.  
- Add offline-friendly caching strategies for recent conversations.  
- Provide first-party CLI tooling for scripted avatar management.  

***

## Contributing

Contributions are welcome and encouraged.

- Before starting major work, please open an issue in the GitHub repository to discuss your proposal.  
- Fork the repository and create a feature branch for your changes.  
- Keep pull requests focused, with clear descriptions and, where possible, accompanying tests.  
- Ensure `npm run lint` and your test suite (when available) pass before submitting a PR.

Issues and pull requests can be opened directly on GitHub at:  
https://github.com/MasteraSnackin/Second-me/issues

***

## License

This project is licensed under the **MIT License** – see the `LICENSE` file in this repository for full details.

***

## Contact / Support

- Maintainer: <ADD MAINTAINER NAME HERE>  
- GitHub: https://github.com/MasteraSnackin/Second-me  
- Email: <ADD CONTACT EMAIL HERE>  
- Additional links (website, docs, community): <ADD LINKS HERE>  

For bug reports or feature requests, please use the GitHub issues page so discussions stay visible and trackable.
