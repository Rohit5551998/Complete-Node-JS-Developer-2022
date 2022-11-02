const express = require('express');

const app = express();

const PORT = 3000;

const friends = [
    {
        id: 0,
        name: 'Albert Einstein',
    },
    {
        id: 1,
        name: 'Sir Issac Newton',
    }
];

app.get('/', (req, res) => {
    // res.send('Heeeeellloooooo!!!!!');
    res.json(friends)
});

app.get('/messages', (req, res) => {
    res.send('<ul><li>Hello Albert!</li></ul>');
});

app.post('/messages', (req, res) => {
    console.log('Updating Messages');
});

app.listen(PORT, () => {
    console.log(`Listening on ${PORT}...`)
});