import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 5003;

app.use(cors());
app.use(express.json());

app.post('/api/store-user', (req, res) => {
  const { name, phone } = req.body;
  console.log("📥 Received from frontend:", name, phone);
  res.json({ success: true, message: "User stored successfully" });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});