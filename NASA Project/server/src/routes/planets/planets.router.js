const express = require('express');

// Without destructuring
// const planetsController = require('./planets.controllers');
const { httpGetAllPlanets } = require('./planets.controllers');

const planetsRouter = express.Router();

// planetsRouter.get('/', planetsController.getAllPlanets);
planetsRouter.get('/', httpGetAllPlanets);

module.exports = planetsRouter;