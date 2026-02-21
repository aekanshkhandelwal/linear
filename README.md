# Linear Clone - Project Management Tool

A comprehensive project management application inspired by Linear, built with a modern tech stack to provide a seamless and efficient workflow for teams and individuals.

## 🚀 Features

### Core Workspace
- **Inbox**: Stay updated with the latest activity and notifications.
- **My Issues**: A personal view of all tasks assigned to you.
- **Teams**: Create and manage multiple teams with their own dedicated issues and projects.
- **Projects**: Organize work into high-level projects with progress tracking.
- **Custom Views**: Create saved views with filters to focus on what matters most.

### Issue Management
- **Detailed Issue Tracking**: Rich details for every issue including descriptions, assignees, and projects.
- **Team-specific Issues**: Filter and view issues specifically associated with a team.
- **Project-linked Issues**: Group issues under specific projects for better organization.

### User Experience & UI
- **Modern Authentication**: Secure login and signup with email/password and **Google OAuth integration**.
- **Responsive Sidebar**: Dedicated sections for personal work, workspace-wide projects, and team-specific views.
- **Customizable Interface**: Customize your sidebar to show or hide sections based on your workflow.
- **Dark Mode Aesthetic**: A premium, dark-themed UI for a focused development experience.
- **Smooth Animations**: Powered by Framer Motion for a fluid and high-end feel.

## 🛠️ Tech Stack

### Frontend
- **React 19** with **Vite** for lightning-fast development and optimized builds.
- **React Router 7** for seamless client-side navigation.
- **Framer Motion** for high-quality UI animations.
- **Lucide React** for beautiful, consistent iconography.
- **CSS3** with a focus on premium aesthetics (Glassmorphism, curated dark palettes).

### Backend
- **Node.js** & **Express** for a robust and scalable API layer.
- **MongoDB** with **Mongoose** for flexible and efficient data modeling.
- **JWT (JSON Web Tokens)** & **Google OAuth** for secure user authentication.
- **Dotenv** for environment variable management.

## ⚙️ Setup & Installation

### Prerequisites
- Node.js (v18 or higher recommended)
- MongoDB account (Atlas or local instance)
- Google Cloud Console project (for Google Auth)

### 1. Clone the repository
```bash
git clone <repository-url>
cd linear-clone
```

### 2. Install dependencies
Install both client and server dependencies:
```bash
npm install
cd server
npm install
cd ..
```

### 3. Environment Variables
Create a `.env` file in the `server` directory with the following variables:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GOOGLE_CLIENT_ID=your_google_client_id
```

### 4. Run the application
You can start both the client and server concurrently from the root directory:
```bash
npm run dev
```
- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:5000

## 📝 Scripts
- `npm run dev`: Starts both frontend and backend in development mode.
- `npm run server`: Starts the backend server only (with nodemon).
- `npm run client`: Starts the Vite development server.
- `npm run build`: Builds the frontend for production.
- `npm run lint`: Runs ESLint for code quality checks.

---
Built with ❤️ for better project management.
