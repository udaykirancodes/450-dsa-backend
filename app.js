const express = require("express");

const app = express();

// imports
const apiRoutes = require("./routes/index");

// apply middlewares
app.use(express.json());

app.use("/api", apiRoutes);

module.exports = app;
