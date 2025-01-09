let dotenv = require('dotenv');
let express = require('express');
let router = require('./routers/router');
const { Server } = require('socket.io');
const http = require('http');
const readline = require('readline'); // To capture input from the terminal

let app = express();
dotenv.config();
require("./dbconnect");

// Middleware to parse incoming JSON data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Serve static files from the "view" directory (chat.html, chat.js, etc.)
app.use(express.static(__dirname + '/view'));
app.use('/api', router);

// Create HTTP server
const server = http.createServer(app);

// Attach Socket.io to the HTTP server
const io = new Server(server);


// Setup readline to take input from the terminal
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Ask the user for input in the terminal
rl.setPrompt('Send a message: ');
rl.prompt();

rl.on('line', (line) => {
    // Broadcast the entered message to all connected clients
    io.emit('chat message', `Server: ${line}`);
    rl.prompt(); // Ask for the next message
});



// Handle client connections via Socket.IO
io.on('connection', (socket) => {
    console.log('A user connected');

    // Listen for chat messages from the client
    socket.on('chat message', (msg) => {
        console.log(`Message from client: ${msg}`);

        // Broadcast the message to all clients except the sender
        socket.broadcast.emit('chat message', msg);
    });

    // When the client disconnects
    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

// Set up the server to listen on the desired port
let port = process.env.PORT || 3000;
server.listen(port, () => console.log(`Server listening on port ${port}...`));
