let database = {
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

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const { action } = req.query;
  const { method, body } = req;

  // REGISTER
  if (action === 'register' && method === 'POST') {
    const { email, password, firstName, lastName, role } = body;
    
    if (!email || !password || !firstName || !lastName) {
      return res.status(400).json({ message: 'All fields required' });
    }

    if (database.users.find(u => u.email === email)) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const newUser = {
      id: Math.max(...database.users.map(u => u.id), 0) + 1,
      email,
      password,
      firstName,
      lastName,
      role: role || 'student'
    };
    database.users.push(newUser);
    return res.status(201).json({ message: 'User registered', userId: newUser.id });
  }

  // LOGIN
  if (action === 'login' && method === 'POST') {
    const { email, password } = body;
    const user = database.users.find(u => u.email === email && u.password === password);
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    return res.json({ message: 'Login successful', user: { id: user.id, email: user.email, firstName: user.firstName, lastName: user.lastName, role: user.role } });
  }

  // GET USERS
  if (action === 'users' && method === 'GET') {
    return res.json(database.users.map(u => ({ id: u.id, email: u.email, firstName: u.firstName, lastName: u.lastName, role: u.role })));
  }

  // ADD STUDENT
  if (action === 'add-student' && method === 'POST') {
    const { user_id, studentId, major, enrollmentDate } = body;
    if (!user_id || !studentId) return res.status(400).json({ message: 'Missing fields' });
    
    const student = { id: Math.max(...database.students.map(s => s.id), 0) + 1, user_id, studentId, major, enrollmentDate, status: 'active' };
    database.students.push(student);
    return res.status(201).json({ message: 'Student added', studentId: student.id });
  }

  // GET STUDENTS
  if (action === 'students' && method === 'GET') {
    const students = database.students.map(s => ({
      ...s,
      firstName: database.users.find(u => u.id === s.user_id)?.firstName || '',
      lastName: database.users.find(u => u.id === s.user_id)?.lastName || '',
      email: database.users.find(u => u.id === s.user_id)?.email || ''
    }));
    return res.json(students);
  }

  // ADD PATIENT
  if (action === 'add-patient' && method === 'POST') {
    const { user_id, patientId, dateOfBirth, medicalHistory } = body;
    if (!user_id || !patientId) return res.status(400).json({ message: 'Missing fields' });
    
    const patient = { id: Math.max(...database.patients.map(p => p.id), 0) + 1, user_id, patientId, dateOfBirth, medicalHistory, status: 'active' };
    database.patients.push(patient);
    return res.status(201).json({ message: 'Patient added', patientId: patient.id });
  }

  // GET PATIENTS
  if (action === 'patients' && method === 'GET') {
    const patients = database.patients.map(p => ({
      ...p,
      firstName: database.users.find(u => u.id === p.user_id)?.firstName || '',
      lastName: database.users.find(u => u.id === p.user_id)?.lastName || '',
      email: database.users.find(u => u.id === p.user_id)?.email || ''
    }));
    return res.json(patients);
  }

  return res.status(404).json({ message: 'Not found' });
}
