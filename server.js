const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Database setup
const db = new sqlite3.Database('./database.db', (err) => {
  if (err) {
    console.error('Error opening database:', err);
  } else {
    console.log('Connected to SQLite database');
    initializeDatabase();
  }
});

// Initialize database tables
function initializeDatabase() {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      firstName TEXT NOT NULL,
      lastName TEXT NOT NULL,
      role TEXT DEFAULT 'student',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `, (err) => {
    if (err) console.error('Error creating users table:', err);
    else console.log('Users table ready');
  });

  db.run(`
    CREATE TABLE IF NOT EXISTS students (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      studentId TEXT UNIQUE NOT NULL,
      major TEXT,
      enrollmentDate DATE,
      status TEXT DEFAULT 'active',
      FOREIGN KEY(user_id) REFERENCES users(id)
    )
  `, (err) => {
    if (err) console.error('Error creating students table:', err);
    else console.log('Students table ready');
  });

  db.run(`
    CREATE TABLE IF NOT EXISTS patients (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      patientId TEXT UNIQUE NOT NULL,
      dateOfBirth DATE,
      medicalHistory TEXT,
      status TEXT DEFAULT 'active',
      FOREIGN KEY(user_id) REFERENCES users(id)
    )
  `, (err) => {
    if (err) console.error('Error creating patients table:', err);
    else console.log('Patients table ready');
  });
}

// Routes

// Get home page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Get login page
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// Register a new user
app.post('/api/register', (req, res) => {
  const { email, password, firstName, lastName, role } = req.body;

  if (!email || !password || !firstName || !lastName) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const hashedPassword = password; // In production, use bcrypt for hashing

  db.run(
    'INSERT INTO users (email, password, firstName, lastName, role) VALUES (?, ?, ?, ?, ?)',
    [email, hashedPassword, firstName, lastName, role || 'student'],
    function(err) {
      if (err) {
        if (err.message.includes('UNIQUE constraint failed')) {
          return res.status(400).json({ message: 'Email already exists' });
        }
        return res.status(500).json({ message: 'Registration failed' });
      }
      res.status(201).json({
        message: 'User registered successfully',
        userId: this.lastID
      });
    }
  );
});

// Login user
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password required' });
  }

  db.get(
    'SELECT * FROM users WHERE email = ? AND password = ?',
    [email, password],
    (err, user) => {
      if (err) {
        return res.status(500).json({ message: 'Login failed' });
      }
      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
      res.json({
        message: 'Login successful',
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role
        }
      });
    }
  );
});

// Get all users
app.get('/api/users', (req, res) => {
  db.all('SELECT id, email, firstName, lastName, role FROM users', (err, rows) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to fetch users' });
    }
    res.json(rows);
  });
});

// Get user by ID
app.get('/api/users/:id', (req, res) => {
  const { id } = req.params;

  db.get('SELECT * FROM users WHERE id = ?', [id], (err, user) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to fetch user' });
    }
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  });
});

// Create a student
app.post('/api/students', (req, res) => {
  const { user_id, studentId, major, enrollmentDate } = req.body;

  if (!user_id || !studentId) {
    return res.status(400).json({ message: 'user_id and studentId are required' });
  }

  db.run(
    'INSERT INTO students (user_id, studentId, major, enrollmentDate) VALUES (?, ?, ?, ?)',
    [user_id, studentId, major, enrollmentDate],
    function(err) {
      if (err) {
        return res.status(500).json({ message: 'Failed to create student' });
      }
      res.status(201).json({
        message: 'Student created successfully',
        studentId: this.lastID
      });
    }
  );
});

// Get all students
app.get('/api/students', (req, res) => {
  db.all(
    `SELECT s.*, u.firstName, u.lastName, u.email FROM students s 
     JOIN users u ON s.user_id = u.id`,
    (err, rows) => {
      if (err) {
        return res.status(500).json({ message: 'Failed to fetch students' });
      }
      res.json(rows);
    }
  );
});

// Create a patient
app.post('/api/patients', (req, res) => {
  const { user_id, patientId, dateOfBirth, medicalHistory } = req.body;

  if (!user_id || !patientId) {
    return res.status(400).json({ message: 'user_id and patientId are required' });
  }

  db.run(
    'INSERT INTO patients (user_id, patientId, dateOfBirth, medicalHistory) VALUES (?, ?, ?, ?)',
    [user_id, patientId, dateOfBirth, medicalHistory],
    function(err) {
      if (err) {
        return res.status(500).json({ message: 'Failed to create patient' });
      }
      res.status(201).json({
        message: 'Patient created successfully',
        patientId: this.lastID
      });
    }
  );
});

// Get all patients
app.get('/api/patients', (req, res) => {
  db.all(
    `SELECT p.*, u.firstName, u.lastName, u.email FROM patients p 
     JOIN users u ON p.user_id = u.id`,
    (err, rows) => {
      if (err) {
        return res.status(500).json({ message: 'Failed to fetch patients' });
      }
      res.json(rows);
    }
  );
});

// Update user
app.put('/api/users/:id', (req, res) => {
  const { id } = req.params;
  const { firstName, lastName } = req.body;

  db.run(
    'UPDATE users SET firstName = ?, lastName = ? WHERE id = ?',
    [firstName, lastName, id],
    (err) => {
      if (err) {
        return res.status(500).json({ message: 'Failed to update user' });
      }
      res.json({ message: 'User updated successfully' });
    }
  );
});

// Delete user
app.delete('/api/users/:id', (req, res) => {
  const { id } = req.params;

  db.run('DELETE FROM users WHERE id = ?', [id], (err) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to delete user' });
    }
    res.json({ message: 'User deleted successfully' });
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal server error' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('Shutting down gracefully...');
  db.close((err) => {
    if (err) console.error('Error closing database:', err);
    else console.log('Database connection closed');
    process.exit(0);
  });
});
