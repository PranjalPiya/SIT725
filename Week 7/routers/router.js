let express = require('express');
let { postBlog, getAllBlogs, postContact } = require('../controller/controller');
let router = express.Router();


router.get('/blogs', getAllBlogs); // Ensure this route exists
router.post('/blog', postBlog);
router.post('/contact', postContact);





module.exports = router;