const express = require('express');
const crypto = require('crypto');
const Blockchain = require('./blockchain');
const Block = require('./block');

const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const blockchain = new Blockchain();

// 🔁 Load blockchain from chain.json if it exists
const chainFile = path.join(__dirname, 'chain.json');

if (fs.existsSync(chainFile)) {
  try {
    const savedChain = JSON.parse(fs.readFileSync(chainFile, 'utf-8'));
    blockchain.chain = savedChain;
    console.log('🔁 Loaded blockchain from chain.json');
  } catch (err) {
    console.error('❌ Failed to load chain.json:', err);
  }
} else {
  console.log('📦 No existing chain.json found, starting fresh');
}

// 🔒 Hash the voter's phone number
function hashPhone(phone) {
  return crypto.createHash('sha256').update(phone).digest('hex');
}

// ✅ Vote Endpoint
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

  // 💾 Save blockchain to file
  try {
    fs.writeFileSync(chainFile, JSON.stringify(blockchain.chain, null, 2));
    console.log(`✅ Block #${newBlock.index} added and saved.`);
  } catch (err) {
    console.error('❌ Error writing to chain.json:', err);
  }

  res.status(201).json({ message: '✅ Vote recorded successfully.', block: newBlock });
});

// 🌐 Get the entire blockchain
app.get('/chain', (req, res) => {
  res.json(blockchain.chain);
});

// 📊 Get vote results
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

// 🟢 Start server
const PORT = 3001;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));