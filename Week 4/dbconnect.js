require('dotenv').config(); // Load environment variables
const { MongoClient } = require('mongodb');

const uri = process.env.MONGO_URI;

async function connectToDB() {
    try {
        const client = new MongoClient(uri);
        await client.connect();
        const db = client.db('blogDB');

        // Create 'blogs' collection explicitly (optional)
        await db.createCollection('blogs');  // This step ensures the collection is created if it doesn't exist
        await db.createCollection('contact');
        console.log('Connected to MongoDB!');
        return client;  // Return the client to use it elsewhere
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        throw error;  // Propagate the error for handling in the routes
    }
}

module.exports = { connectToDB };
