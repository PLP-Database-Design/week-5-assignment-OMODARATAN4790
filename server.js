// import our dependecies 
const express = require("express")
const app = express()
const mysql = require('mysql2');
const dotenv = require('dotenv')





// configure environment variables
dotenv.config();





// create a connection object
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})





// test the connection
db.connect((err) => {
    // connection is not successful
    if(err) {
        return console.log("Error connecting to the database:", err)
    }

    // if connection iss succcesfull
    console.log("successfully connected to MySQL: ", db.threadId)
})





// Question 1: Retrieve all patients
app.get('', (req, res) => {
    const getPatients = "SELECT patient_id, first_name, last_name, date_of_birth FROM patients"
    db.query(getPatients, (err, data) => {
        if (err) {
            return res.status(400).send("Failed to get patients")
        }
        res.status(200).send(data)
    });
});





// Question 2: Retrieve all providers
app.get('', (req, res) => {
    const getProviders = "SELECT first_name, last_name, provider_specialty FROM providers"
    db.query(getProviders, (err, data) => {
        if (err) {
            return res.status(400).send("Failed to get providers")
        }
        res.status(200).send(data)
    });
});

  



// Question 3: Filter patients by First Name
app.get('', (req, res) => {
    const { first_name } = req.query
    const filterPatients = "SELECT patient_id, first_name, last_name, date_of_birth FROM patients WHERE first_name = ?"
    db.query(filterPatients, [first_name], (err, data) => {
        if (err) {
            return res.status(400).send("Failed to filter patients by first name")
        }
        res.status(200).send(data)
    });
});





// Question 4: Retrieve all providers by their specialty
app.get('', (req, res) => {
    const { specialty } = req.query;
    const getProvidersBySpecialty = "SELECT first_name, last_name, provider_specialty FROM providers WHERE provider_specialty = ?"
    db.query(getProvidersBySpecialty, [specialty], (err, data) => {
        if (err) {
            return res.status(400).send("Failed to get providers by specialty")
        }
        res.status(200).send(data)
    });
});





// basic endpoint to say Hello world
app.get('', (req, res) => {
    res.send("Hello world, David is writing some code from nigeria")
})





// start and listen to the server
app.listen(3300, () => {
    console.log(`server is running on port 3300...`)
})