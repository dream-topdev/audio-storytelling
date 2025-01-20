# Audio Stories

A web application for curated audio stories and dialogues.

## 🏗️ Architecture

### Project Structure

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   # Install server dependencies
   cd server
   npm install

   # Install client dependencies
   cd ../client
   npm install
   ```

3. Set up environment variables (optional for development):
   ```bash
   # In the server directory
   cp .env.example .env
   
   # In the client directory
   cp .env.example .env.local
   ```
   
   Note: In development mode, the application will use default configurations if no environment files are present.
   
   If you need custom configurations, update the environment files:
   - Server `.env`: Database connection, JWT secret, etc.
   - Client `.env.local`: API URL and other frontend configs

4. Start the development servers:
   ```bash
   # Start the backend server (from the server directory)
   npm run dev

   # Start the frontend server (from the client directory)
   npm run dev
   ```

5. Visit http://localhost:3000 in your browser

## Architecture Decisions

- **Authentication**: JWT-based authentication with httpOnly cookies for security
- **State Management**: React Context for auth state, local state for audio playback
- **API Structure**: RESTful API endpoints for auth and audio track management
- **Storage**: SQLite database for lightweight, file-based data persistence

## Tech Stack

- Frontend: Next.js, TypeScript, React
- Backend: Node.js, Express, TypeScript
- Authentication: JWT 