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

3. Start the development servers:
   ```bash
   # Start the backend server (from the server directory)
   npm run dev

   # Start the frontend server (from the client directory)
   npm run dev
   ```

4. Visit http://localhost:3000 in your browser

## Architecture Decisions

- **Authentication**: JWT-based authentication with httpOnly cookies for security
- **State Management**: React Context for auth state, local state for audio playback
- **API Structure**: RESTful API endpoints for auth and audio track management
- **Storage**: SQLite database for lightweight, file-based data persistence

## Tech Stack

- Frontend: Next.js, TypeScript, React
- Backend: Node.js, Express, TypeScript
- Authentication: JWT 