//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const routes = require('./routes');
const database = require('./database');
require("dotenv").config();

const app = express();

async function setupExpressApp() {
    app.set("view engine", "ejs") //informing our app that we are going to use ejs

    app.use(bodyParser.urlencoded({extended: true})); // Adding bodyparser middleware to parse the request

    app.use(express.static("public")); //to add our static css file to the server

    app.use(express.json());

    // Mounting routes
    app.use("/", routes);
}


database.initializeConnection().then(async function () {
    const PORT = process.env.PORT;

    if (!PORT) {
        throw new Error('PORT has not been declared in the .env file');
    }

    await setupExpressApp();
    
    app.listen(PORT, function() {
      console.log("Server started on port ", PORT);
    })
})
