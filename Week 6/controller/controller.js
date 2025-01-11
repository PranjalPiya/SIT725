let contactCollection = require('../model/contact');
let blogCollection = require('../model/blog');

const postBlog = async (req, res) => {
    console.log('Received request to post a blog');
    try {
        let blog = req.body;
        // Validate the blog fields
        const { title, description, first_name, last_name, image } = blog;
        if (!title || !description || !first_name || !last_name || !image) {
            console.error('Missing blog fields');
            return res.status(400).json({ statusCode: 400, message: 'Missing required blog fields' });
        }
        // Validate that 'title' is a string and not empty
        if (typeof title !== 'string' || title.trim() === '') {
            console.error('Invalid title data type. Expected a non-empty string.');
            return res.status(400).json({ statusCode: 400, message: 'Invalid title data type. Title should be a non-empty string.' });
        }


        console.log('Blog content:', blog);
        // Save blog to the database
        blogCollection.postBlog(blog, (err, result) => {
            if (!err) {
                console.log('Blog submitted successfully:', result);
                res.json({ statusCode: 201, data: result, message: 'Blog Submitted Successfully' });
            } else {
                console.error('Error during blog submission:', err);
                res.status(500).json({ statusCode: 500, message: "Internal Server Error" });
            }
        });
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ statusCode: 500, message: 'Server error' });
    }
}

// Function to fetch all blogs
const getAllBlogs = async (req, res) => {
    console.log('Received request to fetch all blogs');
    try {
        blogCollection.getAllBlog((err, result) => {
            if (!err) {
                console.log('Blogs fetched successfully:', result);
                res.json({ statusCode: 200, data: result, message: 'Fetching all blogs successful' });
            } else {
                console.error('Error fetching blogs:', err);
                res.status(500).json({ statusCode: 500, message: "Internal Server Error" });
            }
        });
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ statusCode: 500, message: 'Server error' });
    }
}


// Function to handle contact submission
const postContact = (req, res) => {
    let contact = req.body;

    try {
        // Validate required fields
        if (!contact.full_name || !contact.email || !contact.message) {
            return res.status(400).json({ statusCode: 400, message: 'Missing required contact fields' });
        }
        // Validate email format using a regular expression
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(contact.email)) {
            return res.status(400).json({ statusCode: 400, message: 'Invalid email format. Please enter a valid email address.' });
        }
        // Wrap the callback in a promise
        contactCollection.postContact(contact, (err, result) => {

            if (!err) {
                console.log('Contact submitted successfully:', result);
                res.json({ statusCode: 201, data: result, message: 'Contact Submitted Successfully' });
            } else {
                console.error('Error during contact submission:', err);
                res.status(500).json({ statusCode: 500, message: "Internal Server Error" });
            }

        });

    } catch (err) {
        console.error('Error occurred while posting contact:', err);
        res.status(500).json({ statusCode: 500, message: 'Internal Server Error' });
    }
};



module.exports = { postBlog, getAllBlogs, postContact }