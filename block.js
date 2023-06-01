const hexToBinary = require("hex-to-binary");
const {GENESIS_DATA, MINE_RATE} = require('./config');
const cryptoHash = require('./crypto-hash');

class Block{
    constructor({timestamp, prevHash, hash, data, nonce, difficulty}){
        this.timestamp = timestamp;
        this.prevHash = prevHash;
        this.hash = hash;
        this.data = data;
        this.nonce = nonce;
        this.difficulty = difficulty;
    }

    static genesis(){
        return new this(GENESIS_DATA);
    }

    static mineBlock({prevBlock, data}){
        // const timestamp = Date.now();
        let hash, timestamp;
        let nonce = 0;
        const prevHash = prevBlock.hash;
        let {difficulty} = prevBlock;
        do{
            nonce++;
            timestamp = Date.now();
            difficulty = Block.adjustDifficulty({
                originalBlock : prevBlock, 
                timestamp,
            });
            hash = cryptoHash(timestamp, prevHash, data, nonce, difficulty);
        }while(hexToBinary(hash).substring(0,difficulty) !== '0'.repeat(difficulty));
        return new this({
            timestamp,
            prevHash,
            data,
            nonce,
            difficulty,
            hash,
        });
    }

    static adjustDifficulty({originalBlock, timestamp}){
        const {difficulty} = originalBlock;
        if(difficulty < 1){
            return 1;
        }
        const diffrence = timestamp - originalBlock.timestamp;
        if(diffrence > MINE_RATE){
            return difficulty-1;
        }
        return difficulty+1;
    }
}

const block1 = new Block({
    timestamp: '25/05/23', 
    prevHash: '0xacd',
    hash: '0xc12', 
    data: 'Hello'
});


module.exports = Block;

// const genesisBlock = Block.genesis();

// const result = Block.mineBlock({prevBlock : block1, data : "block2"});
// console.log(result);