const MongoClient = require("mongodb").MongoClient;
const mongoURI =
  "mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.6.2";

const client = new MongoClient(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

client.connect().catch((err) => {
  if (err) {
    console.log("Error connecting to MongoDB");
  } else {
    console.log("Connected to MongoDB");
  }
});

module.exports = client;
