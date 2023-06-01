const express = require("express");
const bodyParser = require("body-parser");
const BlockChain = require("./blockchain");
const PubSub = require('./publishSubscribe');

const app = express();

const blockchain = new BlockChain();
const pubSubObj = new PubSub({blockchain});
setTimeout(()=> pubSubObj.broadcastChain(), 1000);

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