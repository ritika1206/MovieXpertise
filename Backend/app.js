const fs = require('fs');
const path = require('path');

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const userRoutes = require("./routes/user");
const movielistRoutes = require("./routes/movielist");
const authRoutes = require("./routes/auth.js");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/movielist", movielistRoutes);

app.use((req, res, next) => {
    const error = new HttpError('Could not find this route.', 404);
    throw error;
  });
  
  app.use((error, req, res, next) => {
    if (req.file) {
      fs.unlink(req.file.path, err => {
        console.log(err);
      });
    }
    if (res.headerSent) {
      return next(error);
    }
    res.status(error.code || 500);
    res.json({ message: error.message || 'An unknown error occurred!' });
  });

uri = "mongodb+srv://ritika1234:08414802718@users.h6wod.mongodb.net/MovieXpertise?retryWrites=true&w=majority";

mongoose
  .connect(uri)
  .then(() => {
    console.log("Server Up and Running.");
    app.listen(5000);
  })
  .catch(err => {
    console.log(err);
  })