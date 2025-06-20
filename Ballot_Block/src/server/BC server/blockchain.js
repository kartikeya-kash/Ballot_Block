const fs = require('fs');
const path = require('path');
const Block = require('./block');

const CHAIN_FILE = path.join(__dirname, 'chain.json');

class Blockchain {
  constructor() {
    this.chain = this.loadChain(); 
  }

  createGenesisBlock() {
    return new Block(0, new Date().toISOString(), { msg: 'Genesis Block' }, '0');
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  addBlock(newBlock) {
    newBlock.previousHash = this.getLatestBlock().hash;
    newBlock.mineBlock('00'); 
    this.chain.push(newBlock);
    this.saveChain();
  }

  hasUserVoted(userHash) {
    return this.chain.some(block => {
      const data = block.data;
      return data.userIdHash === userHash;
    });
  }

  saveChain() {
    fs.writeFileSync(CHAIN_FILE, JSON.stringify(this.chain, null, 2), 'utf-8');
  }

  loadChain() {
    if (fs.existsSync(CHAIN_FILE)) {
      try {
        const raw = fs.readFileSync(CHAIN_FILE, 'utf-8');
        const parsed = JSON.parse(raw);
        return parsed.map(b => {
          const block = new Block(b.index, b.timestamp, b.data, b.previousHash);
          block.nonce = b.nonce;
          block.hash = b.hash;
          return block;
        });
      } catch (err) {
        console.error('Error reading chain.json:', err);
        return [this.createGenesisBlock()];
      }
    } else {
      return [this.createGenesisBlock()];
    }
  }
}

module.exports = Blockchain;