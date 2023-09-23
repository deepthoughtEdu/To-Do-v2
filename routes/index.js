const express = require('express');
const app = express();
const controllers = require('../controllers');
const middlewares = require('../middlewares');

// Mounting routes with middlewares and controllers
app.get("/", controllers.getTodoList)

app.post("/item", middlewares.validateRequestBody, controllers.createTodoItem);
app.put("/item/:id", middlewares.validateRequestBody, controllers.updateTodoItem);
app.delete("/item/:id", controllers.deleteTodoItem);

app.get("/work", controllers.getWorkList);

module.exports = app;