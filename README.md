# Audio Stories

A modern web application for streaming curated audio stories and dialogues, featuring a responsive design and seamless playback experience.

## 🎥 Demo Video

Watch the demo video [here](https://www.loom.com/share/360379c187c5446eb29601482277e746)

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
   # Start both the backend and frontend servers from the root directory
   npm run dev:all

   # Alternatively, start the backend server (from the server directory)
   npm run dev
   
   # And start the frontend server (from the client directory)
   npm run dev
   ```

   The application will be available at:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## 🏗️ Architecture Overview

### Frontend Architecture
- **Component Structure**: Modular components with clear separation of concerns
- **State Management**: 
  - Auth state managed via Session-based cookies + JSON Web Tokens (JWT) for secure authentication
  - Local state for audio player controls and playlist management
  - React Context is used to manage authentication actions and user information, providing a centralized way to access and update auth state across the application.
- **Theme System**: Dynamic light/dark mode with Material-UI
- **Type Safety**: Full TypeScript implementation
- **Routing**: Next.js routing with dynamic routes and API routes
- **Middleware**: Custom middleware for authentication and route protection


### Backend Architecture
- **API Design**: RESTful architecture with endpoints
- **Security**: 
  - Session-based cookies + JSON Web Tokens (JWT) for authentication, utilizing custom middleware to decode cookie tokens and pass the req.user decoded information to the controller
  - CORS configuration for secure client-server communication
- **Database**: SQLite with TypeORM for robust entity management
- **Error Handling**: Centralized error management with custom middleware

### Key Technical Decisions
- **TypeScript**: Ensures type safety across the full stack
- **Material-UI**: Provides consistent, responsive UI components
- **Express.js**: Lightweight, flexible backend framework
- **TypeORM**: Type-safe database operations with powerful entity relationships
- **Session-based cookies + JSON Web Tokens (JWT)**: Flexible authentication with multiple provider support

## 💻 Tech Stack

### Frontend
- Next.js + React
- TypeScript
- Material-UI
- Session-based cookies + JSON Web Tokens (JWT) for authentication
- React Context
- React Hooks
### Backend
- Node.js + Express
- TypeScript
- TypeORM
- SQLite
- Session-based cookies + JSON Web Tokens (JWT) for authentication


## 📚 Documentation

- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
- [Material-UI Documentation](https://mui.com/material-ui/getting-started/overview/)
- [TypeORM Documentation](https://typeorm.io/)
- [SQLite Documentation](https://www.sqlite.org/docs.html)
- [Express Documentation](https://expressjs.com/en/4x/api.html)
- [Node.js Documentation](https://nodejs.org/en/docs)
- [JWT Documentation](https://jwt.io/)
- [Session-based cookies Documentation](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies)

## 🎨 UI/UX Design Decisions

The user interface design of the application is inspired by a blend of contemporary aesthetics and functional layouts. The primary color scheme is centered around a vibrant pink, reminiscent of the design ethos found on Quinn's website, which evokes a sense of warmth and approachability.
The overall layout draws significant influence from the Windows Media Player screen, emphasizing a clean and intuitive user experience. This layout facilitates easy navigation and enhances user engagement, allowing users to seamlessly interact with audio content.
For the authentication process, the application utilizes Material-UI's default authentication forms for login and registration. This choice ensures a consistent and familiar experience for users, leveraging Material-UI's robust design principles to provide a responsive and accessible interface.
Additionally, I have implemented a light/dark mode switcher using MUI's theme providers. This feature works seamlessly, allowing users to toggle between light and dark modes, enhancing usability and comfort based on their preferences and ambient lighting conditions.
Furthermore, the application is designed to be mobile responsive, ensuring an optimal viewing experience across a wide range of devices, from desktops to smartphones. This responsiveness enhances accessibility and usability, allowing users to engage with the application effortlessly, regardless of their device.
