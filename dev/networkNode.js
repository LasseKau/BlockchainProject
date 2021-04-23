const express = require('express');
const app = express();
const port = process.argv[2]; //refers to the command that we run when we start server, 2 refers to the third element in array.
const rp = require('request-promise');

const blockchain = require('./blockchain');
const bitcoin = new blockchain();

//creates unique random string. we are using it for this network nodes adress
//const uuid = require('uuid/v1');
const { v1: uuid } = require('uuid');
const { post } = require('request-promise');
const requestPromises = require('request-promise');
//import { v1 as uuidv1 } from 'uuid';
const nodeAdress = uuid().split('-').join(''); //removing dashes from string

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.get('/blockchain', (req, res) => {
    res.send(bitcoin);
});
//in out post transaction endpoint, we are creating a new transaction
//23.4 update: the only time we are hitting this transaction endpoint is during broadcast  in trnasaction and broadcast endpoint
app.post('/transaction', function (req, res) {
    const newTransaction = req.body;
    const blockIndex = bitcoin.addTransactionToPendingTransactions(newTransaction);
    res.json({note: `Transaction will be added in ${blockIndex}`});
});

//create a new and broadcast transaction to other nodes
app.post('/transaction/broadcast', function(req,res){
    const newTransaction = bitcoin.createNewTransaction(req.body.amount, req,body.sender,req.body.recipient);
    bitcoin.addTransactionToPendingTransactions(newTransaction);

    //creating an array of promises
    const requestPromises = [];
    bitcoin.networkNodes.forEach(networkNodeUrl => {
        const requestOptions = {
            url: networkNodeUrl = '/transaction',
            method: 'POST',
            body: newTransaction,
            json: true
        };
        //lets make request using request body library
        //after forloop has ran, we should have requests present inside request promises array
        requestPromises.push(rp(requestOptions));
    });
    //running all requests
    Promise.add(requestPromises)
    //sending responce that says broadcast was succesful
    .then(data => {
        res.json({ note: 'Transaction created and broadcast succesfully'});
    });
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

//when this whole process is complete all of these nodes will be a part of our decentralized block
//chain network and they will all be registered with each other.

// register a node and broadcast to the network
app.post('/register-and-broadcast-node', function(req,res){
    const newNodeUrl = req.body.newNodeUrl;
    if(bitcoin.networkNodes.indexOf(newNodeUrl) == -1) bitcoin.networkNodes.push.newNodeUrl; //if newnodeUrl is not present in array, then add to array

    const regNodesPromises = [];
    bitcoin.networkNodes.forEach(networkNodes =>{
        const requestOptions = {
            url: networkNodeUrl = '/register-node',
            method: 'POST',
            body: {newNodeUrl: newNodeUrl},
            json: true

        };
        regNodesPromises.push(rp(requestOptions));
    });
    Promise.all(regNodesPromises).then(data => {
        const bulkRegisterOptions = {
                uri: newNodeUrl + '/register-nodes-bulk',
                method: 'POST',
                body: { allNetworkNodes: [...bitcoin.networkNodes, bitcoin.currentNodeUrl] },
                json: true,

        };

        return rp(bulkRegisterOptions);
    })
    .then(data => {
        res.json({note: 'New node registration with network succesful'})
    });
});

//register a node with network. if all other nodes would broadcast as well, a severe crash would occur due to infinite loop
app.post('/register-node', function(req,res){
    const newNodeUrl = req.body.newNodeUrl;
    const nodeNotAlreadyPresent = bitcoin.networkNodes.indexOf(newNodeUrl) == -1;
    const notCurrentNode = bitcoin.currentNodeUrl != newNodeUrl;
    if(nodeNotAlreadyPresent && notCurrentNode) bitcoin.networkNodes.push(newNodeUrl);
    res.json({note:'New node node registered succesfyully'});
});

//register multiple nodes at once. accepts data from all urls already in the network
app.post('/register-nodes-bulk', function(req,res){
    const allNetworkNodes = req.body.allNetworkNodes;
    allNetworkNodes.forEach(networkNodeUrl => {
        const nodeNotAlreadyPresent = bitcoin.networkNodes.indexOf(networkNodeUrl) == -1;
        const notCurrentNode = bitcoin.currentNodeUrl !== networkNodeUrl;
        if(nodeNotAlreadyPresent && notCurrentNode)bitcoin.networkNodes.push(networkNodeUrl);
    });

    res.json({note: 'Bulk registration complete...'});
});



app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
})