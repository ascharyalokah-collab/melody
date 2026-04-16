const { MongoClient } = require('mongodb');

// Try with encoded @
const uri = "mongodb+srv://ascharyalokah_db_user:Shazam%407777@cluster0.ar8gfln.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

async function run() {
    const client = new MongoClient(uri);
    try {
        console.log("Attempting connection...");
        await client.connect();
        console.log("Success!");
    } catch (e) {
        console.error("Failed:", e.message);
    } finally {
        await client.close();
    }
}

run();
