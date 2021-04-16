//testing create block method

const Blockchain = require('./blockchain');

const bitcoin = new Blockchain();
bitcoin.createNewBlock(4234, '54FGD534TTTRE', 'V435THYGRGFDGD');
bitcoin.createNewBlock(4264, '54FGD534TTHBE', 'V435THYG56FDGD');
bitcoin.createNewBlock(4204, '54FGD534H7TRE', 'V435THYUJYTGGD');
console.log(bitcoin);