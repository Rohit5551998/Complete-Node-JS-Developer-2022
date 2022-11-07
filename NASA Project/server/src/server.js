const http = require('http');
const mongoose = require('mongoose');

const app = require('./app');
const { loadPlanets } = require('./models/planets.models');

const PORT =  process.env.PORT || 8000;

const MONGO_URL = "mongodb+srv://nasa-api:rLA896uzHog80LOw@nasacluster.1rlhq9s.mongodb.net/nasa?retryWrites=true&w=majority";

const server = http.createServer(app);

mongoose.connection.once('open', () => {
    console.log('MongoDB connection ready');
})

mongoose.connection.on('error', (err) => {
    console.error(err);
})

/* It is necessary to load all planets data before starting BE*/
// Await needs to be inside an async function work correctly
async function startServer() {
    await mongoose.connect(MONGO_URL);
    await loadPlanets();

    server.listen(PORT, () => {
        console.log(`Listening on Port ${PORT}...`);
    }); 
}

startServer();


