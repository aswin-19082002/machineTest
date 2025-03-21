const express = require("express");
const Router = express.Router();


const addItemsController=require("./controller/addItemsController")
Router.post("/addedItems",addItemsController.addedItems)
Router.get("/viewItems",addItemsController.viewItems)

module.exports = Router;