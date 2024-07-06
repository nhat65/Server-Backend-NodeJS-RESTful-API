const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
var bodyParser = require("body-parser");
const morgan = require("morgan");
const dotenv = require("dotenv");
const userRoute = require("./routes/user")
const productRoute = require("./routes/product")
const cartRoute = require("./routes/cart")
const categoryRoute = require("./routes/category")
const orderRoute = require("./routes/order")
const searchRoute = require("./routes/search")
const authenRoute = require("./routes/authentication")

dotenv.config();
//connect database
async function connectToDatabase() {
    try {
      await mongoose.connect((process.env.MONGODB_URL));
      console.log("Connected to MongoDB");
    } catch (error) {
      console.error("Error connecting to MongoDB:", error);
    }
  }
  connectToDatabase();
app.use(bodyParser.json({limit:"50mb"}));
app.use(cors());
app.use(morgan("common"));

//routes
app.use("/v1/user", userRoute);
app.use("/v1/product", productRoute)
app.use("/v1/cart", cartRoute)
app.use("/v1/category", categoryRoute)
app.use("/v1/order", orderRoute)
app.use("/v1/search", searchRoute)
app.use("/v1/authen", authenRoute)


app.listen(8000, () => {
    console.log("Server's running")
});