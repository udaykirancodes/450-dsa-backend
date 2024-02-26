const express = require("express");
const morgan = require("morgan");

const app = express();

// imports
const apiRoutes = require("./routes");

// apply middlewares
app.use(express.json());
app.use(morgan("dev"));

// Routes
app.use("/api", apiRoutes);

module.exports = app;
