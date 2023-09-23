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


    // Mounting routes
    app.use("/", routes);
}


database.initializeConnection().then(async function () {

    await setupExpressApp();
    
    app.listen(process.env.PORT, function() {
      console.log("Server started on port ", process.env.PORT);
    })
})
