const express = require('express');
const app = express();
const port = 3002;

const blockchain = require('./blockchain');
const bitcoin = new blockchain();

//creates unique random string. we are using it for this network nodes adress
//const uuid = require('uuid/v1');
const { v1: uuid } = require('uuid');
//import { v1 as uuidv1 } from 'uuid';
const nodeAdress = uuid().split('-').join(''); //removing dashes from string

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.get('/blockchain', (req, res) => {
    res.send(bitcoin);
});
//in out post transaction end ´point, we are creating a new transaction
app.post('/transaction', function (req, res) {
    const blockIndex = bitcoin.createNewTransaction(req.body.amount, req.body.sender, req.body.recipient);
    res.json({note: `Transaction will be added in block ${blockIndex}`});
});

//mining a new block using proof of work
app.get('/mine', function (req, res) {
    const lastBlock = bitcoin.getLastBlock();
    const previousBlockHash = lastBlock ['hash'];
    const currentBlockData = {
        transactions: bitcoin.pendingTransactions,
        index: lastBlock['index'] + 1
    };
    const nonce = bitcoin.proofOfWork(previousBlockHash, currentBlockData);
    const blockHash = bitcoin.hashBlock(previousBlockHash,currentBlockData, nonce);
    const newBlock = bitcoin.createNewBlock(nonce, previousBlockHash, blockHash);

     //every time someone mines a new block, they get rewarded bitcoin. the reward is sent to the current node were on  
    bitcoin.createNewTransaction(12.5, "00",nodeAdress);

    res.json({
        note: "New block mined...",
        block: newBlock
    });
       
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
})