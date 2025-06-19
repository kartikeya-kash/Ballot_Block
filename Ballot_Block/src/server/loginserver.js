import express from 'express';
import cors from 'cors';
import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = 5003;

app.use(cors());
app.use(express.json());

// MySQL Connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

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

// Get user
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

// Mark as voted
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

// Setup election candidates
app.post('/setup-election', (req, res) => {
  const { candidates } = req.body;

  db.query('SET SQL_SAFE_UPDATES = 0', (err1) => {
    if (err1) {
      console.error('❌ Safe Update Disable Error:', err1.message);
      return res.status(500).json({ message: 'Database error' });
    }

    db.query('DELETE FROM candidates', (err2) => {
      if (err2) {
        console.error('❌ Delete Error:', err2.message);
        return res.status(500).json({ message: 'Database error' });
      }

      const insertNext = (index = 0) => {
        if (index >= candidates.length) {
          return res.status(201).json({ message: 'Candidates saved' });
        }

        const { name, party } = candidates[index];
        if (!name || !party) {
          return insertNext(index + 1);
        }

        db.query(
          'INSERT INTO candidates (name, party) VALUES (?, ?)',
          [name, party],
          (err3) => {
            if (err3) {
              console.error(`❌ Insert Error at index ${index}:`, err3.message);
              return res.status(500).json({ message: 'Database error' });
            }
            insertNext(index + 1);
          }
        );
      };

      insertNext();
    });
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});