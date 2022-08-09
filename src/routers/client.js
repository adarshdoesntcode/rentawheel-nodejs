const express = require("express");
const Clients = require("../models/clients");
const Bookings = require("../models/bookings");
const clientAuth = require("../middleware/clientAuth");
const {
  sendWelcomeEmail,
  sendGoodbyeEmail,
  sendBookinngEmail,
} = require("../email/account");

const router = new express.Router();

const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

//--------------SIGN UP---------------

router.post("/clients/signup", async (req, res) => {
  const client = new Clients(req.body);

  try {
    const result = await client.save();
    sendWelcomeEmail(client.email, client.name);

    res.status(201).send(result);
  } catch (e) {
    res.status(400).send(e);
  }
});

//--------------LOG IN---------------

router.post("/clients/login", async (req, res) => {
  try {
    const client = await Clients.getByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await client.generateAuthToken();
    res.cookie("jwt", token, {
      expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    });
    res.send({ client });
  } catch (e) {
    res.status(400).send(e);
  }
});

//--------------LOGOUT CLIENT---------------

router.get("/logoutclient", clientAuth, async (req, res) => {
  try {
    res.cookie("jwt", "loggedout", {
      expires: new Date(Date.now() + 5 * 1000),
      httpOnly: true,
    });
    res.status(200).send();
  } catch (e) {
    res.status(500).send(e);
  }
});

// -------------------BOOKING REQUEST-----------------------

router.post("/clients/rent/request", clientAuth, async (req, res) => {
  try {

    const rebooking = await Bookings.find({
      clientlicense:req.body.clientlicense,
      status:"Booked"
    })

    
    if(rebooking.length>0){
      throw new Error({message:"You have already Booked"});
    }
    

    const booking = new Bookings({
      clientname: req.body.clientname,
      clientcontact: req.body.clientcontact,
      clientlicense: req.body.clientlicense,
      pickupdate: req.body.pickupdate,
      dropoffdate: req.body.dropoffdate,
      payableamt: req.body.payableamt,
      otp: req.body.otp,
      model: req.body.model,
      vehicleid: req.body.vehicleid,
      imgurl: req.body.imgurl,
      author: req.authorizedClient._id,
      status: "Booked",
    });

    const result = await booking.save();

    
    sendBookinngEmail(
      req.authorizedClient.email,
      req.authorizedClient.name,
      result.model,
      result.clientname,
      result.pickupdate.toLocaleDateString("en-US", options),
      result.dropoffdate.toLocaleDateString("en-US", options),
      result.payableamt,
      result.otp,
      result.imgurl,
      result.clientlicense
    );
    // console.log(result);
    res.status(201).send(result);
  } catch (e) {
    res.status(400).send(e);
  }

});
router.get("/profile", clientAuth,(req, res) => {

  res.render("profile");
});

router.get("/mybookings", clientAuth, async (req, res) => {

  try{
    const bookings = await Bookings.find({
      author:req.authorizedClient._id
    })

    if(!bookings){
      return res.status(404).send("Not Found");
    }

    res.send(bookings);
  }catch(e){
    res.status(500).send(e);
  }
});


module.exports = router;
