const mongoose = require("mongoose");
// dot-env configuration
const dotenv = require("dotenv");
dotenv.config({ path: ".env" });

// import app
const app = require("./app");
const config = require("./config/config");

// connect to database
mongoose.set("strictQuery", true);
mongoose
  .connect(config.MONGO_DB.url, config.MONGO_DB.options)
  .then(() => {
    console.log("Connected To DataBase");
    // Listening to Server
    app.listen(config.PORT, () => {
      console.log("Server Started : " + config.PORT);
    });
  })
  .catch((err) => {
    console.log(err.message);
  });
