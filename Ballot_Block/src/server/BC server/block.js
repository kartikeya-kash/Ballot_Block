const crypto = require('crypto');

class Block {
  constructor(index, timestamp, data, previousHash = '') {
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.previousHash = previousHash;
    this.nonce = 0;
    this.hash = this.calculateHash();
  }

  calculateHash() {
    return crypto.createHash('sha256')
      .update(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce)
      .digest('hex');
  }

  mineBlock(difficultyPrefix = '00') {
    while (!this.hash.startsWith(difficultyPrefix)) {
      this.nonce++;
      this.hash = this.calculateHash();
    }
    console.log(`✅ Block mined: ${this.hash}`);
  }
}

module.exports = Block;