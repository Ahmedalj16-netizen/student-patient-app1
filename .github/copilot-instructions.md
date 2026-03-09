# Student/Patient Management System - Copilot Instructions

## Project Overview
This is a complete full-stack Node.js application with Express backend, SQLite database, and HTML/CSS/JavaScript frontend. It provides user authentication and management for students and patients.

## Setup Status
- ✅ Project scaffolded and configured
- ✅ Backend server (Express.js) created with RESTful APIs
- ✅ SQLite database initialized with three tables (users, students, patients)
- ✅ Frontend created with responsive design (login, register, dashboard)
- ✅ Dependencies installed (Express, SQLite3, CORS, Body-Parser)
- ✅ Server tested and running successfully
- ✅ API endpoints verified and working

## Project Structure
```
.
├── server.js                 # Express server & API
├── package.json             # Dependencies
├── README.md                # Documentation
├── database.db              # SQLite database (auto-created)
├── .vscode/tasks.json       # VS Code build tasks
└── public/                  # Frontend files
    ├── index.html           # Home page
    ├── login.html           # Login page
    ├── register.html        # Registration page
    ├── dashboard.html       # Dashboard
    ├── styles.css           # Styles
    ├── script.js            # Utilities
    └── dashboard.js         # Dashboard logic
```

## Running the Application

### Start the server:
```bash
npm start
```
or
```bash
node server.js
```

The application will be available at `http://localhost:3000`

## Using VS Code Task
You can also run the application using the VS Code task runner:
1. Press `Ctrl+Shift+B` (or `Cmd+Shift+B` on macOS)
2. Select "Start Student/Patient App"
3. The server will start on port 3000

## Key Features Implemented

### Authentication
- User registration with email/password
- User login validation
- Role-based system (Student/Patient)

### Data Management
- User profiles with first/last names
- Student records with major and enrollment date
- Patient records with date of birth and medical history

### API Endpoints
- User registration and login
- Student CRUD operations
- Patient CRUD operations
- User management

### Frontend
- Responsive design with gradient backgrounds
- Modal forms for adding students/patients
- Dashboard with multiple sections
- Real-time data loading
- Professional styling with CSS3

## Test Account
After running the application, register a test account:
- Email: test@example.com
- Password: password123
- Role: student (or patient)

Then login with those credentials to access the dashboard.

## Verify Installation
The server has been tested and verified to be working:
- ✅ Server responds to HTTP requests
- ✅ APIs return correct status codes
- ✅ Database tables created successfully
- ✅ User registration tested (Status: 201 Created)

## Notes for Production
For production deployment, consider:
1. Implement password hashing (bcrypt)
2. Add JWT token authentication
3. Use environment variables for configuration
4. Enable HTTPS
5. Add input validation and sanitization
6. Implement proper error handling and logging
7. Use production database (PostgreSQL/MySQL)
8. Add security headers and CORS configuration

## Troubleshooting
- If port 3000 is in use, modify `PORT` variable in server.js
- To reset database, delete database.db and restart server
- Check browser console for frontend errors
- Check terminal for backend errors

## Documentation
See README.md for detailed documentation, API reference, and usage instructions.
