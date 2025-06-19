const Block = require('./block');

class Blockchain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
  }

  createGenesisBlock() {
    return new Block(0, new Date().toISOString(), { msg: 'Genesis Block' }, '0');
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  addBlock(newBlock) {
    newBlock.previousHash = this.getLatestBlock().hash;
    newBlock.mineBlock('00'); // two leading zero for difficulty
    this.chain.push(newBlock);
  }

  hasUserVoted(userHash) {
  return this.chain.some(block => {
    const data = block.data;
    return data.userIdHash === userHash;
  });
}
}

module.exports = Blockchain;