const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);
require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
app.use(cookieParser());
app.use(express.json());
const PORT = process.env.PORT;
const url = process.env.url;

mongoose
  .connect(url)
  .then((e) => console.log("Mongo DB connected"))
  .catch((e) => console.log("Failed to connect with database"));

const userRoute = require("./src/Routes/userRoute");
const productRoute = require("./src/Routes/productRoute");
app.use("/user", userRoute);
app.use("/product", productRoute);

app.listen(PORT, () => console.log(`Server started at port ${PORT}`));