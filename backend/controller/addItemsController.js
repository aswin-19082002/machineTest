const Items = require("../model/addItemsSchema"); 

const addedItems = (req, res) => {
    const { itemName, description, price,category } = req.body;

    let items = new Items({ 
        itemName,
        description,
        price,
        category 
    });

    items.save()
        .then((data) => {
            res.status(200).json({
                msg: "saved",
                status: 200,
                data: data
            });
        })
        .catch((err) => {
            res.status(500).json({  
                status: 500, 
                err: err.message || "Internal Server Error"
            });
        });
};


const viewItems = (req, res) => {
    Items.find()
        .then((data) => {
            res.status(200).json({
                msg: "Items retrieved successfully",
                status: 200,
                data: data
            });
        })
        .catch((err) => {
            res.status(500).json({
                status: 500,
                err: err.message || "Internal Server Error"
            });
        });
};


module.exports = { addedItems ,viewItems };
