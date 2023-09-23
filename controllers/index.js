const date = require("../date.js");
const {client} = require("../database");
const todoListCollection = client.db('todo').collection('todo_lists');

var workítems = [];

async function getTodoList (req, res) {
    const today = date.getDate();
    const listItems = await todoListCollection.find({}).toArray();

    console.log(listItems)
    const pageData = {
        listTitle: today,
        newListItems: listItems
      };

  res.render("list", pageData); //render from the list of view folder
}

async function createTodoItem (req, res) {
    const item = req.body.newItem;
    const now = Date.now();

    const todoItem = {
        item,
        createdAt: now,
        updatedAt: now,
    }

    await todoListCollection.insertOne(todoItem);

    res.redirect("/");

}

async function getWorkList (req, res) {
    const pageData = {
        listTitle: "Work List",
        newListItems: workítems
    };

    res.render("list", pageData);
}

module.exports = {getTodoList, getWorkList, createTodoItem};