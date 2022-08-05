const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URL);

console.log("DB conected on port : 27017 🚀");
