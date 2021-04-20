const express = require('express');
const app = express();
const port = 3002;
const blockchain = require('./blockchain');
const bitcoin = new blockchain();
//const bodyParser = require('body-parser');

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

app.get('/mine', function (req, res) {

});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
})