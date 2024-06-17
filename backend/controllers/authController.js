const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: 'Aaditya@#987Kas',
  database: 'poll_system'
};

// Connect to the database
async function connectToDatabase() {
  try {
    const connection = await mysql.createConnection(dbConfig);
    console.log('Connected to database');
    return connection;
  } catch (error) {
    console.error('Database connection failed:', error);
    throw error;
  }
}

exports.register = async (req, res) => {
  const { name, email, phone, role, password } = req.body;

  if (!password) {
    return res.status(400).json({ message: 'Password is required' });
  }

  try {
    const connection = await connectToDatabase();

    // Check if user already exists
    const [results] = await connection.execute('SELECT * FROM users WHERE email = ?', [email]);

    if (results.length > 0) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user into database
    await connection.execute('INSERT INTO users (name, email, phone, role, password) VALUES (?, ?, ?, ?, ?)', [name, email, phone, role, hashedPassword]);

    res.status(201).json({ message: 'User registered successfully' });

    await connection.end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const connection = await connectToDatabase();

    // Check if user exists
    const [results] = await connection.execute('SELECT * FROM users WHERE email = ?', [email]);

    if (results.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Validate password
    const user = results[0];
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Create and assign a token
    const token = jwt.sign({ id: user.id }, 'secret', { expiresIn: '1h' });
    res.cookie('token', token, { httpOnly: true });

    res.status(200).json({ message: 'Login successful', token });

    await connection.end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.logout = (req, res) => {
  res.clearCookie('token');
  res.status(200).json({ message: 'Logged out successfully' });
};
