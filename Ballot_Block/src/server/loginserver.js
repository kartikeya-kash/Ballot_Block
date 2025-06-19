import express from 'express';
import cors from 'cors';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = 5003;

app.use(cors());
app.use(express.json());

// MySQL Con Setup
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error('❌ MySQL connection failed:', err.message);
    process.exit(1);
  }
  console.log('✅ Connected to MySQL');
});

// Store new user
app.post('/api/store-user', (req, res) => {
  const { name, phone, voterID, hasVoted } = req.body;
  console.log("📥 Received from frontend:", name, phone, voterID, hasVoted);

  const query = 'INSERT INTO users (name, phone, voternumber, hasvoted) VALUES (?, ?, ?, ?)';
  db.query(query, [name, phone, voterID, hasVoted], (err, result) => {
    if (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(409).json({ success: false, message: 'Phone number already exists' });
      }

      console.error('❌ DB Insert Error:', err.message);
      return res.status(500).json({ success: false, message: 'Database error' });
    }

    res.json({ success: true, message: 'User stored successfully', phone });
  });
});

app.post('/api/get-user', (req, res) => {
  const { phone } = req.body;

  const query = 'SELECT name, phone, voternumber, hasVoted FROM users WHERE phone = ?';
  db.query(query, [phone], (err, results) => {
    if (err) {
      console.error('❌ DB Fetch Error:', err.message);
      return res.status(500).json({ success: false, message: 'Database error' });
    }

    if (results.length === 0) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.json({ success: true, user: results[0] });
  });
});


app.post('/api/mark-voted', (req, res) => {
  const { phone } = req.body;
  const query = 'UPDATE users SET hasVoted = TRUE WHERE phone = ?';

  db.query(query, [phone], (err, result) => {
    if (err) {
      console.error('❌ DB Update Error:', err.message);
      return res.status(500).json({ success: false, message: 'Database error' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.json({ success: true, message: 'Vote status updated to true' });
  });
});

//setup election with candidates endpoint
app.post('/setup-election', async (req, res) => {
  const { candidates } = req.body;

  try {
    await db.query('SET SQL_SAFE_UPDATES = 0');
    await db.query('DELETE FROM candidates');

    for (const { name, party } of candidates) {
      if (!name || !party) continue;
      await db.query('INSERT INTO candidates (name, party) VALUES (?, ?)', [name, party]);
    }

    res.status(201).json({ message: 'Candidates saved' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Database error' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});