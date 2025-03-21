const express=require("express")
const app=express()
const cors=require("cors")
const bodyparser=require("body-parser")
app.use(bodyparser.json())

const router=require("./routes")
app.use(cors())
app.use("/",router)

const dbconnection=require("./dbConnections")

app.listen(5100,function(){
    console.log("server running sucessfully");
    
})