const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();

// imports
const apiRoutes = require("./routes");

// models
const Question = require("./models/questions.model");

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

// function to create questions in the database from file only first the first time or once
const createOrLeave = async () => {
  try {
    const q = await Question.find();
    // if found don't create
    if (q.length !== 0) return;
    // if not found create one
    const question = new Question();
    await question.save();
  } catch (error) {
    console.log(error.messsage);
  }
};

createOrLeave();

module.exports = app;
