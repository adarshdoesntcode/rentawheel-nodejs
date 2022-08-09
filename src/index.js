require("dotenv").config();

const express = require("express");
const path = require("path");
const hbs = require("hbs");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require('body-parser');

require("./db/mongoose");

const userRouter = require("./routers/user");
const vehicleRouter = require("./routers/vehicle");
const viewsRouter = require("./routers/views");
const clientRouter = require("./routers/client");

const app = express();

//Define Paths for Express
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsDirectoryPath = path.join(__dirname, "../templates/views");

//Setup  handlebar and views location and partials
app.set("view engine", "hbs");
app.set("views", viewsDirectoryPath);

//Setup static directory
app.use(express.static(publicDirectoryPath));

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.json()); //converts json response into object
app.use(userRouter);
app.use(vehicleRouter);
app.use(viewsRouter);
app.use(clientRouter);

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server started on port : ${port} 🚀`);
});
