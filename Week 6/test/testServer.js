const { expect } = require("chai");
const request = require("request");
// const axios = require('axios');
const { MongoClient } = require('mongodb');
const { client, isConnected } = require('../dbconnect');





// For testing blog api
let url = 'http://localhost:3000/api/blog';
let blog = {
    title: "Testing blog api",
    description: 'When ancient astronomers named the planet Jupiter for the Roman ruler of the gods and heavens (also known as Jove), they had no idea of the planet\'s true dimensions, but the name is appropriate, for Jupiter is larger than all the other planets combined.',
    first_name: 'John',
    last_name: 'Smith',
    image: 'https://cdn.britannica.com/84/4284-050-16C7E8C2/Photograph-Jupiter-range-Voyager-1-cloud-bands-February-1-1979.jpg'
};


// For testing contact api
let contactUrl = 'http://localhost:3000/api/contact';
let contact = {
    full_name: 'John',
    email: 'john.doe@example.com',
    message: 'Testing the contact api to see if it working or not.'
}


//For GET request
describe('Test Case 1: Trigger GET request to fetch all the blogs', function () {
    this.timeout(10000);
    it('it fetch all the blogs data and returns statusCode of 200', function (done) {
        request(url + 's', function (error, response, body) {
            if (error) {
                console.error('Error:', error); // Log the error for debugging
                return done(error); // Ensure done is called with error
            }
            try {
                let responseObj = JSON.parse(body);
                expect(responseObj.statusCode).to.equal(200);
                expect(responseObj.data).to.be.an('array');
                done();
            } catch (error) {
                console.error('Parsing Error:', error); // Log any parsing errors
                done(error);
            }
        });
    });
});

//For POST request
describe('Test Case 2: Trigger POST request to save the blog', function () {
    it('it should save the submitted blog form in the db and show the status code of 201', function (done) {
        request.post({
            url: url,
            json: blog // Changed from form to json
        }, function (error, response, body) {
            try {
                expect(body.statusCode).to.equal(201);
                expect(body.data).to.have.property('acknowledged').to.be.true;
                expect(body.data).to.have.property('insertedId').that.is.a('string');
                expect(body.message).to.equal('Blog Submitted Successfully');
                done();
            } catch (error) {
                done(error);
            }
        });
    });
});


describe('Test Case 3: Validating the form for creating blogs', function () {
    it('it validates required fields', function (done) {
        request.post({
            url: url,
            json: {}
        }, function (error, response, body) {
            try {
                expect(response.statusCode).to.equal(400);
                expect(body.statusCode).to.equal(400);
                expect(body.message).to.equal('Missing required blog fields');
                done();
            } catch (error) {
                done(error);
            }
        });
    });
});

// Test malformed blog submission
describe('Test Case 4: Malformed Blog Submission', function () {
    it('it should return statusCode of 400 for malformed data', function (done) {
        let malformedBlog = {
            title: 1234,
            description: 'Test description',
            first_name: 'John',
            last_name: 'Smith',
            image: 'invalid_url'
        };
        request.post({
            url: url,
            json: malformedBlog
        }, function (error, response, body) {
            try {
                expect(response.statusCode).to.equal(400);
                expect(body.statusCode).to.equal(400);
                expect(body.message).to.equal('Invalid title data type. Title should be a non-empty string.');
                done();
            } catch (error) {
                done(error);
            }
        });
    });
});



// For POST request with contact.
describe('Test Case 5: Trigger POST request to save contact us form', function () {
    it('it should save the submitted contact form in the db and show the status code of 201', function (done) {
        request.post({
            url: contactUrl,
            json: contact // Changed from form to json
        }, function (error, response, body) {
            try {
                expect(body.statusCode).to.equal(201);
                expect(body.data).to.have.property('acknowledged').to.be.true;
                expect(body.data).to.have.property('insertedId').that.is.a('string');
                expect(body.message).to.equal('Contact Submitted Successfully');
                done();
            } catch (error) {
                done(error);
            }
        });
    });
});

// Test invalid email format for contact submission
describe('Test Case 6: Invalid Email Format', function () {
    it('it should return statusCode of 400 for invalid email format', function (done) {
        let invalidContact = {
            full_name: 'John',
            email: 'invalid-email',
            message: 'Testing invalid email'
        };
        request.post({
            url: contactUrl,
            json: invalidContact
        }, function (error, response, body) {
            try {
                expect(response.statusCode).to.equal(400);
                expect(body.statusCode).to.equal(400);
                expect(body.message).to.equal('Invalid email format. Please enter a valid email address.');
                done();
            } catch (error) {
                done(error);
            }
        });
    });
});


// Test database connection
describe('Test Case 7: Database Connection Tests', function () {

    before(async function () {
        await client.connect();
    });

    it('should connect to the database successfully', function () {
        expect(isConnected).to.be.true;
    });

    it('should have the correct database name', function () {
        const dbName = client.db().databaseName;
        expect(dbName).to.equal('test');
    });

    after(async function () {
        await client.close();
    });

});




