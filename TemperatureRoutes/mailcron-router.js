const router = require('express').Router();
const nodemailer = require("nodemailer");
const temperature = require('./temperature-model');
const cron = require('node-cron');

var gtDiffValue;


/*
	Here we are configuring our SMTP Server details.
	STMP is mail server which is responsible for sending and recieving email.
*/

const smtpTransport = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
        user: 'mukesh.vanjara@vanavil-systems.com',
        pass: 'demandACT5%' 
    },
    tls: {rejectUnauthorized: false},
    debug: true
});


/*------------------SMTP Over-----------------------------*/
/*------------------Routing Started ------------------------*/

/*Getting all value greate then 10 */   

router.route('/').get((req,res) => {
    temperature.find({"difference" : {$gt: 10 } }, function(err,respon){
        if(err){
            console.log("Temperature not found");
            res.json({
                success: false,
                message: "Error"
                // result: error
            });
        }else {
            gtDiffValue=respon;
            console.log("Temperature found");
            res.json({
                success: true,
                message: "Found",
                result: respon
            });
        }
    });
});


cron.schedule("1 * * * * *", function() {
    if(gtDiffValue > 0){
        const mailOptions= {
            from: 'mukesh.vanjara@vanavil-systems.com',
            to : 'cooldhruv555@gmail.com',
            subject : 'Sensor Temperature Details',
            text : 'Here is the Temperature diffrenrce for this id\n'+gtDiffValue
        };
        smtpTransport.sendMail(mailOptions, (error, info) => {
            if(error){
                return console.log(error);
            }
            console.log("The Message was sent!");
            console.log(info);
        });
    }
});


module.exports = router;