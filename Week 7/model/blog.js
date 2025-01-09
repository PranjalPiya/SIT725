let client = require('../dbconnect');

let blogCollection = client.db('blogDB').collection('blogs');


async function postBlog(blog, callback) {
    try {
        const result = await blogCollection.insertOne(blog);
        callback(null, result);
    } catch (err) {
        callback(err);
    }
}

async function getAllBlog(callback) {
    try {
        const result = await blogCollection.find({}).toArray();
        callback(null, result);
    } catch (err) {
        callback(err);
    }
}


module.exports = { postBlog, getAllBlog }