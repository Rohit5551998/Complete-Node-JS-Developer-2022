const mongoose = require('mongoose');

const planetsSchema = new mongoose.Schema({
    keplerName: {
        typr: String,
        required: true,
    }
});