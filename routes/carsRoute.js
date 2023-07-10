const express = require("express");
//const cors = require('cors');
const router=express.Router();
const Car = require("../models/carModel");
const app = express();

router.get("/getallcars",async(req,res)=>{
    try{
        const cars = await Car.find()
        res.send(cars)
    }catch (error){
        return res.status(400).json(error);
    }
});

router.post("/addcar", async(req,res)=>{
    try{
        const newcar=new Car(req.body)
        console.log(req.body);
        await newcar.save();
        res.send("Car added successfully")
    }catch(error){
        return res.status(400).json(error);
    }
})

router.post("/editcar", async(req,res)=>{
    try{
        
        const car=await Car.findOne({ _id: req.body._id })
        car.name=req.body.name;
        car.image=req.body.image
        car.fuelType=req.body.fuelType
        car.rentPerHour=req.body.rentPerHour
        car.capacity=req.body.capacity
        await car.save();
        res.send("Car updated successfully")
    }catch(error){
        return res.status(400).json(error);
    }
    // try {
    //     await db.cars.findOneAndUpdate(
    //        { "_id" : req.body._id },
    //        { $set : { "name" : req.body.name,
    //         "image":req.body.image, 
    //         "rentPerHour":req.body.rentPerHour,
    //          "fuelType":req.body.fuelType, 
    //          "capacity":req.body.capacity}
    //         }
    //     );
    //  }
    //  catch(error){
    //     return res.status(400).json(error)
    //  }
});
router.post("/deletecar", async (req, res) => {
    try {
      await Car.findOneAndDelete({ _id: req.body.carid });
        
      res.send("Car deleted successfully");
    } catch (error) {
      return res.status(400).json(error);
    }
  });
router.post("/deletecar", async(req,res)=>{
    try {
        
            await db.cars.deleteMany( { "_id" : req.body._id } );
            res.send("Car deleted successfully")
         } catch(error){
            return res.status(400).json(error)
         }
    });

module.exports=router