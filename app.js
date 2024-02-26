const express = require("express");

const app = express();

// apply middlewares
app.use(express.json());

module.exports = app;
