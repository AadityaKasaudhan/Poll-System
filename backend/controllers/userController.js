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
  const connection = await mysql.createConnection(dbConfig);
  return connection;
}

// CRUD operations for user management
exports.getUsers = async (req, res) => {
  try {
    const connection = await connectToDatabase();
    const [results] = await connection.execute('SELECT * FROM users');
    res.status(200).json(results);
    await connection.end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.updateUser = async (req, res) => {
  const { id, name, email, phone, role } = req.body;
  try {
    const connection = await connectToDatabase();
    await connection.execute('UPDATE users SET name = ?, email = ?, phone = ?, role = ? WHERE id = ?', [name, email, phone, role, id]);
    res.status(200).json({ message: 'User updated successfully' });
    await connection.end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.deleteUser = async (req, res) => {
  const { id } = req.body;
  try {
    const connection = await connectToDatabase();
    await connection.execute('DELETE FROM users WHERE id = ?', [id]);
    res.status(200).json({ message: 'User deleted successfully' });
    await connection.end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
