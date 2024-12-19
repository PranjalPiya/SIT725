const { expect } = require("chai");
const request = require("request");

let url = 'http://localhost:3000/api/blog';
let blog = {
    title: 'Jupiter, the most massive planet',
    description: 'When ancient astronomers named the planet Jupiter for the Roman ruler of the gods and heavens (also known as Jove), they had no idea of the planet\'s true dimensions, but the name is appropriate, for Jupiter is larger than all the other planets combined.',
    first_name: 'John',
    last_name: 'Smith',
    image: 'https://cdn.britannica.com/84/4284-050-16C7E8C2/Photograph-Jupiter-range-Voyager-1-cloud-bands-February-1-1979.jpg'
};

//For GET request
describe('test GET api', function () {
    this.timeout(10000);
    it('returns statusCode of 200', function (done) {
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
describe('test POST api', function () {
    it('post blog to DB', function (done) {
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


describe('test validation api', function () {
    it('validates required fields', function (done) {
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