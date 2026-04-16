const { MongoClient } = require('mongodb');

// Try with new URI (Password: Shazam)
const uri = "mongodb+srv://ascharyalokah_db_user:Shazam@cluster0.ar8gfln.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

async function run() {
    const client = new MongoClient(uri);
    try {
        console.log("Attempting connection with new URI...");
        await client.connect();
        console.log("Success!");
    } catch (e) {
        console.error("Failed:", e.message);
    } finally {
        await client.close();
    }
}

run();
