const express = require('express');
const crypto = require('crypto');
const Blockchain = require('./blockchain');
const Block = require('./block');

const app = express();
app.use(express.json());

const blockchain = new Blockchain();

function hashPhone(phone) {
  return crypto.createHash('sha256').update(phone).digest('hex');
}

app.post('/voted-data', (req, res) => {
  const { phone, voterId, votedFor } = req.body;

  if (!phone || !voterId || !votedFor) {
    return res.status(400).json({ message: 'Missing phone, voterId, or votedFor.' });
  }

  const userHash = hashPhone(phone);

  if (blockchain.hasUserVoted(userHash, voterId)) {
    return res.status(403).json({ message: '❌ You have already voted.' });
  }

  const voteData = {
    userIdHash: userHash,
    voterId,
    votedFor
  };

  const newBlock = new Block(
    blockchain.chain.length,
    new Date().toISOString(),
    voteData
  );

  blockchain.addBlock(newBlock);

  res.status(201).json({ message: '✅ Vote recorded successfully.', block: newBlock });
});

app.get('/chain', (req, res) => {
  res.json(blockchain.chain);
});

const PORT = 3001;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));