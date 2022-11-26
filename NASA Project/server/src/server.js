const http = require('http');

require('dotenv').config();

const app = require('./app');
const { loadPlanetsData } = require('./models/planets.models');
const { loadLaunchData } = require('./models/launches.models');
const { mongoConnect } = require('./services/mongo');

const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

/* It is necessary to load all planets data before starting BE*/
// Await needs to be inside an async function work correctly
async function startServer() {
    await mongoConnect();
    await loadPlanetsData();
    await loadLaunchData();

    server.listen(PORT, () => {
        console.log(`Listening on Port ${PORT}...`);
    });
}

startServer();

// Comment in main package.json
// "_comment": [
//     "server",
//     "cd server && npm run watch",
//     "client",
//     "cd client && npm start"
//   ],


