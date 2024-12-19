
let dotenv = require('dotenv');
let express = require('express');
let router = require('./routers/router');
let app = express();
dotenv.config();
require("./dbconnect");


// Middleware to parse incoming JSON data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// Serve static files from the "public" directory
app.use(express.static(__dirname + '/view'));
app.use('/api', router);


// Set up the server
let port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
