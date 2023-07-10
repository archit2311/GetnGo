const express = require("express");
const router=express.Router();
const Booking = require("../models/bookingModel")
const Car = require("../models/carModel")
// const { v4: uuidv4 } = require('uuid');
// const stripe = require("stripe")("sk_test_51MP1K9SJCV3Vj4VOAHDY41lhM78jNRGYHsAxmhPjWF2NLmiMjy5Gi1q46zCWWPB9iEOkrpOZHWDH3HDAUCgpxkLJ00SMEMrjlU");

router.post("/bookcar", async(req,res)=>{
    
    // const {token} = req.body;
    req.body.transactionId='1234';
    try{

        // const customer = await stripe.checkout.sessions.create({
        //     email: token.email,
        //     source:token.id, 
        // });

        // const payment = await stripe.charges.create({
        //     amount : req.body.totalAmount * 100,
        //     currency : "usd",
        //     customer : customer.id,
        //     //receipt_email : token.email
        // },
        
        // {
        //     idempotencyKey: uuidv4()
        // });
        
        // if(payment)
        // {
            
            const newbooking = new Booking(req.body);
            await newbooking.save();
            const car = await Car.findOne({_id: req.body.car});
         
            car.bookedTimeSlots.push(req.body.bookedTimeSlots);
            await car.save();
            res.send('Your booking is successfull');
        
        // else{
        //     return res.status(400).json(error);
        // }
    }catch(error){
        console.log(error);
        return res.status(400).json(error);
    }

});

router.get("/getallbookings", async(req,res)=>{
    try{
        const bookings=await Booking.find().populate('car')
        res.send(bookings)
    }catch(error){
        return res.status(400).json(error);
    }
});

module.exports = router;