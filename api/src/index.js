require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const applyAllRoutes = require("./routes");

const app = express();

app.use(express.json());
app.use(cors());

applyAllRoutes(app);

app.listen(process.env.SERVER_PORT, (err) => {
  if (!err) {
    console.log("Server started on port: " + process.env.SERVER_PORT);

    mongoose.connect(process.env.MONGO_URL, (err) => {
      if (!err) {
        console.log("connected to mongodb");
      } else {
        console.log(err);
      }
    });
  } else {
    console.log(err);
  }
});
