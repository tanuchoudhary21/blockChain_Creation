const express = require("express");
const BlockChain = require("./blockchain");

const app = express();
const bodyParser = require("body-parser");
const blockchain = new BlockChain();

app.use(bodyParser.json());

app.get('/api/blocks', (req, res)=>{
    res.json(blockchain.chain)
})

app.post("/api/mine", (req, res)=>{
    const {data} = req.body;
    blockchain.addBlock({data});
    res.redirect('/api/blocks');
});

const PORT = 3000;
app.listen(PORT, ()=>{
    console.log(`listening to PORT : ${PORT}`);
})