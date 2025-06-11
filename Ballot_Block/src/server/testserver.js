// testserver.js
import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.send('✅ Minimal server is working'));
app.post('/api/test', (req, res) => res.json({ success: true }));

app.listen(3001, () => console.log('Server ✅ listening on http://localhost:3001'));