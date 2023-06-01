const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/dbConnection");

const app = express();

const PORT = process.env.PORT || 8000;

// DB connection init
connectDB();

// middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

// routes
app.use("/shops", require("./routes/Shop"));
app.use("/products", require("./routes/Product"));
app.use("/orders", require("./routes/Order"));
app.use("/customer", require("./routes/Customer"));

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

mongoose.connection.on("error", (err) => {
  console.log(err);
});
