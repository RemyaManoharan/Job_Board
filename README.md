# Job Sphere App
A full-stack job search application where users can browse listings, apply for positions, and manage their job applications. Built with React, TypeScript, Tailwind CSS on the frontend, and Node.js, Express, and PostgreSQL on the backend.

## 🌟 Key Features
### Frontend
- Browse and filter job listings by category, salary range, and work arrangement (remote/in-office)
- Apply for jobs with a streamlined application form (name, email, resume upload)
- Paginated job listings for efficient browsing
- Secure user authentication (signup, login, logout) using JWT

### Backend
- RESTful API endpoints for job listings with pagination support
- User authentication system with JWT implementation
- Job application processing and storage
- Database integration with PostgreSQL

## 🛠️ Technologies & Libraries Used

### Core Technologies
- **React 18** - Frontend UI library
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework
- **PostgreSQL** - Relational database management system

### State Management & Routing
- **Zustand** - Lightweight state management
- **React Router DOM** - Navigation and routing

### Development Tools
- **Vite** - Build tool and development server
- **ESLint** - Code linting
- **Prettier** - Code formatting

## 📋 Prerequisites

- Node.js (v20.13.1)
- npm (comes with Node.js)
- PostgreSQL

## 🚀 Installation & Setup

### Clone the Repository
`git clone https://github.com/RemyaManoharan/Job_Board.git`

#### Frontend Set Up
```sh
cd job_board_frontend
npm install
npm run dev
```
The frontend will be available at http://localhost:5173

#### Backend Set Up
```sh
cd job_board_backend
npm install
npm run server

The backend API will be running at http://localhost:3000
### 📝 Environment Variables
Create a .env file in the backend directory with the following variables:
PORT=8000
DATABASE_URL=postgresql://username:password@localhost:5432/jobsphere
JWT_SECRET=your_jwt_secret

### 📊 Database Setup

#### Configure Enviroment variables

DB_USER=your_postgres_username
DB_PASSWORD=your_postgres_password
DB_HOST=localhost
DB_PORT=5432
DB_NAME=job_board
Replace your_postgres_username and your_postgres_password with your actual PostgreSQL credentials.

#### Run Database Initialization Script
`node src/initDb.js`
If everything is set up correctly, you should see: Successfully connected to PostgreSQL database

