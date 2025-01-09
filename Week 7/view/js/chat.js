// Connect to the server
const socket = io();

// Elements
const form = document.getElementById('message-form');
const input = document.getElementById('message-input');
const messages = document.getElementById('messages-container');

// Send a message to the server
form.addEventListener('submit', (event) => {
    event.preventDefault();

    const message = input.value.trim(); // Trim whitespace to avoid empty messages

    if (message) {
        // Send the message to the server
        socket.emit('chat message', message);

        // Display the message on the client side (right-aligned)
        const clientMessage = document.createElement('div');
        clientMessage.classList.add('message', 'client-message'); // Add 'client-message' class
        clientMessage.textContent = message;

        messages.appendChild(clientMessage); // Append to the messages container
        messages.scrollTop = messages.scrollHeight; // Auto-scroll to the bottom

        input.value = ''; // Clear the input field
        input.focus(); // Refocus on the input field
    }
});

// Receive messages from the server and display them (left-aligned)
socket.on('chat message', (msg) => {
    // Only append server messages if they're not from the current client
    if (msg !== input.value.trim()) {
        const serverMessage = document.createElement('div');
        serverMessage.classList.add('message', 'server-message'); // Add 'server-message' class
        serverMessage.textContent = msg;

        messages.appendChild(serverMessage); // Append to the messages container
        messages.scrollTop = messages.scrollHeight; // Auto-scroll to the bottom
    }
});
