//testing create block method

const Blockchain = require('./blockchain');
const bitcoin = new Blockchain();

const previousBlockHash = 'GFD6543333453354';
const currentBlockData = [
    {
        amount: 10,
        sender: 'HGF46554654G',
        recipient: 'GH45666FGDG'
    },
    {
        amount: 15,
        sender: '5HGF4544654G',
        recipient: 'GH45667FGDG'
    },
    {
        amount: 10,
        sender: 'H5UGF46556TG4G',
        recipient: 'GGFFG5667FGDG'
    },

];

const nonce = 100;
console.log(bitcoin.hashBlock(previousBlockHash, currentBlockData, nonce));
