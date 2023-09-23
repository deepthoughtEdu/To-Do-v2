const {MongoClient} = require("mongodb");
require("dotenv").config();


const client = new MongoClient(process.env.MONGO_URI);

async function initializeConnection () {

    await client.connect();
    console.log("Connection established with the database");
}

module.exports = {client, initializeConnection}