const {ObjectId} = require("mongodb");
const date = require("../date.js");
const {client} = require("../database");
const todoListCollection = client.db('todo').collection('todo_lists');

var workítems = [];

async function getTodoList (req, res) {
    const today = date.getDate();
    const listItems = await todoListCollection.find({}).toArray();

    const pageData = {
        listTitle: today,
        completed: false,
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

async function updateTodoItem (req, res) {
    const itemId = req.params.id;
    const item = req.body.newItem;
    const now = Date.now();

    if (!ObjectId.isValid(itemId)) {
        return res.status(400).send(`<h1>An invalid item id was sent in the request body</h1>`);
    }

    const todoItem = {
        item,
        updatedAt: now,
    }

    await todoListCollection.findOneAndUpdate({_id: new ObjectId(itemId)}, { todoItem});

    res.status(200).json({});
}



async function deleteTodoItem (req, res) {
    const itemId = req.params.id;

    if (!ObjectId.isValid(itemId)) {
        return res.status(400).send(`<h1>An invalid item id was sent in the request body</h1>`);
    }

    await todoListCollection.findOneAndDelete({id: new ObjectId(itemId)});

    res.status(200).json({message: 'Deleted successfully!'})
}


async function getWorkList (req, res) {
    const pageData = {
        listTitle: "Work List",
        newListItems: workítems
    };

    res.render("list", pageData);
}

module.exports = {
    getTodoList,
    getWorkList,
    createTodoItem,
    updateTodoItem,
    deleteTodoItem,
};