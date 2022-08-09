const express = require("express");
const multer = require("multer");
const sharp = require("sharp");
const Users = require("../models/users");
const Bookings = require("../models/bookings");
const Vehicles = require("../models/vehicles");
const auth = require("../middleware/auth");
const { sendWelcomeEmail, sendGoodbyeEmail } = require("../email/account");


const router = new express.Router();

//--------------SIGN UP---------------

router.post("/users", async (req, res) => {
  const user = new Users(req.body);

  try {
    const result = await user.save();
    sendWelcomeEmail(user.email, user.name);
    // const token = await user.generateAuthToken();

    // res.cookie('jwt', token )
    res.status(201).send(result);
  } catch (e) {
    res.status(400).send(e);
  }
});

//--------------LOG IN---------------

router.post("/users/login", async (req, res) => {
  try {
    const user = await Users.getByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    res.cookie("jwt", token, {
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    });
    res.send({ user });
  } catch (e) {
    res.status(400).send(e);
  }
});

//--------------GET PROFILE---------------

router.get("/users/me", auth, async (req, res) => {
  res.send(req.authorizedUser);
});

//--------------LOG OUT---------------

router.post("/users/logout", auth, async (req, res) => {
  try {
    req.authorizedUser.tokens = req.authorizedUser.tokens.filter((tokenObj) => {
      return tokenObj.token != req.authorizedToken;
    });

    await req.authorizedUser.save();
    res.send("Logged out");
  } catch (e) {
    res.send(500).send();
  }
});

//--------------LOGOUT ALL---------------

router.post("/users/logoutAll", auth, async (req, res) => {
  try {
    req.authorizedUser.tokens = [];

    await req.authorizedUser.save();
    res.send("Logged out All");
  } catch (e) {
    res.send(500).send();
  }
});

//--------------UPDATE USER---------------

router.patch("/users/me", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const validUpdates = ["name", "email", "age", "password"];
  const isValid = updates.every((key) => validUpdates.includes(key));

  if (!isValid) {
    return res.status(400).send({ error: "Invalid Update" });
  }

  try {
    updates.forEach(
      (update) => (req.authorizedUser[update] = req.body[update])
    );
    await req.authorizedUser.save();
    res.send(req.authorizedUser);
  } catch (e) {
    res.status(500).send(e);
  }
});

//--------------DELETE USER---------------

router.delete("/users/me", auth, async (req, res) => {
  try {
    await req.authorizedUser.remove();
    sendGoodbyeEmail(req.authorizedUser.email, req.authorizedUser.name);
    res.send(req.authorizedUser);
  } catch (e) {
    res.status(500).send(e);
  }
});

//--------------UPLOAD PROFILE PICTURE---------------

const upload = multer({
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpg|jpeg)$/)) {
      return cb(new Error("Supported files: jpeg,png,jpg"), undefined);
    }
    cb(undefined, true);
  },
});

router.post(
  "/users/me/avatar",
  auth,
  upload.single("avatar"),
  async (req, res) => {
    const buffer = await sharp(req.file.buffer)
      .resize({ width: 300, height: 300 })
      .png()
      .toBuffer();
    req.authorizedUser.avatar = buffer;
    await req.authorizedUser.save();

    res.send();
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);

//--------------DELETE PROFILE PICTURE---------------

router.delete("/users/me/avatar", auth, async (req, res) => {
  try {
    req.authorizedUser.avatar = undefined;
    await req.authorizedUser.save();
    res.send();
  } catch (e) {
    res.status(500).send(e);
  }
});

//--------------GET PROFILE PICTURE---------------

router.get("/users/:id/avatar", async (req, res) => {
  try {
    const user = await Users.findById(req.params.id);
    if (!user || !user.avatar) {
      throw new Error();
    }

    res.set("Content-Type", "image/jpg");
    res.send(user.avatar);
  } catch (e) {
    res.status(404).send(e);
  }
});

//--------------LOGOUT USER---------------

router.get("/logoutadmin", auth, async (req, res) => {
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


router.get("/allbookings",auth,async (req,res)=>{
  const sort = {};
  if (req.query.sortBy) {
    const parts = req.query.sortBy.split(":");
    sort[parts[0]] = parts[1] === "desc" ? -1 : 1;
  }
  try {
    const bookings = await Bookings.find({
      options:{
        sort
      }
    });
    if (!bookings) {
      return res.status(404).send();
    }
    res.send(bookings);
  } catch (e) {
    res.status(500).send();
  }
})


router.get("/selectbooking/:id",auth,async (req,res)=>{
  const _id = req.params.id;
try{
  const booking = await Bookings.findOne({
    _id
  })

  if(!booking){
    return res.status(404).send("Not Found");
  }

  res.render("verifybooking",{
    booking
  })
}
catch(e){
  res.status(500).send("Internal Error")
}


})

router.post("/verifyotp/:id",auth,async (req,res)=>{
  const _id = req.params.id;
  const otp = req.body.otpcode;
  const vid = req.body.vid;

try{
  const verify = await Bookings.findOneAndUpdate({
    _id,
    otp
  },{
    otp:"Matched",
    status:"Verified"
  },{
    new:true
  })
  if(verify){
    const vehicle = await Vehicles.findOne({_id:vid});
    const stock = parseInt(vehicle.availablestock) - 1;
    const update = await Vehicles.findOneAndUpdate({
      _id:vid
    },{
      availablestock: stock
    },{
      new:true
    })
  }
  res.send(verify)

}
catch(e){
  res.status(500).send("Internal Error")
}
})

router.post("/completetransaction/:id",auth,async (req,res)=>{
  const _id = req.params.id;
  const vid = req.body.vid;

try{
  const verify = await Bookings.findOneAndUpdate({
    _id,
    status:"Verified"
  },{
    status:"Complete"
  },{
    new:true
  })
  if(verify){
    const vehicle = await Vehicles.findOne({_id:vid});
    const stock = parseInt(vehicle.availablestock) + 1;
    const update = await Vehicles.findOneAndUpdate({
      _id:vid
    },{
      availablestock: stock
    },{
      new:true
    })
  }
  res.status(200).send(verify)

}
catch(e){
  res.status(500).send("Internal Error")
}
})

module.exports = router;
