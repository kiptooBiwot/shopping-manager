const jwt = require("jsonwebtoken");
const createError = require("http-errors");
const { options } = require("joi");

const JWT_Settings = Object.freeze({
  expiresIn: '2 days'
})
const signAccessToken = (user) => {
  const payload = {
    username: user.username,
    createdAt: Date.now()
  };
  const secret = process.env.JWT_SECRET_KEY;

  return new Promise((resolve, reject) => {
    jwt.sign(payload, secret, JWT_Settings, (err, token) => {
      if (err) {
        console.log(err);
        reject(createError.InternalServerError());
      }
      resolve(token);
    });
  });
};

const verifyAccessToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET_KEY, JWT_Settings, (err, decoded) => {
      if (err) {
        console.log(err);
        reject(createError.InternalServerError());
      }
      resolve(decoded);
    });
  });
};

module.exports = {
  verifyAccessToken,
  signAccessToken,
};
