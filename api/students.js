let dbData = {
  students: [],
  users: [
    {
      id: 1,
      email: 'test@example.com',
      password: 'password123',
      firstName: 'Test',
      lastName: 'User',
      role: 'student'
    }
  ]
};

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'POST') {
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

  if (req.method === 'GET') {
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

  return res.status(404).json({ message: 'Not found' });
}
