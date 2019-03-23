const router = require('express').Router();
const nodemailer = require("nodemailer");
const temperature = require('./temperature-model');
const cron = require('node-cron');

var tempID;
var status;

/* Post Data*/
router.route('/temperature').post((req, res) => {   
	const sensorID = req.body.sensorID;
    const sensorName = req.body.sensorName;
    const currentTemp = req.body.currentTemp;
    const previousTemp = 0;
    const difference = 0;
    const currentDate = Date.now();

    var tempObj = {
        sensorID: sensorID,
        sensorName:sensorName,  
        currentTemp:currentTemp,
        previousTemp: previousTemp,
        currentDate:currentDate,
        difference: difference
    }

    temperature.find({
        sensorID: sensorID
    }, function(err, response){
        if (err) {
            console.log(err);
            res.json({
                success: false,
                message: 'Something Went Wrong!',
                error: err
            });
        } 

        if (response.length >0 ) {
            tempID = response[0]._id;

            var cv =  currentTemp;
            var pv =  response[0].currentTemp;
            var difference  =  cv > pv ? cv - pv : pv-cv;

             /*Percentage logic*/

            /* var difference  =  cv - pv;
            var diffMode = (cv + pv) / 2;   
            var difference = (tempValue/diffMode) * 100;
            var difference = tempValue; */
        
            var updateValue= {$set: {"currentTemp": currentTemp, "previousTemp": response[0].currentTemp, "difference": difference}};

            tempCalculation(currentTemp,response[0].currentTemp,)
            res.json({
                success: false,
                message: 'Sensor Id is already Exits',
                error:  updateTemp(tempID, updateValue) //Pass id and update temp values
            });
        }else{
            res.json({
                success: true,
                message: "Temp Added Successfully",
                result: creteTemp(tempObj) //Create new Sensor ID
            });
        }
    });
});

/* Update Data*/
function updateTemp(tempID, updateValue){
    temperature.findByIdAndUpdate(tempID, updateValue, (err) => {
        if (err) {
            status= "true";
        }else{
            status= "false";
        }
        return status;
    });
}

/* Create Data*/
function creteTemp(tempObj){
    temperature.create(tempObj, (err) => {
        if (err) {
            status= "true";
        }else{
            status= "false";
        }
        return status;
    });
}

/* Get All Data*/
router.route('/admin/getAllTempData').get((req,res) => {
    temperature.find({}, function(err,respon){
        if(err){
            console.log("Temperature not found");
            res.json({
                success: false,
                message: "Error"
                // result: error
            });
        }else {
            console.log("Temperature found");
            res.json({
                success: true,
                message: "Found",
                result: respon
            });
        }
    });
});

/* Get Data By ID Data*/
router.route('/:id').get((req,res) => {
    temperature.findById(req.params.id, function(err,respons) {
        if(err){
            console.log("Temperature not found");
            res.json({
                success: false,
                message: "Error"
                // result: error
            });
        }else {
            console.log("Temperature found");
            res.json({
                success: true,
                message: "Found",
                result: respons
            });
        }
    });
});

/* Delete Data By ID Data*/
router.route('/:id').delete((req,res) => {
    temperature.findByIdAndRemove(req.params.id, function(err,respons) {
        if(err){
            res.json({
                success: false,
                message: "Error"
                // result: error
            });
        }else {
            console.log("Deleted successfully!");
            res.json({
                success: true,
                message: "Deleted successfully!"
            });
        }
    });
});

/*INTERVAL Log Timming*/
router.route('/api/logs/:timer/:times').get((req,res) => {
    if (err) {
        res.sendStatus(403);
    }else {
        var timer = req.params.timer;
        var times = parseInt(req.params.times);
        var counter = 0;
        console.log(timer, times);
        res.setHeader("Content-Type", "text/html");

        console.log(counter, times);

        setInterval(function() {
            if (counter < times) {
              //var query = "SELECT * from salesforce." + tableName;
              var query = "SELECT * FROM temperature._trigger_log WHERE currentDate > CURRENT_TIMESTAMP - INTERVAL '30 minutes' ";
          
              db.any(query).then(function(data) {
                res.write(
                  "\n************************************************************************************\n"
                );
                console.log("**********************************************");
                res.write(JSON.stringify(data));
                counter++;
              });
            } else {
              res.end();
            }
          }, parseInt(req.params.timer));
    }
});


module.exports = router;