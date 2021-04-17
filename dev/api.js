const express = require('express')
const app = express()
const port = 3002

app.get('/blockchain', (req, res) => {

});

app.post('/transaction', function (req, res) {

});

app.get('/mine', function (req, res) {

});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})