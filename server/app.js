const express = require('express');

const app = express();

app.use(express.json());

/* Enter code Below */

const messages = [];

app.get('/messages', (req, res) => {
    res.send(messages);
});

app.post('/messages', (req, res) => {
    const newMessage = req.body;
    messages.push(newMessage);
    res.send('successfully done')
});
    
/* Enter code Above */

module.exports = app;