const dotenv = require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const createError = require("http-errors");
const mongoose = require("mongoose");

// Routes
const AuthRoutes = require("./routes/Auth.router");
const UserRouters = require("./routes/User.router");
const ProductRoutes = require('./routes/Product.routes')

// middleware
const AuthMiddleware = require("./middleware/Auth.middleware");

const URI = process.env.MONGODB_URI || "mongodb://localhost:27017/shopping_mgr";

const PORT = process.env.PORT || 3000;
const app = express();

// DB Connection
mongoose
  .connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("MongoDB Connected......");
  });

app.use(morgan("dev"));
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/v1/auth", AuthRoutes);
app.use("/api/v1/users",
  AuthMiddleware.userIsLoggedIn,
  AuthMiddleware.userIsAdmin,
  UserRouters
);
app.use('/api/v1/products',
  AuthMiddleware.userIsLoggedIn,
  ProductRoutes
)

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
