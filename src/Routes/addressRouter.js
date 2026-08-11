const express = require("express");

const addressRoute = express.Router()

const authMiddleware = require("../middleware/authMiddleware");

addressRoute.post("/createAddress", authMiddleware, async (req, res) => {
    try {
        const{type,street,city,state,country,pincode,latitude,longitude}=req.body
    
    let addressData={
        user:req.user._id,
        type,
        street,city,
        state,
        country,pincode,
        location:{
            type:"point",
            coordinates:[latitude,longitude],
            
        }
    }

    await AddressModel.create(addressData);

    res.send("address successfully created")

}
    
    catch(err){
        res.status(400).send({messege:err})
    }
    });