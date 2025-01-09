let client = require('../dbconnect');


let contactCollection = client.db('blogDB').collection('contact');

function postContact(contact, callback) {
    contactCollection.insertOne(contact, callback);
}

function getAllContact(callback) {
    contactCollection.find({}).toArray(callback);
}

module.exports = { postContact, getAllContact }