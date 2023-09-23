const express = require('express');
const app = express();
const controllers = require('../controllers');
const middlewares = require('../middlewares');
const helpers = require('../helpers');

// Mounting routes with middlewares and controllers
app.get("/", controllers.getTodoList)

app.post("/item", middlewares.validateRequestBody, helpers.tryController.bind(null, controllers.createTodoItem));

app.put("/item/:id", middlewares.validateRequestBody, helpers.tryController.bind(null, controllers.updateTodoItem));

app.delete("/item/:id", helpers.tryController.bind(null, controllers.deleteTodoItem));

app.get("/work", controllers.getWorkList);

module.exports = app;