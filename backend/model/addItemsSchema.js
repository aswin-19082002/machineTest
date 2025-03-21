const mongoose=require("mongoose")


const addItemSchema=new mongoose.Schema({

    itemName:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    category: {  
        type: String,
        required: true
    }
    
   

})

module.exports =new mongoose.model("items",addItemSchema)