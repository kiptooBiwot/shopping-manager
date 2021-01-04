const { verifyAccessToken } = require("../controllers/jwt");
const createError = require("http-errors");
const User = require('../models/User')

module.exports.userIsLoggedIn = (req, res, next) => {
  let token = req.headers.authorization;

  if (!token) {
    // res.status(400)
    next(createError.BadRequest());
  }

  token = token.toString().split(" ")[1];
  // console.log(token);

  // Veriify token
  verifyAccessToken(token)
    // console.log(`Token after verification: ${decoded}`)
    .then( async ({ username }) => {
      // console.log(`Username: ${username}`)
      const dbUser = await User.findOne({ username })
      // console.log(`User from DB: ${dbUser}`)
      if (!dbUser) {
        next(createError.NotFound('User not registered!'))
      }
      req.user = dbUser.username
      next()
    })
  .catch((err) => next(createError(err)))

  // Ensure that user exists
  // Add username to the request object
};

module.exports.userIsAdmin = async (req, res, next) => {
  // console.log(`Username: ${req.user} Process.env: ${process.env.ADMIN_USERNAME}`)
  if (req.user !== process.env.ADMIN_USERNAME) {
    next(createError.Forbidden('Access denied'))
  }
  next()
}
