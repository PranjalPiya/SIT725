const express = require('express');
const { connectToDB } = require("../../dbconnect"); // Import the connection function

const router = express.Router();

// POST route to add a new blog post
router.post('/blogs', async (req, res) => {
    const { first_name, last_name, title, image, description } = req.body;

    if (!first_name || !last_name || !title || !description) {
        return res.status(400).json({ error: 'Please provide all required fields' });
    }

    try {
        const client = await connectToDB();  // Get the connected client
        const db = client.db('blogDB');  // Access the 'blogDB'
        const blogsCollection = db.collection('blogs');

        const newBlog = {
            first_name,
            last_name,
            title,
            image,
            description,
            createdAt: new Date(),
        };

        const result = await blogsCollection.insertOne(newBlog);
        res.status(201).json({ message: 'Blog added successfully', blogId: result.insertedId });

        // Optionally close the client after the response
        client.close();
    } catch (error) {
        console.error('Error adding blog:', error);  // Log the error
        res.status(500).json({ error: 'Error adding blog' });
    }
});

// GET route to retrieve all blog posts
router.get('/blogs', async (req, res) => {
    try {
        const client = await connectToDB();
        const db = client.db('blogDB');
        const blogsCollection = db.collection('blogs');

        const blogs = await blogsCollection.find({}).toArray();
        res.status(200).json(blogs);

        // Optionally close the client after the response
        client.close();
    } catch (error) {
        console.error('Error retrieving blogs:', error);
        res.status(500).json({ error: 'Error retrieving blogs' });
    }
});

module.exports = router;


