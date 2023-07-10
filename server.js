const express = require("express")
const Cors=require("cors");
const app =express();
const port = process.env.PORT || 5000;
const dbConnection = require('./db')
app.use(Cors(
    {
        origin: '*',
        optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
      }
));
app.use(express.json())

app.use("/api/cars/",require("./routes/carsRoute"));
app.use("/api/users/",require("./routes/usersRoute"));
app.use("/api/bookings/", require("./routes/bookingsRoute"))
app.get("/", (req,res)=>res.send("Hello Developer"))

//app.use(/api/cars);
app.listen(port, ()=>
console.log(`Server started at port ${port}`))