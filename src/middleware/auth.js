const jwt = require("jsonwebtoken");
const Users = require("../models/users");

const auth = async (req, res, next) => {
  let token = "";

  try {
    if (req.cookies.jwt) {
      token = req.cookies.jwt;
    } else {
      token = req.header("Authorization").replace("Bearer ", "");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await Users.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });

    if (!user) {
      throw new Error();
    }
    req.authorizedToken = token;
    req.authorizedUser = user;
    next();
  } catch (e) {
    res.status(401).send("Unauthorized!!");
  }
};

module.exports = auth;
