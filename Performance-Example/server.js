const express = require('express');
const cluster = require('cluster');

const app = express();

function delay(duration) {
    const startTime = Date.now();
    while (Date.now() - startTime < duration) {
        //Event Loop is blocked
    }
}

app.get('/', (req, res) => {
    // JSON.stringify ({}) => "{}"
    // JSON.parse ("{}") => {}
    res.send(`Performace Example ${process.pid}`);
});

app.get('/timer', (req, res) => {
    delay(9000);
    res.send(`Ding Ding Ding ${process.pid}`);
});

if (cluster.isMaster) {
    console.log('Master has been started ...');
    cluster.fork();
    cluster.fork();
} else {
    console.log('Worker process started ...');
    app.listen(3000);
}
