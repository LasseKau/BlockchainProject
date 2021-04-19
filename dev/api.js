const express = require('express');
const app = express();
const port = 3002;
//const bodyParser = require('body-parser');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.get('/blockchain', (req, res) => {

});

app.post('/transaction', function (req, res) {
    console.log(req.body);
    res.send(`the amount of the transaction is ${req.body.amount} bitcoin.`);
});

app.get('/mine', function (req, res) {

});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
})