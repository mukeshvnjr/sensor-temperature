const mongoose = require('mongoose');
// var userSchema = mongoose.Schema;
const ObjectID = mongoose.Schema.Types.ObjectId;

module.exports = new mongoose.Schema({
    tempId : {
		type : ObjectID
    },
    sensorID:{
        type: Number,
    },
    currentTemp : {
		type: Number
    },
    previousTemp:{
        type: Number
    },
    difference:{
      type:Number
    },
	sensorName : {
		type: String
    },
    currentDate: {
      type: Date 
    }
});