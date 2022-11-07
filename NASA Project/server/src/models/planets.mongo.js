const mongoose = require('mongoose');

const planetSchema = new mongoose.Schema({
    keplerName: {
        typr: String,
        required: true,
    }
});

module.exports = mongoose.model('Planet', planetSchema);