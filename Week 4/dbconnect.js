const { ServerApiVersion, MongoClient } = require('mongodb');

// var MongoClient = require('mongodb').MongoClient;
const DB_URL = process.env.MONGO_URI;

const client = new MongoClient(DB_URL, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,

    }
})

client.connect()
module.exports = client

// MongoClient.connect(DB_URL, function (err, db) {
//     if (err) throw err;
//     var dbo = db.db("SIT725WEEK4");
//     dbo.createCollection("customers", function (err, res) {
//         if (err) throw err;
//         console.log("Collection created!");
//         db.close();
//     });
// });