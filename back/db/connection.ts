import * as mongodb from "mongodb";
const env = require("dotenv").config();

const client = new mongodb.MongoClient(env.MONGO_URI, {});

client
  .connect()
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => {
    console.log("Error connecting to MongoDB");
  });

module.exports = client;
