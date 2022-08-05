const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const clientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Email id not valid");
        }
      },
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 6,
      validate(value) {
        if (value.toLowerCase().includes("password")) {
          throw new Error("Password cannot contain 'password'");
        }
      },
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

clientSchema.methods.toJSON = function () {
  const client = this;

  const objectClient = client.toObject();

  delete objectClient.tokens;
  delete objectClient.password;

  return objectClient;
};

clientSchema.methods.generateAuthToken = async function () {
  const client = this;

  const token = jwt.sign(
    { _id: client._id.toString() },
    process.env.JWT_SECRET
  );
  client.tokens = client.tokens.concat({ token });
  await client.save();
  return token;
};

clientSchema.statics.getByCredentials = async (email, password) => {
  const client = await Clients.findOne({ email });

  if (!client) {
    throw new Error("Unable to login");
  }

  const isMatch = await bcrypt.compare(password, client.password);
  if (!isMatch) {
    throw new Error("Unable to login");
  }

  return client;
};

clientSchema.pre("save", async function (next) {
  //using old function format cause arrow function doesnot have access to 'this'
  const client = this;

  if (client.isModified("password")) {
    client.password = await bcrypt.hash(client.password, 10);
  }

  next(); //is strictly needed to continue the program else it will remain stuck here
});

const Clients = mongoose.model("Clients", clientSchema);

module.exports = Clients;
