const mongoose=require("mongoose");
mongoose.connect("mongodb://localhost:27017/students-api").then(()=>{
    console.log("connection is succesfull");
}).catch((e)=>{
    console.log("no connection");
})