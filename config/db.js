const { MongoClient } = require("mongodb");
require("dotenv").config();

const client = new MongoClient(process.env.MONGO_URI);
let db;

async function connectDB() {
  try {
    await client.connect();
    db = client.db("JaiTravels");
    console.log("MongoDB connected successfully!");
  } catch (error) {
    console.error("MongoDB connection failed!", error);
  }
}

function getDB() {
  return db;
}

module.exports = { connectDB, getDB };
