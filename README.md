# Audio Stories

A modern web application for streaming curated audio stories and dialogues, featuring a responsive design and seamless playback experience.

## 🚀 Quick Start

1. **Prerequisites**
   - Node.js (v16 or higher)
   - npm or yarn

2. **Clone and Setup**
   ```bash
   # Clone the repository
   git clone https://github.com/dream-topdev/audio-storytelling.git
   cd audio-storytelling

   # Install dependencies (from project root)
   npm run install:all
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

   The application will be available at:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## 🏗️ Architecture Overview

### Frontend Architecture
- **Component Structure**: Modular components with clear separation of concerns
- **State Management**: 
  - Auth state managed via NextAuth.js for secure authentication
  - Local state for audio player controls and playlist management
- **Theme System**: Dynamic light/dark mode with Material-UI
- **Type Safety**: Full TypeScript implementation

### Backend Architecture
- **API Design**: RESTful architecture with versioned endpoints
- **Security**: 
  - NextAuth.js authentication with built-in session management
  - CORS configuration for secure client-server communication
- **Database**: SQLite with TypeORM for robust entity management
- **Error Handling**: Centralized error management with custom middleware

### Key Technical Decisions
- **TypeScript**: Ensures type safety across the full stack
- **Material-UI**: Provides consistent, responsive UI components
- **Express.js**: Lightweight, flexible backend framework
- **TypeORM**: Type-safe database operations with powerful entity relationships
- **NextAuth.js**: Flexible authentication with multiple provider support

## 💻 Tech Stack

### Frontend
- Next.js + React
- TypeScript
- Material-UI
- NextAuth.js
- React Context

### Backend
- Node.js + Express
- TypeScript
- TypeORM
- SQLite
- NextAuth.js