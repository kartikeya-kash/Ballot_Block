const express = require('express');
const crypto = require('crypto');
const Blockchain = require('./blockchain');
const Block = require('./block');

const cors = require('cors');


const app = express();
app.use(express.json());
app.use(cors());

const blockchain = new Blockchain();

function hashPhone(phone) {
  return crypto.createHash('sha256').update(phone).digest('hex');
}

app.post('/voted-data', (req, res) => {
  const { phone, votedFor } = req.body;

  if (!phone || !votedFor) {
    return res.status(400).json({ message: 'Missing phone or votedFor.' });
  }

  const userHash = hashPhone(phone);

  if (blockchain.hasUserVoted(userHash)) {
    return res.status(403).json({ message: '❌ You have already voted.' });
  }

  const voteData = {
    userIdHash: userHash,
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

app.get('/results', (req, res) => {
  const voteCounts = {};

  for (let i = 1; i < blockchain.chain.length; i++) {
    const block = blockchain.chain[i];
    const votedFor = block.data.votedFor;

    if (votedFor) {
      voteCounts[votedFor] = (voteCounts[votedFor] || 0) + 1;
    }
  }

  res.json(voteCounts);
});

const PORT = 3001;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));