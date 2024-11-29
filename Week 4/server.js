
// var express = require("express")
// require("./dbConnect");
// var app = express()
// app.use(express.static(__dirname + '/public'))
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// var port = process.env.port || 3000;
// // const addTwoNumber = (n1, n2) => {
// //     return n1 + n2;
// // }

// // //GET method of HTTP
// // app.get("/addTwoNumber", (req, res) => {
// //     const n1 = parseInt(req.query.n1);
// //     const n2 = parseInt(req.query.n2);
// //     const result = addTwoNumber(n1, n2);
// //     res.json({ statuscocde: 200, data: result });
// // });

// app.listen(port, () => {
//     console.log(`App listening to port ${port}`)
// })


require('dotenv').config(); // Load environment variables
const { MongoClient } = require('mongodb');

const uri = process.env.MONGO_URI;

async function connectToDB() {
    try {
        const client = new MongoClient(uri);
        await client.connect();
        console.log('Connected to MongoDB!');
        await client.close();
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}

connectToDB();