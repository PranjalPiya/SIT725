let client = require('../dbconnect');


let contactCollection = client.db('blogDB').collection('contact');



async function postContact(contact, callback) {
    try {
        const result = await contactCollection.insertOne(contact);
        callback(null, result);
    } catch (err) {
        callback(err);
    }
}

async function getAllContact(callback) {
    try {
        const result = await contactCollection.find({}).toArray();
        callback(null, result);
    } catch (err) {
        callback(err);
    }
}


module.exports = { postContact, getAllContact }