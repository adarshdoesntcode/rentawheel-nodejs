const express = require("express");
const router = new express.Router();
const auth = require("../middleware/auth");
const clientAuth = require("../middleware/clientAuth");

router.get("/", (req, res) => {
  res.render("index");
});


router.get("/adminlogin0069", (req, res) => {
  res.render("adminindex");
});

router.get("/adminpage", auth, (req, res) => {
  res.render("adminpage", {
    name: req.authorizedUser.name.split(" ")[0],
  });
});



router.get("/dashboard", clientAuth, (req, res) => {
  res.render("dashboard", {
    client: req.authorizedClient.name.split(" ")[0],
  });
});


router.get("/addVehicles", auth, (req, res) => {
  res.render("addVehicles");
});

router.get("/allvehiclesviews", auth, (req, res) => {
  res.render("allVehicles", {
    name: req.authorizedUser.name.split(" ")[0],
  });
});

router.get("/renderVehicles", auth, (req, res) => {
  res.render("vehicles", {
    admin: req.authorizedUser.name.split(" ")[0],
  });
});

router.get("/vehiclebookings", auth, (req, res) => {
  res.render("adminvehiclebooking", {
    admin: req.authorizedUser.name.split(" ")[0],
  });
});
module.exports = router;
