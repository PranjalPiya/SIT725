require('dotenv').config(); // Load .env variables

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.MONGO_URL
console.log('MONGO_URL:', process.env.MONGO_URL); // Add this line

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true
    }
})

// Wrap the connection in an async function for better error handling
async function connectDB() {
    try {
        await client.connect();
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1); // Exit the process if connection fails
    }
}

connectDB(); // Run the async connection

module.exports = client;