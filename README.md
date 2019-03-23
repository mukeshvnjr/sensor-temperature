This project was generated with [Node Js, MongoDb, Express] https://nodejs.org/en/

I am sending sensor device data such as sensor ID, Name, and temperature to database. 

I am validating whether the sensor device exits or not using sensor ID. If the data doesn't exist then it will create new sensor device data in the database. However, it is exists then I am shifting the previous temperature in other column and the current temperature in the current column. 

So that I can compare and differentiate between both the temperatures. I have kept 10 degree temperature as my base temperature and if it increases or decreases by 10 degrees then the mail will be sent automatically (within or less than 3 minutes) to the admin. 

Once done, the admin can access all the data.     

Installation

1. Install the npm package:

    When you hit this below command in your terminal, whatever node module I have used in this project will be installed in your system or project.

        npm install 

2. Run 'npm start' node Server. We can run using 'node server.js' as well, But here i have used 'nodemon'. Whenever we use 'nodemon'       and want to change any thing, just hit save and changes will reflect automatically. No need to stop serve every time.
   
   npm install nodemon --save


Database

I have used mongoDB for database.

Create database into mongo serve.

Run below command to creating database.

    use sensor-temperature /*sensor-temperature (You can create database with this name)*/


Here is the API.

Run the below API to test the application

1. Posting data to Database

    http://localhost:8080/temp/temperature

2. Get all the Data here: 

    http://localhost:8080/temp/admin/getAllTempData

3.Get data using below ID.

    http://localhost:8080/temp/-id /*Get the respective ID from the particular sensor and paste in place of id*/

4. Delete the Sensor Data 

    http://localhost:8080/temp/_id
