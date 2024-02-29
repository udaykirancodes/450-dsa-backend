const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();

// imports
const apiRoutes = require("./routes");

// apply middlewares
app.use(express.json());
// app.use(morgan("dev"));
app.use(
  cors({
    origin: "*",
  })
);

// Routes
app.use("/api", apiRoutes);

module.exports = app;
