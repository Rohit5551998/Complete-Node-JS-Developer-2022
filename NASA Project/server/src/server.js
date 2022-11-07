const http = require('http');

const app = require('./app');
const { loadPlanets } = require('./models/planets.models');
const { mongoConnect } = require('./services/mongo');

const PORT =  process.env.PORT || 8000;

const server = http.createServer(app);

/* It is necessary to load all planets data before starting BE*/
// Await needs to be inside an async function work correctly
async function startServer() {
    await mongoConnect();
    await loadPlanets();

    server.listen(PORT, () => {
        console.log(`Listening on Port ${PORT}...`);
    }); 
}

startServer();


