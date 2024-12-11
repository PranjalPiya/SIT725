
const dotenv = require('dotenv');
const express = require('express');
const path = require('path'); // Import the path module
const blogRoutes = require('./public/routes/blogRoutes'); // Import your blog routes
const contactRoutes = require('./public/routes/contactRoutes');
dotenv.config();

require("./dbconnect");

const app = express();

// Middleware to parse incoming JSON data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Route to serve the index.html file
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Use blog routes
app.use('/api', blogRoutes);
app.use('/contact', contactRoutes);


// Set up the server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
