const jwt = require("jsonwebtoken");
const Clients = require("../models/clients");

const clientAuth = async (req, res, next) => {
  let token = "";

  try {
    if (req.cookies.jwt) {
      token = req.cookies.jwt;
    } else {
      token = req.header("Authorization").replace("Bearer ", "");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const client = await Clients.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });

    if (!client) {
      throw new Error();
    }
    req.authorizedToken = token;
    req.authorizedClient = client;
    next();
  } catch (e) {
    res.status(401).send("Unauthorized!!");
  }
};

module.exports = clientAuth;
