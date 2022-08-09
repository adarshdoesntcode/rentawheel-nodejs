const express = require("express");
const Vehicles = require("../models/vehicles");
const auth = require("../middleware/auth");
const clientAuth = require("../middleware/clientAuth");
const router = new express.Router();

// -----------------CREATE VEHICLE----------------

router.post("/vehicles", auth, async (req, res) => {
  const vehicle = new Vehicles({
    ...req.body,
    author: req.authorizedUser._id,
  });

  try {
    const result = await vehicle.save();
    res.status(201).send(result);
  } catch (e) {
    res.status(400).send(e);
  }
});

// -----------------GET ALL VEHICLES ----------------
// GET: vehicles?completed=true/false
// GET: vehicles?limit=2&skip=0
// GET: vehicles?sortBy=createdAt:desc
router.get("/vehicles", auth, async (req, res) => {
  const match = {};
  const sort = {};

  if (req.query.completed) {
    match.completed = req.query.completed === "true";
  }
  if (req.query.sortBy) {
    const parts = req.query.sortBy.split(":");
    sort[parts[0]] = parts[1] === "desc" ? -1 : 1;
  }

  try {
    await req.authorizedUser.populate({
      path: "vehicles",
      match,
      options: {
        limit: parseInt(req.query.limit),
        skip: parseInt(req.query.skip),
        sort,
      },
    });
    res.send(req.authorizedUser.vehicles);
  } catch (e) {
    res.status(500).send();
  }
});

// -----------------GET ALL VEHICLES FOR CLIENT----------------
// GET: vehicles?completed=true/false
// GET: vehicles?limit=2&skip=0
// GET: vehicles?sortBy=createdAt:desc
router.get("/dashboardvehicles", clientAuth, async (req, res) => {
  const match = {};
  const sort = {};

  if (req.query.sortBy) {
    const parts = req.query.sortBy.split(":");
    sort[parts[0]] = parts[1] === "desc" ? -1 : 1;
  }

  try {
    const vehicles = await Vehicles.find({
      match,
      options: {
        limit: parseInt(req.query.limit),
        skip: parseInt(req.query.skip),
        sort,
      },
    });
    res.send(vehicles);
  } catch (e) {
    res.status(500).send();
  }
});
// -----------------GET ALL VEHICLE----------------

router.get("/allvehicles/", auth, async (req, res) => {
  try {
    const vehicles = await Vehicles.find();
    if (!vehicles) {
      return res.status(404).send();
    }
    res.send(vehicles);
  } catch (e) {
    res.status(500).send();
  }
});

// -----------------RENT VEHICLE BY ID----------------

router.get("/clients/rent/:id", clientAuth, async (req, res) => {
  const _id = req.params.id;

  try {
    const vehicle = await Vehicles.findOne({
      _id
    });
    if (!vehicle) {
      return res.status(404).send();
    }
    res.render("rentvehicle", {
      client:req.authorizedClient.name.split(" ")[0],
      _id:vehicle.id,
      model:vehicle.model,
      type:vehicle.type,
      imgurl:vehicle.imgurl,
      seatcapacity:vehicle.seatcapacity,
      bootcapacity:vehicle.bootcapacity,
      kilometersdriven:vehicle.kilometersdriven,
      rate:vehicle.rate
    });
  } catch (e) {
    res.status(500).send();
  }
});

// -----------------UPDATE VEHICLE----------------

router.patch("/vehicles/:id", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const validUpdates = [
    "Model",
    "Type",
    "KilometersDriven",
    "RegistrationNo",
    "VehicleNo",
    "Image",
  ];
  const isValid = updates.every((key) => validUpdates.includes(key));

  if (!isValid) {
    return res.status(400).send({ error: "Invalid Update" });
  }

  try {
    const vehicle = await Vehicles.findOne({
      _id: req.params.id,
      author: req.authorizedUser._id,
    });
    if (!vehicle) {
      return res.status(404).send();
    }

    updates.forEach((update) => (vehicle[update] = req.body[update]));
    await vehicle.save();
    res.send(vehicle);
  } catch (e) {
    res.status(400).send(e);
  }
});

// -----------------DELETE VEHICLE ----------------

router.delete("/vehicles/:id", auth, async (req, res) => {
  
  const _id = req.params.id;
  try {
    const vehicle = await Vehicles.findOneAndDelete({
      _id,
      author: req.authorizedUser._id,
    });
    if (!vehicle) {
      return res.status(404).send({ error: "Vehicle not found with your id" });
    }
    res.send(vehicle);
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
