//data structure
class Blockchain {
    constructor() {
        this.chain = [];
        this.newTransactions = [];
    }
}

// method for creating new blocks. we create a newblock, inside we have transacations that have been created since last block was mined. 
// After we create a new block, we clear new transcations, push new block to the chain and return new block
Blockchain.prototype.createNewBlock = function (nonce, previousBlockHash, hash) {

    const newBlock = {                        // new block in the blockchain, all of the data will be stored in this block
        index: this.chain.length + 1,         // index: block number in the chain
        timestamp: Date.now(),                // timestamp: for knowing when the block was created
        transactions: this.newTransactions,   // when we create a new block, we want to put new or pending transactions onto this block, so they are inside the blockchain and can never be changed.
        nonce: nonce,                         // nonce comes from proof of work, in our case any number. but this nonce is proof that we created this new block in a legit way.
        hash: hash,                           // this hash will be data from our new block. we are going pass our new transactions. all of our transactions will be compressed into a single string of code. 
        previousBlockHash: previousBlockHash, // similar to hash, exept hash is data from our current block passed into a string. Hash of the previous block
    };
    this.newTransactions = [];
    this.chain.push(newBlock);                //takes the newblock we created and pushes it into the chain.

    return newBlock;
}

Blockchain.prototype.getLastBlock = function () {
    return this.chain[this.chain.length - 1];
}

module.exports = Blockchain;