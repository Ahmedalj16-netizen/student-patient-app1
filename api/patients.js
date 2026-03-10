let dbData = {
  patients: [],
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

  if (req.method === 'GET') {
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
