const express = require('express');
const { connectToDB } = require("../../dbconnect"); // Import the connection function

const router = express.Router();

// POST route to add a new blog post
router.post('/addContact', async (req, res) => {
    const { full_name, email, message } = req.body;

    if (!full_name || !email || !message) {
        return res.status(400).json({ error: 'Please provide all required fields' });
    }

    try {
        const client = await connectToDB();  // Get the connected client
        const db = client.db('blogDB');  // Access the 'blogDB'
        const contactCollection = db.collection('contact');

        const newContact = {
            full_name, email, message,
            createdAt: new Date(),
        };

        const result = await contactCollection.insertOne(newContact);
        res.status(201).json({ message: 'Contact form submitted successfully', contactId: result.insertedId });

        // Optionally close the client after the response
        client.close();
    } catch (error) {
        console.error('Error submitting contact form:', error);  // Log the error
        res.status(500).json({ error: 'Error submitting contact form' });
    }
});

// GET route to retrieve all blog posts
router.get('/getContact', async (req, res) => {
    try {
        const client = await connectToDB();
        const db = client.db('blogDB');
        const contactCollection = db.collection('contact');

        const contact = await contactCollection.find({}).toArray();
        res.status(200).json(contact);

        // Optionally close the client after the response
        client.close();
    } catch (error) {
        console.error('Error retrieving contact:', error);
        res.status(500).json({ error: 'Error retrieving contact' });
    }
});

module.exports = router;


