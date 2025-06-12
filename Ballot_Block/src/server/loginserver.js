// all deployed completely
import express from 'express';
import cors from 'cors';
import mysql from 'mysql2';
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

app.post('/api/store-user', (req, res) => {
  const { name, phone } = req.body;
  console.log("📥 Received from frontend:", name, phone);

  const query = 'INSERT INTO users (name, phone) VALUES (?, ?)';
  db.query(query, [name, phone], (err, result) => {
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

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});