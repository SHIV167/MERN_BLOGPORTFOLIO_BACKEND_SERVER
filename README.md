# MERN Stack Blog & Portfolio with Admin Dashboard

A full-stack blog and portfolio application built with the MERN stack (MongoDB, Express.js, React.js, Node.js). Features include blog posts, project showcase, skills management, YouTube video integration, contact form with email notifications, and a comprehensive admin dashboard.

## Features

- 🔐 User Authentication & Authorization
- 📝 Blog Post Management
- 🎯 Project Portfolio
- 💪 Skills Showcase
- 🎥 YouTube Video Integration
- 📧 Contact Form with Email Notifications
- 📊 Admin Dashboard
- 🌓 Dark/Light Mode
- 📱 Responsive Design

## Prerequisites

- Node.js (v14 or higher)
- MongoDB Account
- Gmail Account (for email notifications)
- Git

## Installation

1. Clone the repository:
```bash
git clone https://github.com/SHIV167/MERN_BLOG_PORTFOLIO_WITH_BACKEND.git
cd MERN_BLOG_PORTFOLIO_WITH_BACKEND
```

2. Install dependencies for backend and frontend:
```bash
# Install backend dependencies
npm install

# Install frontend dependencies
cd frontend
npm install
```

3. Create environment variables:

Create a `.env` file in the root directory:
```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
NODE_ENV=development

# Email Configuration
EMAIL_USER=your_gmail@gmail.com
EMAIL_PASSWORD=your_gmail_app_password
ADMIN_EMAIL=admin@yourdomain.com
```

## Email Setup

1. Enable 2-Step Verification in your Gmail account
2. Generate an App Password:
   - Go to Google Account settings
   - Security > 2-Step Verification
   - Scroll down and select 'App passwords'
   - Generate a new app password
3. Use this password in your `.env` file

## Running the Application

1. Start the backend server:
```bash
# From the root directory
npm start
```

2. Start the frontend development server:
```bash
# From the frontend directory
cd frontend
npm start
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## Admin Account Setup

1. Register a new account at `/register`
2. By default, new accounts are not admin
3. Manually update the user in MongoDB to make them admin:
```javascript
db.users.updateOne(
  { email: "your@email.com" },
  { $set: { isAdmin: true } }
)
```

## Available API Endpoints

### Authentication
- POST `/api/users/register` - Register new user
- POST `/api/users/login` - Login user
- GET `/api/users/profile` - Get user profile

### Blog Posts
- GET `/api/posts` - Get all posts
- POST `/api/posts` - Create new post
- GET `/api/posts/:id` - Get single post
- PUT `/api/posts/:id` - Update post
- DELETE `/api/posts/:id` - Delete post

### Contact
- POST `/api/contact` - Send contact message
- GET `/api/contact` - Get all messages (admin only)
- PUT `/api/contact/:id/status` - Update message status
- DELETE `/api/contact/:id` - Delete message

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License

## Contact

Shiv Jha - [@your_twitter](https://twitter.com/your_twitter)

Project Link: [https://github.com/SHIV167/MERN_BLOG_PORTFOLIO_WITH_BACKEND](https://github.com/SHIV167/MERN_BLOG_PORTFOLIO_WITH_BACKEND)