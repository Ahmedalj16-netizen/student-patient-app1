// In-memory database
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
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const { email, password, firstName, lastName, role } = req.body;

  if (!email || !password || !firstName || !lastName) {
    return res.status(400).json({ message: 'All fields are required' });
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

  res.status(201).json({
    message: 'User registered successfully',
    userId: newUser.id
  });
}
