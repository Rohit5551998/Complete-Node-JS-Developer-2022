const express = require('express');

// Without destructuring
// const planetsController = require('./planets.controllers');
const { getAllPlanets } = require('./planets.controllers');

const planetsRouter = express.Router();

// planetsRouter.get('/planets', planetsController.getAllPlanets);
planetsRouter.get('/planets', getAllPlanets);

module.exports = planetsRouter;