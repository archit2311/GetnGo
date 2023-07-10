const mongoose = require("mongoose");

function connectDB() {

mongoose.connect('mongodb+srv://Archit2311:shah@cluster0.jeyewcj.mongodb.net/RentCars', {useUnifiedTopology: true, useNewUrlParser: true});

const connection = mongoose.connection
connection.on("connected", ()=>{
    console.log("mongoDB connection success");
})
connection.on("error", ()=>{
    console.log("mongoDB connection error");
})

}

connectDB();

module.exports = mongoose