const express = require('express');
const app = express();
const port = process.argv[2]; //refers to the command that we run when we start server, 2 refers to the third element in array.


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

// The first thing that we're going to do to add a new node to our network is hit the register and broadcast
// node and points of one of the nodes inside of our network this endpoint will register the new nodes
// url with itself and then it will broadcast that new node to all the other nodes in the network.
// After the broadcast is complete the original network node that we hit will send a request to our new
// network node and it will hit the register nodes bulk.
// And the point in doing this will register all the other nodes in the network with our new node.

// register a node and broadcast to the network
app.post('/register-and-broadcast-node', function(req,res){
    const newNodeUrl = req.body.newNodeUrl;
    //.........
});

//register a node with network. if all other nodes would broadcast as well, a severe crash would occur due to infinite loop
app.post('/register-node', function(req,res){

});

//register multiple nodes at once 
app.post('/register-nodes-bulk', function(req,res){

});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
})