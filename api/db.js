import { json } from '@vercel/web';

// Simple in-memory database for demo
let dbData = {
  users: [
    {
      id: 1,
      email: 'test@example.com',
      password: 'password123',
      firstName: 'Test',
      lastName: 'User',
      role: 'student'
    }
  ],
  students: [],
  patients: []
};

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { method, query } = req;
  const action = query.action;

  // REGISTER
  if (action === 'register' && method === 'POST') {
    const { email, password, firstName, lastName, role } = req.body;
    
    if (!email || !password || !firstName || !lastName) {
      return res.status(400).json({ message: 'All fields required' });
    }

    const exists = dbData.users.find(u => u.email === email);
    if (exists) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const newUser = {
      id: dbData.users.length + 1,
      email,
      password,
      firstName,
      lastName,
      role: role || 'student'
    };

    dbData.users.push(newUser);
    return res.status(201).json({ message: 'User registered successfully', userId: newUser.id });
  }

  // LOGIN
  if (action === 'login' && method === 'POST') {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password required' });
    }

    const user = dbData.users.find(u => u.email === email && u.password === password);
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    return res.json({
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

  // GET USERS
  if (action === 'users' && method === 'GET') {
    const users = dbData.users.map(u => ({
      id: u.id,
      email: u.email,
      firstName: u.firstName,
      lastName: u.lastName,
      role: u.role
    }));
    return res.json(users);
  }

  // CREATE STUDENT
  if (action === 'students' && method === 'POST') {
    const { user_id, studentId, major, enrollmentDate } = req.body;

    if (!user_id || !studentId) {
      return res.status(400).json({ message: 'user_id and studentId required' });
    }

    const newStudent = {
      id: dbData.students.length + 1,
      user_id,
      studentId,
      major,
      enrollmentDate,
      status: 'active'
    };

    dbData.students.push(newStudent);
    return res.status(201).json({ message: 'Student created', studentId: newStudent.id });
  }

  // GET STUDENTS
  if (action === 'students' && method === 'GET') {
    const students = dbData.students.map(s => {
      const user = dbData.users.find(u => u.id === s.user_id);
      return {
        ...s,
        firstName: user?.firstName || '',
        lastName: user?.lastName || '',
        email: user?.email || ''
      };
    });
    return res.json(students);
  }

  // CREATE PATIENT
  if (action === 'patients' && method === 'POST') {
    const { user_id, patientId, dateOfBirth, medicalHistory } = req.body;

    if (!user_id || !patientId) {
      return res.status(400).json({ message: 'user_id and patientId required' });
    }

    const newPatient = {
      id: dbData.patients.length + 1,
      user_id,
      patientId,
      dateOfBirth,
      medicalHistory,
      status: 'active'
    };

    dbData.patients.push(newPatient);
    return res.status(201).json({ message: 'Patient created', patientId: newPatient.id });
  }

  // GET PATIENTS
  if (action === 'patients' && method === 'GET') {
    const patients = dbData.patients.map(p => {
      const user = dbData.users.find(u => u.id === p.user_id);
      return {
        ...p,
        firstName: user?.firstName || '',
        lastName: user?.lastName || '',
        email: user?.email || ''
      };
    });
    return res.json(patients);
  }

  return res.status(404).json({ message: 'Not found' });
}
