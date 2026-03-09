# Student/Patient Management System

A complete full-stack web application for managing student and patient records with authentication, built with **Node.js**, **Express**, **SQLite**, and **HTML/CSS/JavaScript**.

## Features

- **User Authentication**: Secure login and registration system
- **Role-based Access**: Support for both Student and Patient roles
- **Student Management**: Add, view, and manage student information
- **Patient Management**: Add, view, and manage patient medical records
- **User Management**: View all registered users in the system
- **Responsive Design**: Mobile-friendly interface
- **SQLite Database**: Lightweight, file-based database
- **RESTful API**: Well-structured backend API

## Project Structure

```
.
├── server.js                 # Express server & API endpoints
├── package.json             # Project dependencies
├── database.db              # SQLite database (auto-created)
└── public/                  # Frontend files
    ├── index.html           # Home page
    ├── login.html           # Login page
    ├── register.html        # Registration page
    ├── dashboard.html       # Main dashboard
    ├── styles.css           # Global styles
    ├── script.js            # Utility functions
    └── dashboard.js         # Dashboard functionality
```

## Prerequisites

- **Node.js** (v14 or higher)
- **npm** (comes with Node.js)

## Installation

1. **Clone or extract the project**

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the server**
   ```bash
   npm start
   ```
   or
   ```bash
   node server.js
   ```

4. **Open in browser**
   ```
   http://localhost:3000
   ```

## Database Schema

### Users Table
- `id`: User ID (Primary Key)
- `email`: User email (Unique)
- `password`: User password
- `firstName`: First name
- `lastName`: Last name
- `role`: User role (student/patient)
- `created_at`: Account creation timestamp

### Students Table
- `id`: Student record ID (Primary Key)
- `user_id`: Reference to users table
- `studentId`: Unique student identifier
- `major`: Field of study
- `enrollmentDate`: Enrollment date
- `status`: Student status (active/inactive)

### Patients Table
- `id`: Patient record ID (Primary Key)
- `user_id`: Reference to users table
- `patientId`: Unique patient identifier
- `dateOfBirth`: Patient's date of birth
- `medicalHistory`: Medical history notes
- `status`: Patient status (active/inactive)

## API Endpoints

### Authentication
- `POST /api/register` - Register new user
- `POST /api/login` - Login user

### Users
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Students
- `POST /api/students` - Create student record
- `GET /api/students` - Get all students

### Patients
- `POST /api/patients` - Create patient record
- `GET /api/patients` - Get all patients

## Usage Guide

### Registration
1. Click "Register" on the home page
2. Fill in your details (First Name, Last Name, Email, Password)
3. Select your role (Student or Patient)
4. Click "Register" to create your account
5. You'll be redirected to the login page

### Login
1. Enter your email and password
2. Click "Login"
3. You'll be redirected to your dashboard

### Dashboard Features

**Overview Tab**
- View your profile information
- See system status

**Students Tab**
- View all registered students
- Add new student records
- See student details (ID, major, enrollment date)

**Patients Tab**
- View all registered patients
- Add new patient records
- View medical history

**Users Tab**
- View all users in the system
- See user information and roles

## Test Credentials

After registration, you can use your registered account to login. Here are some example scenarios:

1. **Register as a Student**
   - Email: student@example.com
   - Password: pass123
   - Role: Student

2. **Register as a Patient**
   - Email: patient@example.com
   - Password: pass123
   - Role: Patient

## Security Notes

⚠️ **Important**: This is a demonstration application. For production use:

1. **Hash Passwords**: Implement bcrypt or similar for password hashing
2. **Use HTTPS**: Always use HTTPS in production
3. **Token Authentication**: Implement JWT or session tokens
4. **Input Validation**: Add comprehensive input validation
5. **CORS Configuration**: Configure CORS properly for your domain
6. **Environment Variables**: Use .env files for sensitive data
7. **Database Encryption**: Encrypt sensitive data at rest

## Troubleshooting

**Port Already in Use**
- If port 3000 is already in use, modify the `PORT` variable in `server.js`

**Database Errors**
- Delete `database.db` file to reset the database
- Restart the server

**Module Not Found**
- Run `npm install` again
- Delete `node_modules` folder and `package-lock.json`, then reinstall

## Building for Production

1. Add environment variables for database path
2. Implement proper authentication and authorization
3. Add input validation and sanitization
4. Set up proper error handling
5. Configure CORS for specific domains
6. Add logging and monitoring
7. Consider using a production database (PostgreSQL, MySQL)
8. Add unit and integration tests

## Technologies Used

- **Backend**: Node.js, Express.js
- **Database**: SQLite3
- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Architecture**: REST API

## License

MIT License - Feel free to use this project for educational and personal purposes.

## Support

For issues or questions, please check the console logs and ensure:
1. Port 3000 is available
2. All dependencies are installed
3. Node.js is properly installed
4. You're accessing http://localhost:3000 (not https)

---

**Happy coding! 🚀**
