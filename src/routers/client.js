const express = require("express");
const Clients = require("../models/clients");
const clientAuth = require("../middleware/clientAuth");
const { sendWelcomeEmail, sendGoodbyeEmail } = require("../email/account");

const router = new express.Router();

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
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
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

module.exports = router;
