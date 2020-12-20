const dotenv = require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const createError = require("http-errors");
const mongoose = require("mongoose");

const AuthRoutes = require("./routes/Auth.router");

const URI = process.env.MONGODB_URI || "mongodb://localhost:27017/shopping_mgr";

const PORT = process.env.PORT || 3000;
const app = express();

// DB Connection
mongoose
  .connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("MongoDB Connected......");
  });

app.use(morgan("dev"));
app.use(cors());

app.use("/api/v1/auth", AuthRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to Shopping Manager App!");
});

app.use(async (req, res, next) => {
  next(createError.NotFound());
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      error: err.message,
    },
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
