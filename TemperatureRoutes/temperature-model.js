const mongoose = require('mongoose');

const TemperatureTable = mongoose.model('temperature', require('./temperature-schema'));

module.exports = TemperatureTable; 

