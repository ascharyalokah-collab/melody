const { MongoClient } = require('mongodb');

// Try with direct shard connection (no SRV)
const uri = "mongodb://ascharyalokah_db_user:Shazam%407777@cluster0-shard-00-00.ar8gfln.mongodb.net:27017,cluster0-shard-00-01.ar8gfln.mongodb.net:27017,cluster0-shard-00-02.ar8gfln.mongodb.net:27017/melody_made?ssl=true&replicaSet=atlas-ar8gfln-shard-0&authSource=admin&retryWrites=true&w=majority";

async function run() {
    const client = new MongoClient(uri);
    try {
        console.log("Attempting direct-shard connection...");
        await client.connect();
        console.log("Success!");
    } catch (e) {
        console.error("Failed:", e.message);
    } finally {
        await client.close();
    }
}

run();
