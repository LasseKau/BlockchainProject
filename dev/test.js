//testing create block method

const Blockchain = require('./blockchain');

const bitcoin = new Blockchain();

bitcoin.createNewBlock(6542, 'FDSFSDFSDF434', '34FDRSEDFSDFSD');

bitcoin.createNewTransaction(100, 'ALEX543JHLFDSFD', 'JEN435FDFDSFG');

bitcoin.createNewBlock(7421, '54DSDFSDF4', '84FD654EDFSDFD');

bitcoin.createNewTransaction(100, 'ALEX543JHLFDSFD', 'JEN435FDFDSFG');
bitcoin.createNewTransaction(100, 'ALEX543JHLFDSFD', 'JEN435FDFDSFG');
bitcoin.createNewTransaction(100, 'ALEX543JHLFDSFD', 'JEN435FDFDSFG');


console.log(bitcoin.chain[1]);